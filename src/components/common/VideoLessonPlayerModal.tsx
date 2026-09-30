import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  CheckCircle,
  FileText,
  MessageCircle,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const VideoLessonPlayerModal: React.FC = () => {
  const {
    activeLesson,
    closeLessonPlayer,
    toggleLessonCompletion,
    user,
    getWhatsAppUrl,
    courses,
    openLessonPlayer
  } = useApp();

  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'doubts'>('video');

  if (!activeLesson) return null;

  const { lesson, courseTitle, courseId, chapterTitle } = activeLesson;
  const isCompleted = user?.completedLessonIds.includes(lesson.id) || false;

  // Find the parent course and other lessons in the same module
  const currentCourse = courses.find((c) => c.id === courseId);
  const allLessons = currentCourse ? currentCourse.modules.flatMap((m) => m.lessons) : [];
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-blue-900/60 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[96vh]">
        {/* Modal Topbar */}
        <div className="bg-slate-950 p-4 px-6 border-b border-blue-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <span className="bg-blue-900/80 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0">
              Interactive Classroom
            </span>
            <div className="truncate">
              <h3 className="text-sm font-bold text-white truncate">{lesson.title}</h3>
              <p className="text-xs text-slate-400 truncate">{courseTitle} • {chapterTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleLessonCompletion(lesson.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>

            <button
              onClick={closeLessonPlayer}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
          {/* Main Stage (2 cols) */}
          <div className="lg:col-span-2 flex flex-col bg-black overflow-y-auto">
            {/* Embedded Educational Video Player */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center border-b border-slate-800">
              {lesson.videoUrl ? (
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-cyan-400/50 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
                    <Play className="w-8 h-8 text-cyan-400 fill-cyan-400 ml-1" />
                  </div>
                  <h4 className="text-base font-bold text-white max-w-md">{lesson.title}</h4>
                  <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Duration: {lesson.durationMinutes} Minutes • HD Concept Masterclass</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-3 max-w-sm">
                    {lesson.summary || 'Detailed step-by-step whiteboard derivation, NCERT exercise solutions & board question analysis.'}
                  </p>
                </div>
              )}
            </div>

            {/* Lesson Control & Doubt Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-cyan-400">Classroom Support:</span>
                <span>Stuck on a numerical or formula? Ask the teacher directly.</span>
              </div>
              <a
                href={getWhatsAppUrl('course', `${courseTitle} - ${lesson.title}`)}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask Doubt on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Sidebar: Syllabus Tracker / Notes / Doubts */}
          <div className="bg-slate-950 border-l border-slate-800 flex flex-col h-full overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/60">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                  activeTab === 'video'
                    ? 'border-cyan-400 text-cyan-300 bg-blue-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Course Syllabus
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                  activeTab === 'notes'
                    ? 'border-cyan-400 text-cyan-300 bg-blue-950/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Lecture Notes
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeTab === 'video' && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    All Lessons in this Course
                  </div>

                  <div className="space-y-1.5">
                    {allLessons.map((l, idx) => {
                      const isThisActive = l.id === lesson.id;
                      const isDone = user?.completedLessonIds.includes(l.id);

                      return (
                        <div
                          key={l.id}
                          onClick={() => openLessonPlayer(l, courseTitle, courseId, chapterTitle)}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                            isThisActive
                              ? 'bg-blue-950/90 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="truncate font-medium">{l.title}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isDone && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                            <span className="text-[10px] text-slate-400">{l.durationMinutes}m</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {nextLesson && (
                    <div className="pt-2">
                      <button
                        onClick={() => openLessonPlayer(nextLesson, courseTitle, courseId, chapterTitle)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Next Lesson: {nextLesson.title.substring(0, 24)}...</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-cyan-300">
                      <BookOpen className="w-4 h-4" />
                      <span>Key Takeaways & Formulas</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                      <li>Fundamental definitions and standard notations for board answer keys.</li>
                      <li>Proven step-marking templates to maximize score in 3-mark & 5-mark questions.</li>
                      <li>High-frequency formula summary available in downloadable PDF notes.</li>
                    </ul>
                  </div>

                  <div className="bg-blue-950/40 border border-blue-800/50 p-3.5 rounded-2xl">
                    <p className="font-bold text-white mb-1">Download Chapter PDF Notes</p>
                    <p className="text-[11px] text-slate-400 mb-3">Handwritten teacher annotations and solved NCERT exercise questions.</p>
                    <button
                      onClick={() => alert('PDF notes downloaded to your device!')}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold rounded-xl flex items-center justify-center gap-2 border border-cyan-400/30 text-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download PDF Notes (3.2 MB)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
