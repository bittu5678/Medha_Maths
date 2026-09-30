import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../courses/CourseCard';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  HelpCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import { ClassLevel, SubjectId } from '../../types';

export const ClassDetailsPage: React.FC = () => {
  const {
    selectedClassFilter,
    setSelectedClassFilter,
    classes,
    subjects,
    courses,
    selectedSubjectFilter,
    setSelectedSubjectFilter,
    navigateTo,
    getWhatsAppUrl
  } = useApp();

  const currentLevel = selectedClassFilter === 'all' ? 10 : (selectedClassFilter as ClassLevel);
  const currentClass = classes.find((c) => c.slug === String(currentLevel)) || classes[4] || {
    id: `class-${currentLevel}`,
    name: `Class ${currentLevel}`,
    slug: String(currentLevel),
    description: `Comprehensive CBSE & State Board syllabus preparation for Class ${currentLevel} students.`,
    displayOrder: 5,
    isActive: true
  };

  const classCourses = useMemo(() => {
    return courses.filter((course) => {
      if (!course.isPublished) return false;
      if (course.classLevel !== currentLevel) return false;
      if (selectedSubjectFilter !== 'all' && course.subjectId !== selectedSubjectFilter) {
        return false;
      }
      return true;
    });
  }, [courses, currentLevel, selectedSubjectFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Class Selection Pills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-2 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
          {classes.map((cls) => {
            const levelNum = parseInt(cls.slug) as ClassLevel;
            const isSelected = selectedClassFilter === levelNum;
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassFilter(levelNum)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cls.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Class Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-800/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>CBSE & State Board Curriculum Batch</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {currentClass.name} Online Coaching & Courses
              </h1>
              <p className="text-sm sm:text-base text-blue-200 leading-relaxed max-w-2xl">
                {currentClass.description}
              </p>

              {/* Badges / Highlights */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% NCERT Solutions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-xl">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>10-Year Board PYQ Bank</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Recorded HD + Doubt Support</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-blue-900/50 rounded-2xl p-6 space-y-4 text-center">
              <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Need Syllabus Guidance?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Chat directly with our senior faculty for Class {currentLevel} study roadmap.
                </p>
              </div>
              <a
                href={getWhatsAppUrl('course', `${currentClass.name} Courses`, currentLevel)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Counselor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Subjects for {currentClass.name}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select a subject to view dedicated video batches, notes and tests.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Subjects
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectFilter(sub.id as SubjectId)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedSubjectFilter === sub.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          {classCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {classCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-cyan-400/20 flex items-center justify-center mx-auto text-cyan-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Batches Coming Soon!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                We are actively uploading fresh 2025–26 video batches for this subject in {currentClass.name}. You can also request instant priority access via WhatsApp.
              </p>
              <a
                href={getWhatsAppUrl('course', `${currentClass.name} Batches`, currentLevel)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
