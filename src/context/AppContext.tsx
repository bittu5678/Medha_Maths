import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Course,
  StudyMaterial,
  Quiz,
  PurchaseOrder,
  UserProfile,
  ClassLevel,
  SubjectId,
  CourseType,
  Lesson,
  CourseModule,
  SchoolClass,
  SchoolSubject
} from '../types';
import {
  COURSES_DATA,
  STUDY_MATERIALS_DATA,
  QUIZZES_DATA,
  DEMO_ORDERS,
  INITIAL_USER_PROFILE,
  CLASSES_DATA,
  SUBJECTS_LIST
} from '../data/mockData';
import {
  supabase,
  isSupabaseConfigured,
  fetchClassesFromSupabase,
  fetchSubjectsFromSupabase,
  fetchCoursesFromSupabase,
  fetchUserPurchasesFromSupabase,
  fetchUserProgressFromSupabase,
  saveLessonProgressToSupabase,
  savePurchaseToSupabase,
  fetchUserProfileFromSupabase,
  updateUserProfileInSupabase
} from '../lib/supabase';

export type AppView =
  | 'home'
  | 'courses'
  | 'course-details'
  | 'classes'
  | 'subjects'
  | 'study-material'
  | 'quizzes'
  | 'quiz-runner'
  | 'dashboard'
  | 'dashboard-profile'
  | 'admin'
  | 'admin-courses'
  | 'admin-classes'
  | 'admin-subjects'
  | 'admin-curriculum'
  | 'admin-students'
  | 'admin-orders'
  | 'about'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'refund';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Supabase State
  isSupabaseLive: boolean;
  isLoadingData: boolean;

  // Navigation & Routing
  currentView: AppView;
  navigateTo: (
    view: AppView,
    params?: { slug?: string; classLevel?: ClassLevel; subjectId?: SubjectId; quizId?: string }
  ) => void;
  activeCourseSlug: string | null;
  activeQuizId: string | null;
  selectedClassFilter: ClassLevel | 'all';
  setSelectedClassFilter: (val: ClassLevel | 'all') => void;
  selectedSubjectFilter: SubjectId | 'all';
  setSelectedSubjectFilter: (val: SubjectId | 'all') => void;
  selectedCourseTypeFilter: CourseType | 'all';
  setSelectedCourseTypeFilter: (val: CourseType | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
  setSortOption: (sort: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating') => void;

  // Dynamic Data Collections
  classes: SchoolClass[];
  subjects: SchoolSubject[];
  courses: Course[];
  studyMaterials: StudyMaterial[];
  quizzes: Quiz[];
  orders: PurchaseOrder[];
  user: UserProfile | null;

  // Auth & Roles
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot' | 'reset';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot' | 'reset') => void;
  signUpWithSupabase: (
    fullName: string,
    email: string,
    phone: string,
    pass: string,
    classLevel: ClassLevel
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithSupabase: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemoStudent: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;

  // Razorpay Checkout Modal
  isCheckoutOpen: boolean;
  checkoutItem: { type: 'course' | 'material'; course?: Course; material?: StudyMaterial } | null;
  openCheckout: (item: { type: 'course' | 'material'; course?: Course; material?: StudyMaterial }) => void;
  closeCheckout: () => void;
  processRazorpayPaymentSuccess: (
    paymentId: string,
    method: string,
    couponCode?: string,
    discount?: number,
    explicitOrderId?: string
  ) => Promise<void>;

  // Video Lecture Player Modal
  activeLesson: { lesson: Lesson; courseTitle: string; courseId: string; chapterTitle: string } | null;
  openLessonPlayer: (lesson: Lesson, courseTitle: string, courseId: string, chapterTitle: string) => void;
  closeLessonPlayer: () => void;
  toggleLessonCompletion: (lessonId: string) => Promise<void>;

  // Study Material PDF Reader Modal
  activeStudyMaterial: StudyMaterial | null;
  openMaterialReader: (material: StudyMaterial) => void;
  closeMaterialReader: () => void;

  // Admin Actions
  addNewCourse: (course: Course) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  toggleCoursePublish: (courseId: string) => Promise<void>;
  addClass: (newClass: SchoolClass) => void;
  updateClass: (classId: string, updates: Partial<SchoolClass>) => void;
  addSubject: (newSubject: SchoolSubject) => void;
  updateSubject: (subjectId: string, updates: Partial<SchoolSubject>) => void;
  addChapterModule: (courseId: string, moduleData: Omit<CourseModule, 'id'>) => void;
  updateChapterModule: (courseId: string, moduleId: string, updates: Partial<CourseModule>) => void;
  deleteChapterModule: (courseId: string, moduleId: string) => void;
  addLessonToModule: (courseId: string, moduleId: string, lessonData: Omit<Lesson, 'id'>) => void;
  updateLessonInModule: (courseId: string, moduleId: string, lessonId: string, updates: Partial<Lesson>) => void;
  deleteLessonFromModule: (courseId: string, moduleId: string, lessonId: string) => void;

  // WhatsApp Helpers
  getWhatsAppUrl: (
    messageType?: 'general' | 'course' | 'payment',
    courseName?: string,
    classNumber?: string | number
  ) => string;
  whatsAppNumber: string;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Classes Adapter
const DEFAULT_CLASSES: SchoolClass[] = CLASSES_DATA.map((c, index) => ({
  id: `class-${c.level}`,
  name: c.name,
  slug: String(c.level),
  description: c.description,
  displayOrder: index + 1,
  isActive: true
}));

// Initial Subjects Adapter
const DEFAULT_SUBJECTS: SchoolSubject[] = SUBJECTS_LIST.map((s) => ({
  id: s.id,
  name: s.name,
  slug: s.id,
  description: s.description,
  icon: s.iconName,
  isActive: true
}));

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeCourseSlug, setActiveCourseSlug] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  // Filters
  const [selectedClassFilter, setSelectedClassFilter] = useState<ClassLevel | 'all'>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [selectedCourseTypeFilter, setSelectedCourseTypeFilter] = useState<CourseType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Entities
  const [classes, setClasses] = useState<SchoolClass[]>(DEFAULT_CLASSES);
  const [subjects, setSubjects] = useState<SchoolSubject[]>(DEFAULT_SUBJECTS);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(STUDY_MATERIALS_DATA);
  const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES_DATA);
  const [orders, setOrders] = useState<PurchaseOrder[]>(DEMO_ORDERS);
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER_PROFILE);

  // Supabase State
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(isSupabaseConfigured());
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ type: 'course' | 'material'; course?: Course; material?: StudyMaterial } | null>(null);

  // Lesson Player Modal
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; courseTitle: string; courseId: string; chapterTitle: string } | null>(null);

  // Study Material Reader Modal
  const [activeStudyMaterial, setActiveStudyMaterial] = useState<StudyMaterial | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // WhatsApp Configuration (Default: 917370810156)
  const whatsAppNumber =
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_WHATSAPP_NUMBER) ||
    '917370810156';

  const addToast = useCallback((type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = 't-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Safe Navigation with Admin Guard
  const navigateTo = (
    view: AppView,
    params?: { slug?: string; classLevel?: ClassLevel; subjectId?: SubjectId; quizId?: string }
  ) => {
    // Admin route protection
    if (view.startsWith('admin')) {
      if (!user || user.role !== 'admin') {
        addToast('error', 'Access Denied', 'You need an Administrator account to access the Admin Control Room.');
        setIsAuthModalOpen(true);
        setAuthModalMode('login');
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (params?.slug) {
      setActiveCourseSlug(params.slug);
    }
    if (params?.classLevel) {
      setSelectedClassFilter(params.classLevel);
    }
    if (params?.subjectId) {
      setSelectedSubjectFilter(params.subjectId);
    }
    if (params?.quizId) {
      setActiveQuizId(params.quizId);
    }
  };

  // Load Data from Supabase if configured
  useEffect(() => {
    const loadSupabaseData = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        setIsSupabaseLive(false);
        return;
      }

      setIsLoadingData(true);
      try {
        // Fetch classes
        const dbClasses = await fetchClassesFromSupabase();
        if (dbClasses && dbClasses.length > 0) {
          setClasses(
            dbClasses.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              description: c.description,
              displayOrder: c.display_order,
              isActive: c.is_active
            }))
          );
        }

        // Fetch subjects
        const dbSubjects = await fetchSubjectsFromSupabase();
        if (dbSubjects && dbSubjects.length > 0) {
          setSubjects(
            dbSubjects.map((s) => ({
              id: s.id,
              name: s.name,
              slug: s.slug,
              description: s.description,
              icon: s.icon,
              isActive: s.is_active
            }))
          );
        }

        // Fetch courses
        const dbCourses = await fetchCoursesFromSupabase();
        if (dbCourses && dbCourses.length > 0) {
          setCourses(dbCourses);
        }

        setIsSupabaseLive(true);
      } catch (err) {
        console.warn('Failed to load initial Supabase data:', err);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadSupabaseData();
  }, []);

  // Supabase Auth State Listener
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured()) return;

    // Check existing active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await syncUserFromSupabase(session.user.id, session.user.email || '');
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await syncUserFromSupabase(session.user.id, session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper to sync user profile and enrollments from Supabase
  const syncUserFromSupabase = async (userId: string, email: string) => {
    try {
      const dbProfile = await fetchUserProfileFromSupabase(userId);
      const purchases = await fetchUserPurchasesFromSupabase(userId);
      const completedLessons = await fetchUserProgressFromSupabase(userId);

      const enrolledIds = purchases.map((p) => p.course_id);

      setUser({
        id: userId,
        fullName: dbProfile?.full_name || email.split('@')[0] || 'Student',
        email: dbProfile?.email || email,
        phone: dbProfile?.phone || '',
        classLevel: ((dbProfile?.class_level || 10) as ClassLevel),
        role: dbProfile?.role || 'student',
        avatar: dbProfile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        joinedDate: dbProfile?.created_at ? new Date(dbProfile.created_at).toLocaleDateString('en-IN') : '2025',
        enrolledCourseIds: enrolledIds,
        completedLessonIds: completedLessons,
        purchasedMaterialIds: [],
        quizAttempts: []
      });
    } catch (err) {
      console.warn('Error syncing profile:', err);
    }
  };

  // Real Supabase Sign Up
  const signUpWithSupabase = async (
    fullName: string,
    email: string,
    phone: string,
    pass: string,
    classLevel: ClassLevel
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      // Fallback local student creation
      const localUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName,
        email,
        phone,
        classLevel,
        role: 'student',
        joinedDate: new Date().toLocaleDateString('en-IN'),
        enrolledCourseIds: [],
        completedLessonIds: [],
        purchasedMaterialIds: [],
        quizAttempts: []
      };
      setUser(localUser);
      setIsAuthModalOpen(false);
      addToast('success', 'Account Created!', `Welcome to Medha Maths, ${fullName}!`);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: fullName,
            phone,
            class_level: classLevel
          }
        }
      });

      if (error) {
        addToast('error', 'Signup Failed', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Attempt to write/update profile in profiles table directly
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          email,
          phone,
          class_level: classLevel,
          role: 'student'
        });

        await syncUserFromSupabase(data.user.id, email);
        setIsAuthModalOpen(false);
        addToast('success', 'Account Created! 🎉', `Welcome to Medha Maths, ${fullName}!`);
        return { success: true };
      }

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Network error during signup';
      addToast('error', 'Signup Error', msg);
      return { success: false, error: msg };
    }
  };

  // Real Supabase Sign In
  const signInWithSupabase = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      // Fallback Demo Login
      loginAsDemoStudent();
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });

      if (error) {
        addToast('error', 'Login Failed', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        await syncUserFromSupabase(data.user.id, data.user.email || email);
        setIsAuthModalOpen(false);
        addToast('success', 'Welcome Back!', 'You have successfully signed in.');
        return { success: true };
      }

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Login error occurred';
      addToast('error', 'Login Error', msg);
      return { success: false, error: msg };
    }
  };

  // Supabase Password Reset Request
  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      addToast('info', 'Reset Link Sent', `Password reset instructions sent to ${email}.`);
      setAuthModalMode('login');
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });

      if (error) {
        addToast('error', 'Reset Failed', error.message);
        return { success: false, error: error.message };
      }

      addToast('success', 'Reset Email Sent', `Check ${email} for the password recovery link.`);
      setAuthModalMode('login');
      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Could not send reset email';
      addToast('error', 'Error', msg);
      return { success: false, error: msg };
    }
  };

  // Supabase Update Password
  const updatePassword = async (newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !isSupabaseConfigured()) {
      addToast('success', 'Password Updated', 'Your new password has been saved.');
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPass
      });

      if (error) {
        addToast('error', 'Update Failed', error.message);
        return { success: false, error: error.message };
      }

      addToast('success', 'Password Changed', 'Your password has been updated securely.');
      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Password update error';
      addToast('error', 'Error', msg);
      return { success: false, error: msg };
    }
  };

  // Demo Logins for immediate testing
  const loginAsDemoStudent = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthModalOpen(false);
    addToast('success', 'Logged In as Student', 'Welcome back, Arjun Kumar!');
  };

  const loginAsDemoAdmin = () => {
    setUser({
      id: 'usr-admin-demo',
      fullName: 'Medha Maths Admin',
      email: 'admin@medhamaths.in',
      phone: '+91 73708 10156',
      classLevel: 10,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      joinedDate: 'January 2024',
      role: 'admin',
      enrolledCourseIds: courses.map((c) => c.id),
      completedLessonIds: [],
      purchasedMaterialIds: studyMaterials.map((m) => m.id),
      quizAttempts: []
    });
    setIsAuthModalOpen(false);
    addToast('info', 'Admin Control Activated ⚡', 'You have full administrative privileges to manage courses, classes, subjects, and curriculum.');
  };

  const logout = async () => {
    if (supabase && isSupabaseConfigured()) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    navigateTo('home');
    addToast('info', 'Logged Out', 'You have been safely logged out.');
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, ...data } : null));

    if (supabase && isSupabaseConfigured()) {
      await updateUserProfileInSupabase(user.id, {
        full_name: data.fullName,
        phone: data.phone,
        class_level: data.classLevel,
        avatar_url: data.avatar
      });
    }

    addToast('success', 'Profile Saved', 'Your profile details have been updated.');
  };

  // Checkout Flow
  const openCheckout = (item: { type: 'course' | 'material'; course?: Course; material?: StudyMaterial }) => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
      addToast('info', 'Please Sign In', 'Sign in or create an account to enroll and unlock course access.');
      return;
    }
    setCheckoutItem(item);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutItem(null);
  };

  const processRazorpayPaymentSuccess = async (
    paymentId: string,
    method: string,
    couponCode?: string,
    discount: number = 0,
    explicitOrderId?: string
  ) => {
    if (!user || !checkoutItem) return;

    const isCourse = checkoutItem.type === 'course' && checkoutItem.course;
    const isMaterial = checkoutItem.type === 'material' && checkoutItem.material;

    const title = isCourse ? checkoutItem.course!.title : checkoutItem.material!.title;
    const rawPrice = isCourse ? checkoutItem.course!.discountedPrice : checkoutItem.material!.price;
    const finalAmount = Math.max(0, rawPrice - discount);
    const orderId = explicitOrderId || `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: PurchaseOrder = {
      id: orderId,
      studentId: user.id,
      studentName: user.fullName,
      studentEmail: user.email,
      studentPhone: user.phone,
      courseId: isCourse ? checkoutItem.course!.id : checkoutItem.material!.id,
      courseTitle: title,
      amount: finalAmount,
      originalAmount: isCourse ? checkoutItem.course!.originalPrice : rawPrice,
      discountAmount: (isCourse ? checkoutItem.course!.originalPrice - checkoutItem.course!.discountedPrice : 0) + discount,
      couponCode: couponCode || undefined,
      paymentId,
      orderStatus: 'paid',
      paymentMethod: (method as any) || 'upi',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    // Update local state immediately
    setOrders((prev) => [newOrder, ...prev]);

    if (isCourse) {
      const courseId = checkoutItem.course!.id;
      if (!user.enrolledCourseIds.includes(courseId)) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
              }
            : null
        );
      }
    } else if (isMaterial) {
      const matId = checkoutItem.material!.id;
      if (!user.purchasedMaterialIds.includes(matId)) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                purchasedMaterialIds: [...prev.purchasedMaterialIds, matId]
              }
            : null
        );
      }
    }

    // Persist to Supabase if live
    if (supabase && isSupabaseConfigured() && isCourse) {
      await savePurchaseToSupabase({
        id: orderId,
        user_id: user.id,
        course_id: checkoutItem.course!.id,
        payment_id: paymentId,
        order_id: orderId,
        amount: finalAmount,
        currency: 'INR',
        status: 'paid'
      });
    }

    closeCheckout();
    addToast(
      'success',
      'Payment Successful! 🎉',
      `Your purchase of "${title}" is confirmed. Instant access is unlocked in your dashboard!`
    );
  };

  // Lesson Player & Progress Tracking
  const openLessonPlayer = (lesson: Lesson, courseTitle: string, courseId: string, chapterTitle: string) => {
    setActiveLesson({ lesson, courseTitle, courseId, chapterTitle });
  };

  const closeLessonPlayer = () => {
    setActiveLesson(null);
  };

  const toggleLessonCompletion = async (lessonId: string) => {
    if (!user) return;
    const isCompleted = user.completedLessonIds.includes(lessonId);
    const newCompleted = !isCompleted;
    const updated = newCompleted
      ? [...user.completedLessonIds, lessonId]
      : user.completedLessonIds.filter((id) => id !== lessonId);

    setUser((prev) => (prev ? { ...prev, completedLessonIds: updated } : null));

    if (supabase && isSupabaseConfigured()) {
      await saveLessonProgressToSupabase(user.id, lessonId, newCompleted);
    }

    addToast(
      'info',
      newCompleted ? 'Lesson Completed! 🌟' : 'Marked Incomplete',
      newCompleted ? 'Great progress! Keep striving for 100/100.' : 'Lesson status updated.'
    );
  };

  const openMaterialReader = (material: StudyMaterial) => {
    setActiveStudyMaterial(material);
  };

  const closeMaterialReader = () => {
    setActiveStudyMaterial(null);
  };

  // Admin Actions
  const addNewCourse = async (course: Course) => {
    setCourses((prev) => [course, ...prev]);

    if (supabase && isSupabaseConfigured()) {
      await supabase.from('courses').insert({
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.shortDescription,
        class_id: `class-${course.classLevel}`,
        subject_id: course.subjectId,
        course_type: course.courseType,
        teacher_name: course.teacher.name,
        teacher_bio: course.teacher.qualification,
        thumbnail_url: course.thumbnail,
        price: course.discountedPrice,
        original_price: course.originalPrice,
        discount: course.originalPrice - course.discountedPrice,
        duration: `${course.durationHours} Hours`,
        total_lessons: course.lessonsCount,
        is_published: course.isPublished,
        is_featured: course.isFeatured,
        badge: course.badge
      });
    }

    addToast('success', 'Course Published', `"${course.title}" has been successfully added to catalog.`);
  };

  const updateCourse = async (updatedCourse: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));

    if (supabase && isSupabaseConfigured()) {
      await supabase
        .from('courses')
        .update({
          title: updatedCourse.title,
          description: updatedCourse.shortDescription,
          price: updatedCourse.discountedPrice,
          original_price: updatedCourse.originalPrice,
          is_published: updatedCourse.isPublished,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedCourse.id);
    }

    addToast('success', 'Course Updated', `Changes to "${updatedCourse.title}" have been saved.`);
  };

  const deleteCourse = async (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));

    if (supabase && isSupabaseConfigured()) {
      await supabase.from('courses').delete().eq('id', courseId);
    }

    addToast('warning', 'Course Removed', 'The course was deleted from the catalog.');
  };

  const toggleCoursePublish = async (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    const newStatus = !course.isPublished;

    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, isPublished: newStatus } : c))
    );

    if (supabase && isSupabaseConfigured()) {
      await supabase.from('courses').update({ is_published: newStatus }).eq('id', courseId);
    }

    addToast('info', newStatus ? 'Course Published' : 'Course Moved to Drafts', course.title);
  };

  // Admin Class & Subject Management
  const addClass = (newClass: SchoolClass) => {
    setClasses((prev) => [...prev, newClass]);
    if (supabase && isSupabaseConfigured()) {
      supabase.from('classes').insert({
        id: newClass.id,
        name: newClass.name,
        slug: newClass.slug,
        description: newClass.description,
        display_order: newClass.displayOrder,
        is_active: newClass.isActive
      }).then(() => {});
    }
    addToast('success', 'Class Added', `${newClass.name} is now available in the curriculum.`);
  };

  const updateClass = (classId: string, updates: Partial<SchoolClass>) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, ...updates } : c))
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('classes').update({
        name: updates.name,
        description: updates.description,
        is_active: updates.isActive
      }).eq('id', classId).then(() => {});
    }
    addToast('success', 'Class Updated', 'Changes have been saved.');
  };

  const addSubject = (newSubject: SchoolSubject) => {
    setSubjects((prev) => [...prev, newSubject]);
    if (supabase && isSupabaseConfigured()) {
      supabase.from('subjects').insert({
        id: newSubject.id,
        name: newSubject.name,
        slug: newSubject.slug,
        description: newSubject.description,
        icon: newSubject.icon,
        is_active: newSubject.isActive
      }).then(() => {});
    }
    addToast('success', 'Subject Added', `${newSubject.name} has been added.`);
  };

  const updateSubject = (subjectId: string, updates: Partial<SchoolSubject>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, ...updates } : s))
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('subjects').update({
        name: updates.name,
        description: updates.description,
        is_active: updates.isActive
      }).eq('id', subjectId).then(() => {});
    }
    addToast('success', 'Subject Updated', 'Changes have been saved.');
  };

  // Admin Curriculum Management (Modules & Lessons)
  const addChapterModule = (courseId: string, moduleData: Omit<CourseModule, 'id'>) => {
    const newModId = `mod-${Date.now()}`;
    const newMod: CourseModule = {
      id: newModId,
      ...moduleData
    };
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedMods = [...c.modules, newMod];
          return {
            ...c,
            modules: updatedMods,
            chaptersCount: updatedMods.length
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('course_modules').insert({
        id: newModId,
        course_id: courseId,
        title: moduleData.title,
        description: moduleData.description,
        display_order: moduleData.chapterNumber
      }).then(() => {});
    }
    addToast('success', 'Chapter Added', `Chapter "${moduleData.title}" created.`);
  };

  const updateChapterModule = (courseId: string, moduleId: string, updates: Partial<CourseModule>) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            modules: c.modules.map((m) => (m.id === moduleId ? { ...m, ...updates } : m))
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('course_modules').update({
        title: updates.title,
        description: updates.description
      }).eq('id', moduleId).then(() => {});
    }
    addToast('success', 'Chapter Updated', 'Chapter details updated.');
  };

  const deleteChapterModule = (courseId: string, moduleId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedMods = c.modules.filter((m) => m.id !== moduleId);
          return {
            ...c,
            modules: updatedMods,
            chaptersCount: updatedMods.length
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('course_modules').delete().eq('id', moduleId).then(() => {});
    }
    addToast('warning', 'Chapter Removed', 'Chapter module deleted.');
  };

  const addLessonToModule = (courseId: string, moduleId: string, lessonData: Omit<Lesson, 'id'>) => {
    const newLessonId = `les-${Date.now()}`;
    const newLesson: Lesson = {
      id: newLessonId,
      ...lessonData
    };
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedMods = c.modules.map((m) => {
            if (m.id === moduleId) {
              return {
                ...m,
                lessons: [...m.lessons, newLesson]
              };
            }
            return m;
          });
          const totalLes = updatedMods.reduce((acc, m) => acc + m.lessons.length, 0);
          return {
            ...c,
            modules: updatedMods,
            lessonsCount: totalLes
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('lessons').insert({
        id: newLessonId,
        module_id: moduleId,
        title: lessonData.title,
        description: lessonData.summary || '',
        video_url: lessonData.videoUrl || '',
        pdf_url: lessonData.notesPdfUrl || '',
        duration: `${lessonData.durationMinutes} Mins`,
        display_order: lessonData.displayOrder || 1,
        is_free: lessonData.isFreePreview
      }).then(() => {});
    }
    addToast('success', 'Lesson Created', `Lesson "${lessonData.title}" added.`);
  };

  const updateLessonInModule = (
    courseId: string,
    moduleId: string,
    lessonId: string,
    updates: Partial<Lesson>
  ) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            modules: c.modules.map((m) => {
              if (m.id === moduleId) {
                return {
                  ...m,
                  lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l))
                };
              }
              return m;
            })
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('lessons').update({
        title: updates.title,
        description: updates.summary,
        video_url: updates.videoUrl,
        pdf_url: updates.notesPdfUrl,
        is_free: updates.isFreePreview
      }).eq('id', lessonId).then(() => {});
    }
    addToast('success', 'Lesson Updated', 'Lesson saved successfully.');
  };

  const deleteLessonFromModule = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedMods = c.modules.map((m) => {
            if (m.id === moduleId) {
              return {
                ...m,
                lessons: m.lessons.filter((l) => l.id !== lessonId)
              };
            }
            return m;
          });
          const totalLes = updatedMods.reduce((acc, m) => acc + m.lessons.length, 0);
          return {
            ...c,
            modules: updatedMods,
            lessonsCount: totalLes
          };
        }
        return c;
      })
    );
    if (supabase && isSupabaseConfigured()) {
      supabase.from('lessons').delete().eq('id', lessonId).then(() => {});
    }
    addToast('warning', 'Lesson Deleted', 'Lesson removed from chapter.');
  };

  // WhatsApp Link Helper
  const getWhatsAppUrl = (
    messageType: 'general' | 'course' | 'payment' = 'general',
    courseName?: string,
    classNumber?: string | number
  ) => {
    let text = 'Hi, I want to know more about Medha Maths courses.';
    if (messageType === 'course' && courseName) {
      text = `Hi, I am interested in the ${courseName}${classNumber ? ` for Class ${classNumber}` : ''}. Please share more details.`;
    } else if (messageType === 'payment') {
      text = 'Hi, I need help regarding my course payment on Medha Maths.';
    }
    let digits = whatsAppNumber.replace(/[^0-9]/g, '');
    if (digits.length === 10) {
      digits = '91' + digits;
    }
    return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        isSupabaseLive,
        isLoadingData,
        currentView,
        navigateTo,
        activeCourseSlug,
        activeQuizId,
        selectedClassFilter,
        setSelectedClassFilter,
        selectedSubjectFilter,
        setSelectedSubjectFilter,
        selectedCourseTypeFilter,
        setSelectedCourseTypeFilter,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        classes,
        subjects,
        courses,
        studyMaterials,
        quizzes,
        orders,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        signUpWithSupabase,
        signInWithSupabase,
        sendPasswordReset,
        updatePassword,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
        updateUserProfile,
        isCheckoutOpen,
        checkoutItem,
        openCheckout,
        closeCheckout,
        processRazorpayPaymentSuccess,
        activeLesson,
        openLessonPlayer,
        closeLessonPlayer,
        toggleLessonCompletion,
        activeStudyMaterial,
        openMaterialReader,
        closeMaterialReader,
        addNewCourse,
        updateCourse,
        deleteCourse,
        toggleCoursePublish,
        addClass,
        updateClass,
        addSubject,
        updateSubject,
        addChapterModule,
        updateChapterModule,
        deleteChapterModule,
        addLessonToModule,
        updateLessonInModule,
        deleteLessonFromModule,
        getWhatsAppUrl,
        whatsAppNumber,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
