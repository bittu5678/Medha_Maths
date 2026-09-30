import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  FileText,
  Clock,
  Play,
  Award,
  Download,
  ShoppingBag,
  MessageCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  CheckCircle2
} from 'lucide-react';
import { ClassLevel } from '../../types';

export const StudentDashboard: React.FC = () => {
  const {
    user,
    courses,
    studyMaterials,
    quizzes,
    orders,
    navigateTo,
    openLessonPlayer,
    openMaterialReader,
    getWhatsAppUrl,
    updateUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'materials' | 'quizzes' | 'orders' | 'profile'>('courses');

  // Profile Edit State
  const [editFullName, setEditFullName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editClass, setEditClass] = useState<ClassLevel>(user?.classLevel || 10);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[80vh] bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-cyan-400/40 flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black">Student Dashboard</h2>
        <p className="text-slate-400 text-xs mt-1 max-w-sm">
          Please log in to view your enrolled CBSE & State Board courses, PDF notes and quiz scores.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Filter user's enrolled courses
  const enrolledCourses = courses.filter((c) =>
    user.enrolledCourseIds.includes(c.id) || user.role === 'admin'
  );

  // Filter user's purchased / accessible materials
  const accessibleMaterials = studyMaterials.filter(
    (m) => m.isFree || user.purchasedMaterialIds.includes(m.id) || user.role === 'admin'
  );

  const completedLessonCount = user.completedLessonIds.length;
  const totalLessonsInEnrolled = enrolledCourses.reduce((acc, c) => acc + c.lessonsCount, 0);
  const overallProgress = totalLessonsInEnrolled > 0
    ? Math.min(100, Math.round((completedLessonCount / totalLessonsInEnrolled) * 100))
    : 0;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateUserProfile({
        fullName: editFullName.trim(),
        phone: editPhone.trim(),
        classLevel: editClass
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Student Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-blue-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-400/20 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wider">
                  Class {user.classLevel} Student
                </span>
                <span className="text-xs text-slate-400">{user.email}</span>
                {user.role === 'admin' && (
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Admin
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Welcome Back, {user.fullName}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
                Ready to continue your board exam prep? You're making solid progress toward your 100/100 goal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Doubt to Faculty</span>
              </a>

              <button
                onClick={() => navigateTo('courses')}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse More Courses</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-blue-800/40 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-blue-900/40">
              <p className="text-xs text-slate-400 font-medium">Enrolled Courses</p>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">{enrolledCourses.length}</p>
            </div>

            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-blue-900/40">
              <p className="text-xs text-slate-400 font-medium">Completed Lessons</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">{completedLessonCount}</p>
            </div>

            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-blue-900/40">
              <p className="text-xs text-slate-400 font-medium">Study Materials</p>
              <p className="text-xl font-extrabold text-indigo-400 mt-1">{accessibleMaterials.length}</p>
            </div>

            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-blue-900/40">
              <p className="text-xs text-slate-400 font-medium">Overall Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xl font-extrabold text-amber-400">{overallProgress}%</p>
                <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Enrolled Courses ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PDF Notes & Formula Sheets ({accessibleMaterials.length})
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'quizzes'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Chapter Quizzes & Tests ({quizzes.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Purchase History ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Profile
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => {
                  // Calculate course specific completion
                  const allCourseLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
                  const completedInThisCourse = allCourseLessonIds.filter((id) =>
                    user.completedLessonIds.includes(id)
                  ).length;
                  const totalInThisCourse = allCourseLessonIds.length || course.lessonsCount || 1;
                  const courseProgressPct = Math.round((completedInThisCourse / totalInThisCourse) * 100);

                  // Find next uncompleted lesson or default to first
                  let nextLesson = course.modules[0]?.lessons[0];
                  let nextChapter = course.modules[0]?.title || 'Chapter 1';
                  for (const mod of course.modules) {
                    for (const les of mod.lessons) {
                      if (!user.completedLessonIds.includes(les.id)) {
                        nextLesson = les;
                        nextChapter = mod.title;
                        break;
                      }
                    }
                  }

                  return (
                    <div
                      key={course.id}
                      className="bg-slate-900/80 border border-blue-900/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg"
                    >
                      <div className="relative aspect-video bg-slate-950">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-blue-950/90 text-cyan-300 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-700/60">
                          Class {course.classLevel} • {course.subjectName}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-bold text-base text-white">{course.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            Faculty: {course.teacher.name} • {course.chaptersCount} Chapters • {course.lessonsCount} Lessons
                          </p>

                          {/* Progress Bar */}
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>Course Progress</span>
                              <span className="font-bold text-cyan-400">{courseProgressPct}% ({completedInThisCourse}/{totalInThisCourse} Lessons)</span>
                            </div>
                            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                                style={{ width: `${courseProgressPct}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          {nextLesson && (
                            <button
                              onClick={() =>
                                openLessonPlayer(
                                  nextLesson,
                                  course.title,
                                  course.id,
                                  nextChapter
                                )
                              }
                              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
                            >
                              <Play className="w-4 h-4 fill-slate-950" />
                              <span>Continue Learning ▶</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center max-w-md mx-auto space-y-4">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Enrolled Courses Yet</h3>
                <p className="text-xs text-slate-400">
                  Explore full-year syllabus batches for CBSE & State Boards.
                </p>
                <button
                  onClick={() => navigateTo('courses')}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  Browse Available Batches
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Materials */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibleMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-5 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-950 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-700/60">
                      Class {mat.classLevel} • {mat.subjectName}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {mat.pageCount} Pages • {mat.fileSizeBytes}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{mat.title}</h3>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openMaterialReader(mat)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read PDF Note</span>
                  </button>
                  <a
                    href={mat.downloadUrl || mat.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Quizzes */}
        {activeTab === 'quizzes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-amber-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-700/50">
                      Class {quiz.classLevel} • {quiz.subjectName}
                    </span>
                    <span className="text-xs text-slate-400">{quiz.durationMinutes} Mins</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{quiz.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {quiz.questions.length} Objective Board-Pattern Questions • {quiz.totalMarks} Marks
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('quiz-runner', { quizId: quiz.id })}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Practice Quiz</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Purchase History */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Payment Invoices & Orders</h3>
              <span className="text-xs text-slate-400">{orders.length} transactions</span>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-bold">{order.id}</span>
                        <span className="bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                          {order.orderStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-semibold text-white text-sm">{order.courseTitle}</p>
                      <p className="text-slate-400 text-[11px]">Date: {order.date} • Method: {order.paymentMethod.toUpperCase()}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-white">₹{order.amount}</p>
                      <p className="text-[11px] text-slate-400">Payment ID: {order.paymentId}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No purchases made yet.
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Student Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span>Student Profile Settings</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Manage your personal details and school class grade.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Email cannot be changed directly for security reasons.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current School Class
                  </label>
                  <select
                    value={editClass}
                    onChange={(e) => setEditClass(Number(e.target.value) as ClassLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value={6}>Class 6</option>
                    <option value={7}>Class 7</option>
                    <option value={8}>Class 8</option>
                    <option value={9}>Class 9</option>
                    <option value={10}>Class 10</option>
                    <option value={11}>Class 11</option>
                    <option value={12}>Class 12</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingProfile ? 'Saving Changes...' : 'Save Profile Details'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
