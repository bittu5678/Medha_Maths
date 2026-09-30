import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Clock,
  BookOpen,
  Layers,
  CheckCircle2,
  Lock,
  Play,
  MessageCircle,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  ArrowLeft,
  Users,
  Sparkles
} from 'lucide-react';
import { Lesson } from '../../types';

export const CourseDetailsPage: React.FC = () => {
  const {
    activeCourseSlug,
    courses,
    navigateTo,
    openCheckout,
    openLessonPlayer,
    getWhatsAppUrl,
    user
  } = useApp();

  const [openChapterIndices, setOpenChapterIndices] = useState<number[]>([0, 1]);

  // Lookup active course by slug
  const course = courses.find((c) => c.slug === activeCourseSlug) || courses[0];

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
        <button
          onClick={() => navigateTo('courses')}
          className="mt-4 px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold"
        >
          Back to Courses Catalog
        </button>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourseIds.includes(course.id) || user?.role === 'admin';
  const discountPercent = Math.round(
    ((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100
  );

  const toggleChapter = (index: number) => {
    setOpenChapterIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLessonAction = (lesson: Lesson, chapterTitle: string) => {
    if (isEnrolled || lesson.isFreePreview) {
      openLessonPlayer(lesson, course.title, course.id, chapterTitle);
    } else {
      openCheckout({ type: 'course', course });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-cyan-400 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('courses')}
            className="hover:text-cyan-400 transition-colors"
          >
            Courses
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-semibold truncate max-w-xs">
            {course.title}
          </span>
        </div>

        {/* Top Hero Layout (Header + Sticky Purchase Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-900/80 text-cyan-300 text-xs font-bold px-3 py-1 rounded-xl border border-blue-700/60">
                  Class {course.classLevel}
                </span>
                <span className="bg-slate-900 text-slate-300 text-xs font-semibold px-3 py-1 rounded-xl border border-slate-800">
                  {course.subjectName}
                </span>
                <span className="bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-xl border border-emerald-500/30">
                  {course.language}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {course.fullDescription}
              </p>

              {/* Metrics Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.reviewCount} Reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{course.studentCount.toLocaleString()} Enrolled</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{course.durationHours} Hours Complete Content</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>What You'll Learn in this Course</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum & Modules */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    Course Curriculum
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.chaptersCount} Chapters • {course.lessonsCount} Video Lessons • Practice Quizzes
                  </p>
                </div>

                <button
                  onClick={() =>
                    setOpenChapterIndices(
                      openChapterIndices.length === course.modules.length
                        ? []
                        : course.modules.map((_, i) => i)
                    )
                  }
                  className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
                >
                  {openChapterIndices.length === course.modules.length ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              {/* Module Accordions */}
              <div className="space-y-3">
                {course.modules.map((module, idx) => {
                  const isOpen = openChapterIndices.includes(idx);

                  return (
                    <div
                      key={module.id}
                      className="bg-slate-900/80 border border-blue-900/40 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleChapter(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-950 border border-blue-800/60 flex items-center justify-center text-cyan-300 font-extrabold text-xs shrink-0">
                            {module.chapterNumber}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-white">
                              {module.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                              {module.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-400">
                            {module.lessons.length} Lessons
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isOpen ? 'rotate-180 text-cyan-400' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-slate-800/80 bg-slate-950/40">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {isEnrolled || lesson.isFreePreview ? (
                                  <Play className="w-4 h-4 text-cyan-400 shrink-0 fill-cyan-400/20" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                                )}
                                <span className="text-slate-200 font-medium truncate">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-slate-400 text-[11px]">
                                  {lesson.durationMinutes} mins
                                </span>

                                {lesson.isFreePreview && !isEnrolled ? (
                                  <button
                                    onClick={() => handleLessonAction(lesson, module.title)}
                                    className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold rounded-lg border border-cyan-400/30 transition-colors cursor-pointer"
                                  >
                                    Free Preview ▶
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleLessonAction(lesson, module.title)}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                                      isEnrolled
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    {isEnrolled ? 'Start Learning ▶' : '🔒 Locked'}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Teacher Details Box */}
            <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                About Your Faculty Mentor
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                <img
                  src={course.teacher.avatar}
                  alt={course.teacher.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-lg shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{course.teacher.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">{course.teacher.qualification}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">{course.teacher.bio}</p>
                  <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-semibold">{course.teacher.experienceYears}+ Years Teaching</span>
                    <span>•</span>
                    <span className="text-amber-400 font-semibold">★ {course.teacher.rating} Educator Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Purchase Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-slate-900 border border-blue-800/60 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-blue-900/50">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={() => {
                      const sample = course.modules[0]?.lessons[0];
                      if (sample) openLessonPlayer(sample, course.title, course.id, 'Chapter 1 Preview');
                    }}
                    className="w-12 h-12 rounded-full bg-cyan-400/90 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Pricing Box */}
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">
                      ₹{course.discountedPrice}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{course.originalPrice}
                    </span>
                  </div>
                  <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                  Limited Time Board Exam Discount • Instant Dashboard Access
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    if (isEnrolled) {
                      navigateTo('dashboard');
                    } else {
                      openCheckout({ type: 'course', course });
                    }
                  }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-cyan-500/25 transition-all cursor-pointer text-center"
                >
                  {isEnrolled ? 'Go to Student Dashboard' : 'Buy Now & Enroll (₹' + course.discountedPrice + ')'}
                </button>

                <a
                  href={getWhatsAppUrl('course', course.title, course.classLevel)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp About this Course</span>
                </a>
              </div>

              {/* Course Inclusions Checklist */}
              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-300">
                <p className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                  This Course Includes:
                </p>
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{course.durationHours} Hours Full HD Video Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Chapter-wise Downloadable PDF Formula Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10-Year Solved Board PYQs & Exemplar</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Dedicated Teacher Doubt Clearing on WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Full Academic Year Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
