/**
 * Medha Maths - Supabase Database Schema Definitions & SQL Architecture Blueprint
 * 
 * Ready for deployment to Supabase PostgreSQL Database with Row Level Security (RLS)
 */

export interface DatabaseSchema {
  tables: {
    profiles: {
      id: string; // uuid references auth.users
      full_name: string;
      email: string;
      phone: string;
      class_level: number;
      role: 'student' | 'admin' | 'teacher' | 'parent';
      avatar_url?: string;
      created_at: string;
      updated_at: string;
    };
    classes: {
      id: number; // 6, 7, 8, 9, 10, 11, 12
      name: string; // e.g. "Class 10"
      description: string;
      target_board: string;
      is_active: boolean;
      created_at: string;
    };
    subjects: {
      id: string; // e.g. "mathematics"
      name: string;
      hindi_name?: string;
      icon_name: string;
      accent_color: string;
      tagline: string;
      description: string;
      is_active: boolean;
    };
    courses: {
      id: string; // uuid
      slug: string; // unique slug e.g. "class-10-mathematics-complete-mastery"
      title: string;
      class_level: number;
      subject_id: string;
      course_type: string;
      teacher_id: string;
      short_description: string;
      full_description: string;
      thumbnail_url: string;
      original_price: number;
      discounted_price: number;
      duration_hours: number;
      is_published: boolean;
      is_featured: boolean;
      language: string;
      created_at: string;
    };
    course_modules: {
      id: string;
      course_id: string;
      chapter_number: number;
      title: string;
      description: string;
      created_at: string;
    };
    lessons: {
      id: string;
      module_id: string;
      title: string;
      order_index: number;
      duration_minutes: number;
      is_free_preview: boolean;
      video_url?: string;
      notes_pdf_url?: string;
      summary?: string;
      quiz_id?: string;
    };
    study_materials: {
      id: string;
      title: string;
      class_level: number;
      subject_id: string;
      category: string;
      price: number;
      is_free: boolean;
      page_count: number;
      file_size_bytes: string;
      preview_url: string;
      download_url?: string;
      author: string;
      is_published: boolean;
      created_at: string;
    };
    quizzes: {
      id: string;
      title: string;
      class_level: number;
      subject_id: string;
      chapter_title?: string;
      duration_minutes: number;
      total_marks: number;
      passing_percentage: number;
      is_board_mock: boolean;
      created_at: string;
    };
    quiz_questions: {
      id: string;
      quiz_id: string;
      question: string;
      options: string[]; // jsonb array
      correct_option_index: number;
      explanation: string;
      hint?: string;
      marks: number;
      order_index: number;
    };
    purchases: {
      id: string;
      student_id: string;
      item_type: 'course' | 'study_material' | 'test_series' | 'package';
      item_id: string;
      item_title: string;
      amount: number;
      original_amount: number;
      discount_amount: number;
      coupon_code?: string;
      razorpay_order_id?: string;
      razorpay_payment_id: string;
      razorpay_signature?: string;
      payment_status: 'paid' | 'pending' | 'failed' | 'refunded';
      payment_method: string;
      created_at: string;
    };
    lesson_progress: {
      id: string;
      student_id: string;
      course_id: string;
      lesson_id: string;
      is_completed: boolean;
      last_watched_second: number;
      updated_at: string;
    };
    quiz_attempts: {
      id: string;
      student_id: string;
      quiz_id: string;
      score: number;
      total_marks: number;
      percentage: number;
      time_spent_seconds: number;
      answers_json: Record<string, number>;
      is_passed: boolean;
      created_at: string;
    };
    reviews: {
      id: string;
      course_id: string;
      student_id: string;
      student_name: string;
      class_level: number;
      rating: number;
      comment: string;
      is_verified_student: boolean;
      is_approved: boolean;
      created_at: string;
    };
    contact_messages: {
      id: string;
      name: string;
      email: string;
      phone: string;
      class_level: string;
      subject: string;
      message: string;
      status: 'new' | 'replied' | 'closed';
      created_at: string;
    };
  };
}

export const SUPABASE_SQL_DDL = `-- Medha Maths PostgreSQL Database Schema
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  class_level INT CHECK (class_level BETWEEN 6 AND 12),
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'teacher', 'parent')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  class_level INT NOT NULL CHECK (class_level BETWEEN 6 AND 12),
  subject_id TEXT NOT NULL,
  course_type TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  thumbnail_url TEXT,
  original_price NUMERIC NOT NULL,
  discounted_price NUMERIC NOT NULL,
  duration_hours NUMERIC DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'Hinglish',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  amount NUMERIC NOT NULL,
  razorpay_payment_id TEXT NOT NULL,
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('paid', 'pending', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now()
);
`;
