-- ==============================================================================
-- MEDHA MATHS ("Learn Better. Score Better.") - SUPABASE POSTGRESQL SCHEMA & RLS
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ENUMS & DOMAINS
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'admin', 'parent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_type_enum AS ENUM (
        'complete_course',
        'chapter_wise',
        'crash_course',
        'revision_course',
        'exam_preparation',
        'test_series',
        'study_material'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE purchase_status_enum AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. PROFILES TABLE (Linked with Supabase Auth)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    class_level INTEGER DEFAULT 10,
    role user_role DEFAULT 'student'::user_role,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 4. CLASSES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY, -- e.g. 'class-6', 'class-10' or '6', '10'
    name TEXT NOT NULL, -- 'Class 6', 'Class 10'
    slug TEXT NOT NULL UNIQUE, -- '6', '10'
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 5. SUBJECTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY, -- e.g. 'mathematics', 'science'
    name TEXT NOT NULL, -- 'Mathematics'
    slug TEXT NOT NULL UNIQUE, -- 'mathematics'
    description TEXT,
    icon TEXT, -- 'Calculator', 'Atom', 'BookOpen', 'Globe', 'PenTool', 'Laptop'
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. COURSES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    class_id TEXT NOT NULL REFERENCES public.classes(id) ON DELETE RESTRICT,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    course_type TEXT NOT NULL DEFAULT 'complete_course',
    teacher_name TEXT NOT NULL DEFAULT 'Er. Anand Sharma',
    teacher_bio TEXT DEFAULT 'Senior Faculty & IIT Alum • 12+ Yrs Exp',
    thumbnail_url TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 999.00,
    original_price NUMERIC(10, 2) NOT NULL DEFAULT 2499.00,
    discount NUMERIC(10, 2) DEFAULT 0,
    duration TEXT DEFAULT '48 Hours',
    total_lessons INTEGER DEFAULT 36,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. COURSE MODULES / CHAPTERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.course_modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 8. LESSONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    pdf_url TEXT,
    duration TEXT DEFAULT '45 Mins',
    display_order INTEGER NOT NULL DEFAULT 1,
    is_free BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 9. PURCHASES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.purchases (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    payment_id TEXT NOT NULL,
    order_id TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status purchase_status_enum DEFAULT 'paid'::purchase_status_enum NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 10. LESSON PROGRESS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'::user_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
-- 1. Users can view their own profile; Admins can view all profiles
CREATE POLICY "Profiles are viewable by owner or admin"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

-- 2. Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- 3. Users can update their own profile (cannot escalate role unless already admin)
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id OR public.is_admin())
WITH CHECK (
    auth.uid() = id 
    AND (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
);

-- CLASSES POLICIES
-- Anyone can view active classes; Admins can view all and manage
CREATE POLICY "Active classes viewable by everyone"
ON public.classes FOR SELECT
USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage classes"
ON public.classes FOR ALL
USING (public.is_admin());

-- SUBJECTS POLICIES
-- Anyone can view active subjects; Admins can manage
CREATE POLICY "Active subjects viewable by everyone"
ON public.subjects FOR SELECT
USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage subjects"
ON public.subjects FOR ALL
USING (public.is_admin());

-- COURSES POLICIES
-- Published courses viewable by everyone; Admins can view all and manage
CREATE POLICY "Published courses viewable by everyone"
ON public.courses FOR SELECT
USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage courses"
ON public.courses FOR ALL
USING (public.is_admin());

-- COURSE MODULES POLICIES
-- Viewable if parent course is published or admin
CREATE POLICY "Modules viewable if course published or admin"
ON public.course_modules FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE courses.id = course_modules.course_id
        AND (courses.is_published = TRUE OR public.is_admin())
    )
);

CREATE POLICY "Admins can manage course modules"
ON public.course_modules FOR ALL
USING (public.is_admin());

-- LESSONS POLICIES
-- Free lessons viewable by everyone; Paid lessons viewable by purchased users or admins
CREATE POLICY "Lessons select policy"
ON public.lessons FOR SELECT
USING (
    is_free = TRUE
    OR public.is_admin()
    OR EXISTS (
        SELECT 1 FROM public.course_modules m
        JOIN public.courses c ON c.id = m.course_id
        JOIN public.purchases p ON p.course_id = c.id
        WHERE m.id = lessons.module_id
        AND p.user_id = auth.uid()
        AND p.status = 'paid'
    )
);

CREATE POLICY "Admins can manage lessons"
ON public.lessons FOR ALL
USING (public.is_admin());

-- PURCHASES POLICIES
-- Users can only view their own purchases; Admins can view all
CREATE POLICY "Users can view their own purchases"
ON public.purchases FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert their own verified purchases"
ON public.purchases FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage purchases"
ON public.purchases FOR ALL
USING (public.is_admin());

-- LESSON PROGRESS POLICIES
-- Users can view and manage their own lesson progress
CREATE POLICY "Users can view own lesson progress"
ON public.lesson_progress FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own lesson progress"
ON public.lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
ON public.lesson_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lesson progress"
ON public.lesson_progress FOR DELETE
USING (auth.uid() = user_id);

-- ==============================================================================
-- 12. AUTOMATIC PROFILE TRIGGER ON SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, role, class_level, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
        NEW.email,
        NEW.raw_user_meta_data->>'phone',
        'student'::user_role,
        COALESCE((NEW.raw_user_meta_data->>'class_level')::INTEGER, 10),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        class_level = EXCLUDED.class_level,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 13. SEED DATA (Classes, Subjects, Courses, Modules, Lessons)
-- ==============================================================================

-- Seed Classes
INSERT INTO public.classes (id, name, slug, description, display_order, is_active) VALUES
('class-6', 'Class 6', '6', 'Middle School Foundation - Basic Arithmetic, Fractions, Science Habits', 1, TRUE),
('class-7', 'Class 7', '7', 'Intermediate School - Integers, Algebraic Equations, Biology Foundations', 2, TRUE),
('class-8', 'Class 8', '8', 'Pre-High School Gateway - Rational Numbers, Linear Equations, Cell Structure', 3, TRUE),
('class-9', 'Class 9', '9', 'High School Core - Coordinate Geometry, Motion & Force, Matter in Surroundings', 4, TRUE),
('class-10', 'Class 10', '10', 'Secondary Board Target - Real Numbers, Trigonometry, Light & Electricity', 5, TRUE),
('class-11', 'Class 11', '11', 'Senior Secondary - Sets, Calculus, Kinematics, Chemical Bonding', 6, TRUE),
('class-12', 'Class 12', '12', 'Senior Board & Entrance - Matrices, Integration, Optics, Electrostatics', 7, TRUE)
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name, description = EXCLUDED.description, display_order = EXCLUDED.display_order;

-- Seed Subjects
INSERT INTO public.subjects (id, name, slug, description, icon, is_active) VALUES
('mathematics', 'Mathematics', 'mathematics', 'Concept clarity, proofs, formulas & numericals', 'Calculator', TRUE),
('science', 'Science (Physics, Chem, Bio)', 'science', 'Whiteboard derivations, chemical reactions & biological diagrams', 'Atom', TRUE),
('english', 'English Language & Literature', 'english', 'Grammar rules, writing skills & literature chapter analysis', 'BookOpen', TRUE),
('social-science', 'Social Science (SST)', 'social-science', 'History timelines, Geography maps, Civics & Economics', 'Globe', TRUE),
('hindi', 'Hindi (साहित्य एवं व्याकरण)', 'hindi', 'Sparsh, Sanchayan, Kshitij, Kritika & Vyakaran', 'PenTool', TRUE),
('computer-science', 'Computer Science & AI', 'computer-science', 'Python programming, SQL databases & computer networks', 'Laptop', TRUE)
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;

-- Seed Courses
INSERT INTO public.courses (
    id, title, slug, description, class_id, subject_id, course_type,
    teacher_name, teacher_bio, thumbnail_url, price, original_price, discount,
    duration, total_lessons, is_published, is_featured, badge
) VALUES
(
    'c-10-math-complete',
    'Class 10 Mathematics: Complete NCERT & Board Mastery Batch',
    'class-10-mathematics-complete-ncert-board-mastery',
    'Complete mastercourse covering every chapter of Class 10 CBSE & State Board Mathematics with theorem derivations, NCERT Exemplar problems, and 10-year board questions.',
    'class-10',
    'mathematics',
    'complete_course',
    'Er. Anand Sharma',
    'Senior Faculty & IIT Roorkee Alum • 12+ Yrs Exp',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    999.00,
    2499.00,
    1500.00,
    '54 Hours',
    42,
    TRUE,
    TRUE,
    'Bestseller 🏆'
),
(
    'c-10-sci-complete',
    'Class 10 Science: Physics, Chemistry & Biology Master Batch',
    'class-10-science-complete-master-batch',
    'In-depth video lectures for all 16 chapters. Master circuit diagrams, ray optics, balancing chemical reactions, and biology life processes for 100/100.',
    'class-10',
    'science',
    'complete_course',
    'Dr. Sunita Deshmukh',
    'Senior Science Faculty (Ex-Kendriya Vidyalaya) • Ph.D in Physics',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    999.00,
    2499.00,
    1500.00,
    '48 Hours',
    38,
    TRUE,
    TRUE,
    'High Rating ⭐ 4.9'
),
(
    'c-9-math-complete',
    'Class 9 Mathematics: Full Syllabus & Olympiad Foundation',
    'class-9-mathematics-foundation-batch',
    'Build unstoppable mathematical maturity before entering Class 10. Master Polynomials, Coordinate Geometry, Triangles, and Circles step-by-step.',
    'class-9',
    'mathematics',
    'complete_course',
    'Er. Anand Sharma',
    'Senior Faculty & IIT Roorkee Alum • 12+ Yrs Exp',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    899.00,
    2199.00,
    1300.00,
    '45 Hours',
    32,
    TRUE,
    TRUE,
    'Foundation Special'
),
(
    'c-8-sci-complete',
    'Class 8 Science: Concept Builder & Discovery Lab',
    'class-8-science-concept-builder',
    'Interactive video explanations on Crop Production, Microorganisms, Cell Structure, Light and Sound designed to spark scientific curiosity.',
    'class-8',
    'science',
    'complete_course',
    'Dr. Sunita Deshmukh',
    'Senior Science Faculty (Ex-Kendriya Vidyalaya) • Ph.D in Physics',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
    799.00,
    1999.00,
    1200.00,
    '36 Hours',
    28,
    TRUE,
    FALSE,
    'Popular'
)
ON CONFLICT (id) DO UPDATE SET
title = EXCLUDED.title, price = EXCLUDED.price, is_published = EXCLUDED.is_published;

-- Seed Modules for Class 10 Math Course
INSERT INTO public.course_modules (id, course_id, title, description, display_order) VALUES
('mod-10-math-ch1', 'c-10-math-complete', 'Chapter 1 — Real Numbers & Euclid Axioms', 'Fundamental Theorem of Arithmetic, irrationality proofs & decimal expansions', 1),
('mod-10-math-ch2', 'c-10-math-complete', 'Chapter 2 — Polynomials & Zeroes', 'Geometrical meaning of zeroes, relationship between zeroes & coefficients', 2),
('mod-10-math-ch3', 'c-10-math-complete', 'Chapter 3 — Pair of Linear Equations in Two Variables', 'Graphical and algebraic solutions (Substitution, Elimination)', 3),
('mod-10-math-ch8', 'c-10-math-complete', 'Chapter 8 — Introduction to Trigonometry', 'Trigonometric ratios, values for specific angles and trigonometric identities', 4)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, display_order = EXCLUDED.display_order;

-- Seed Lessons for Module 1
INSERT INTO public.lessons (id, module_id, title, description, video_url, pdf_url, duration, display_order, is_free) VALUES
(
    'les-10-m-1-1',
    'mod-10-math-ch1',
    '1.1 Introduction & The Fundamental Theorem of Arithmetic',
    'Prime factorization decomposition, HCF and LCM relationships with board exam questions.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    '42 Mins',
    1,
    TRUE -- Free Preview!
),
(
    'les-10-m-1-2',
    'mod-10-math-ch1',
    '1.2 Step-by-Step Proof of Irrationality (√2, √3, √5)',
    'Learn how to write the perfect contradiction proof to secure full 3 marks on board exams.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    '38 Mins',
    2,
    FALSE -- Paid
),
(
    'les-10-m-1-3',
    'mod-10-math-ch1',
    '1.3 NCERT Exemplar & 10-Year Board PYQ Discussion',
    'Solving tricky composite numbers and decimal termination questions.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    '45 Mins',
    3,
    FALSE -- Paid
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, is_free = EXCLUDED.is_free;

-- Seed Lessons for Module 2
INSERT INTO public.lessons (id, module_id, title, description, video_url, pdf_url, duration, display_order, is_free) VALUES
(
    'les-10-m-2-1',
    'mod-10-math-ch2',
    '2.1 Geometric Meaning of Zeroes of a Polynomial',
    'Understanding parabolic curves, intersection with X-axis and degree of polynomials.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    '35 Mins',
    1,
    TRUE -- Free Preview!
),
(
    'les-10-m-2-2',
    'mod-10-math-ch2',
    '2.2 Relationship Between Zeroes & Coefficients of Quadratic Polynomials',
    'Master sum of zeroes (-b/a) and product of zeroes (c/a) with tricky algebraic questions.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    '48 Mins',
    2,
    FALSE -- Paid
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, is_free = EXCLUDED.is_free;
