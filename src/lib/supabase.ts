import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Course,
  CourseModule,
  Lesson,
  UserProfile,
  ClassLevel,
  SubjectId,
  CourseType
} from '../types';

// Safely resolve environment variables across Vite and Next.js naming conventions
const env = (typeof import.meta !== 'undefined' ? (import.meta as any).env : {}) || {};

export const SUPABASE_URL: string =
  env.NEXT_PUBLIC_SUPABASE_URL ||
  env.VITE_SUPABASE_URL ||
  'https://mkhqxieyiuarjgpjppqe.supabase.co';

export const SUPABASE_ANON_KEY: string =
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_-vBHSao8e-DcGkKDAMWa1Q_opSGf__J';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes('your-project-ref') &&
    !SUPABASE_ANON_KEY.includes('your-anon-key')
  );
};

// Singleton Supabase client instance
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

// Database Types Matching Supabase Schema
export interface DbClass {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface DbSubject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  created_at?: string;
}

export interface DbCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  class_id: string;
  subject_id: string;
  course_type: string;
  teacher_name: string;
  teacher_bio: string;
  thumbnail_url: string;
  price: number;
  original_price: number;
  discount: number;
  duration: string;
  total_lessons: number;
  is_published: boolean;
  is_featured?: boolean;
  badge?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbModule {
  id: string;
  course_id: string;
  title: string;
  description: string;
  display_order: number;
  created_at?: string;
}

export interface DbLesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  pdf_url: string;
  duration: string;
  display_order: number;
  is_free: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbPurchase {
  id: string;
  user_id: string;
  course_id: string;
  payment_id: string;
  order_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
}

export interface DbProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  class_level: number;
  role: 'student' | 'admin' | 'parent';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// Supabase Data Fetching & Sync Services
// --------------------------------------------------------------------------

/**
 * Fetch all active Classes from Supabase
 */
export async function fetchClassesFromSupabase(): Promise<DbClass[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.warn('Supabase fetch classes error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase classes network error:', err);
    return null;
  }
}

/**
 * Fetch all active Subjects from Supabase
 */
export async function fetchSubjectsFromSupabase(): Promise<DbSubject[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase fetch subjects error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase subjects network error:', err);
    return null;
  }
}

/**
 * Fetch all published courses with modules & lessons from Supabase
 */
export async function fetchCoursesFromSupabase(): Promise<Course[] | null> {
  if (!supabase) return null;
  try {
    const { data: rawCourses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (coursesError || !rawCourses) {
      console.warn('Supabase fetch courses error:', coursesError?.message);
      return null;
    }

    const { data: rawModules } = await supabase
      .from('course_modules')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: rawLessons } = await supabase
      .from('lessons')
      .select('*')
      .order('display_order', { ascending: true });

    const modulesByCourseId: Record<string, CourseModule[]> = {};

    (rawModules || []).forEach((mod: DbModule) => {
      const lessonsForModule: Lesson[] = (rawLessons || [])
        .filter((les: DbLesson) => les.module_id === mod.id)
        .map((les: DbLesson) => ({
          id: les.id,
          title: les.title,
          summary: les.description,
          durationMinutes: parseInt(les.duration) || 45,
          isFreePreview: les.is_free,
          videoUrl: les.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          notesPdfUrl: les.pdf_url || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
        }));

      const moduleObj: CourseModule = {
        id: mod.id,
        chapterNumber: mod.display_order,
        title: mod.title,
        description: mod.description,
        lessons: lessonsForModule
      };

      if (!modulesByCourseId[mod.course_id]) {
        modulesByCourseId[mod.course_id] = [];
      }
      modulesByCourseId[mod.course_id].push(moduleObj);
    });

    const parsedCourses: Course[] = rawCourses.map((c: DbCourse) => {
      const classNum = parseInt(c.class_id.replace(/\D/g, '')) || 10;
      const courseModules = modulesByCourseId[c.id] || [];
      const totalLessonsCalc = courseModules.reduce(
        (acc, m) => acc + m.lessons.length,
        0
      );

      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        classLevel: (classNum >= 6 && classNum <= 12 ? classNum : 10) as ClassLevel,
        subjectId: c.subject_id as SubjectId,
        subjectName: c.subject_id.charAt(0).toUpperCase() + c.subject_id.slice(1).replace('-', ' '),
        courseType: (c.course_type || 'complete') as CourseType,
        board: 'CBSE & State Board',
        language: 'Hinglish',
        teacher: {
          id: `t-${c.id}`,
          name: c.teacher_name || 'Senior Faculty',
          qualification: c.teacher_bio || 'Subject Expert',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          bio: c.teacher_bio || 'Experienced academic mentor',
          experienceYears: 10,
          rating: 4.9,
          subjectSpeciality: 'Senior Faculty'
        },
        shortDescription: c.description || 'Comprehensive school curriculum course.',
        fullDescription: c.description || 'Complete chapter-wise theoretical explanations and numerical masterclasses.',
        outcomes: [
          'Master 100% textbook theory & derivations',
          'Learn step-marking techniques for board exams',
          'Solve 10-year previous board questions',
          'Gain confidence in speed numerical calculations'
        ],
        requirements: [
          'School textbook notebook and pen',
          'Internet connection for video playback'
        ],
        thumbnail: c.thumbnail_url || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        originalPrice: Number(c.original_price) || 2499,
        discountedPrice: Number(c.price) || 999,
        durationHours: parseInt(c.duration) || 48,
        chaptersCount: courseModules.length || 8,
        lessonsCount: totalLessonsCalc || c.total_lessons || 24,
        rating: 4.9,
        reviewCount: 52,
        studentCount: 1240,
        isPublished: c.is_published,
        isFeatured: c.is_featured,
        badge: c.badge || 'New Batch',
        modules: courseModules,
        createdAt: c.created_at || new Date().toISOString(),
        updatedAt: c.updated_at || new Date().toISOString()
      };
    });

    return parsedCourses;
  } catch (err) {
    console.warn('Supabase courses error:', err);
    return null;
  }
}

/**
 * Fetch User Purchases from Supabase
 */
export async function fetchUserPurchasesFromSupabase(userId: string): Promise<DbPurchase[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid');

    if (error) {
      console.warn('Supabase fetch purchases error:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
}

/**
 * Fetch Completed Lessons for User
 */
export async function fetchUserProgressFromSupabase(userId: string): Promise<string[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('completed', true);

    if (error) {
      console.warn('Supabase fetch progress error:', error.message);
      return [];
    }
    return (data || []).map((row) => row.lesson_id);
  } catch (err) {
    return [];
  }
}

/**
 * Record or Toggle Lesson Progress in Supabase
 */
export async function saveLessonProgressToSupabase(
  userId: string,
  lessonId: string,
  completed: boolean
): Promise<boolean> {
  if (!supabase) return false;
  try {
    if (completed) {
      const { error } = await supabase.from('lesson_progress').upsert({
        id: `${userId}_${lessonId}`,
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      });
      return !error;
    } else {
      const { error } = await supabase
        .from('lesson_progress')
        .delete()
        .eq('user_id', userId)
        .eq('lesson_id', lessonId);
      return !error;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Save New Purchase Order to Supabase
 */
export async function savePurchaseToSupabase(purchase: {
  id: string;
  user_id: string;
  course_id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  currency?: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
}): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('purchases').insert({
      id: purchase.id,
      user_id: purchase.user_id,
      course_id: purchase.course_id,
      payment_id: purchase.payment_id,
      order_id: purchase.order_id,
      amount: purchase.amount,
      currency: purchase.currency || 'INR',
      status: purchase.status
    });
    return !error;
  } catch (err) {
    return false;
  }
}

/**
 * Fetch User Profile from Supabase
 */
export async function fetchUserProfileFromSupabase(userId: string): Promise<DbProfile | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    return null;
  }
}

/**
 * Update User Profile in Supabase
 */
export async function updateUserProfileInSupabase(
  userId: string,
  updates: { full_name?: string; phone?: string; class_level?: number; avatar_url?: string }
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    return !error;
  } catch (err) {
    return false;
  }
}
