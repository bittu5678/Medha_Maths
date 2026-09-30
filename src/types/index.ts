/**
 * Medha Maths - Core Domain Types & Supabase Database Interfaces
 * "Learn Better. Score Better." — Classes 6 to 12 School Learning Platform
 */

export type ClassLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type SubjectId =
  | 'mathematics'
  | 'science'
  | 'english'
  | 'social-science'
  | 'hindi'
  | 'computer-science'
  | string;

export type CourseType =
  | 'complete'
  | 'complete_course'
  | 'chapter-wise'
  | 'chapter_wise'
  | 'crash'
  | 'crash_course'
  | 'revision'
  | 'revision_course'
  | 'exam-prep'
  | 'exam_preparation'
  | 'test-series'
  | 'test_series'
  | 'study-package'
  | 'study_material';

export type StudyMaterialCategory =
  | 'notes'
  | 'pdf'
  | 'question-bank'
  | 'pyq'
  | 'practice-sheet'
  | 'sample-paper'
  | 'important-questions';

export type OrderStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'razorpay';

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  qualification: string;
  bio: string;
  experienceYears: number;
  rating: number;
  subjectSpeciality: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isFreePreview: boolean;
  videoUrl?: string;
  notesPdfUrl?: string;
  summary?: string;
  quizId?: string;
  displayOrder?: number;
  moduleId?: string;
}

export interface CourseModule {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  lessons: Lesson[];
  courseId?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  subjectName: string;
  courseType: CourseType;
  teacher: Teacher;
  shortDescription: string;
  fullDescription: string;
  outcomes: string[];
  requirements: string[];
  thumbnail: string;
  originalPrice: number;
  discountedPrice: number;
  durationHours: number;
  chaptersCount: number;
  lessonsCount: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  isPublished: boolean;
  isFeatured?: boolean;
  badge?: string;
  board?: string;
  modules: CourseModule[];
  createdAt: string;
  updatedAt?: string;
  language: string; // e.g. "Hinglish (Hindi + English)"
}

export interface SchoolClass {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SchoolSubject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  subjectName: string;
  category: StudyMaterialCategory;
  price: number;
  isFree: boolean;
  pageCount: number;
  fileSizeBytes: string;
  previewUrl: string;
  downloadUrl?: string;
  author: string;
  downloadsCount: number;
  rating: number;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hint?: string;
  marks: number;
}

export interface Quiz {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  subjectName: string;
  chapterTitle?: string;
  durationMinutes: number;
  totalMarks: number;
  passingPercentage: number;
  questions: QuizQuestion[];
  isBoardMock?: boolean;
  attemptsCount: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  date: string;
  answers: { [questionId: string]: number };
  isPassed: boolean;
}

export interface PurchaseOrder {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  originalAmount: number;
  discountAmount: number;
  couponCode?: string;
  paymentId: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  date: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  classLevel: ClassLevel;
  avatar?: string;
  joinedDate: string;
  role: 'student' | 'admin' | 'parent';
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  purchasedMaterialIds: string[];
  quizAttempts: QuizAttempt[];
}

export interface Review {
  id: string;
  courseId: string;
  studentName: string;
  classLevel: ClassLevel;
  rating: number;
  comment: string;
  date: string;
  isVerifiedStudent: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  classLevel: ClassLevel | string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'replied' | 'closed';
}

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  hindiName?: string;
  iconName: string;
  accentColor: string;
  tagline: string;
  description: string;
  popularTopics: string[];
}
