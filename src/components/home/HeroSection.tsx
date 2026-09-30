import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Award,
  Play,
  BookOpen,
  CheckCircle2,
  Users,
  Star,
  Zap,
  TrendingUp,
  Brain
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, getWhatsAppUrl, courses, openLessonPlayer } = useApp();

  // Find a sample preview lesson
  const featuredCourse = courses[0];
  const sampleLesson = featuredCourse?.modules[0]?.lessons[0];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-20 lg:pt-14 lg:pb-28">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Math & Science Watermark Symbols */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-10 font-mono text-3xl font-extrabold text-blue-300">
        <span className="absolute top-16 left-[8%] animate-bounce duration-1000">∑ x²</span>
        <span className="absolute top-36 right-[12%] animate-pulse">π ≈ 3.14</span>
        <span className="absolute bottom-20 left-[15%]">√2 + √3</span>
        <span className="absolute bottom-32 right-[8%]">Δ = b² - 4ac</span>
        <span className="absolute top-1/2 left-[3%]">E = mc²</span>
        <span className="absolute top-1/3 right-[3%]">sin²θ + cos²θ = 1</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/50 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Classes 6 to 12 • CBSE & State Board Learning</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="block text-white">Learn Better.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Score Better.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Complete online learning for Classes 6–12 with concept-based lessons, practice, quizzes and exam-focused preparation. Master Mathematics, Science, Social Science, English and Hindi with India’s top school mentors.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('courses')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                id="hero-explore-courses-btn"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-bold text-base rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/30 cursor-pointer"
                id="hero-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Micro Trust Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-blue-900/30 text-xs text-slate-300 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NCERT Exemplar Solved</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10-Year PYQ Bank</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 WhatsApp Doubts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Visual / Interactive Preview Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glass Card */}
            <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-blue-800/50 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-blue-900/40 backdrop-blur-xl">
              {/* Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block animate-pulse" />
                  <span className="text-xs font-extrabold tracking-wider text-cyan-300 uppercase">
                    Live Demo Classroom
                  </span>
                </div>
                <span className="text-xs font-semibold bg-blue-950 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-800/60">
                  Class 10 CBSE
                </span>
              </div>

              {/* Course Card Preview Image */}
              <div className="mt-4 relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-blue-900/60 group">
                <img
                  src={featuredCourse?.thumbnail || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800'}
                  alt="Class 10 Mathematics Masterclass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[11px] font-bold text-cyan-300">Free Preview Lecture</span>
                  <p className="text-sm font-bold text-white leading-snug">
                    Chapter 1: Real Numbers & Fundamental Theorem
                  </p>
                </div>

                {/* Play Button Overlay */}
                {sampleLesson && (
                  <button
                    onClick={() =>
                      openLessonPlayer(
                        sampleLesson,
                        featuredCourse.title,
                        featuredCourse.id,
                        'Chapter 1: Real Numbers'
                      )
                    }
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan-400/90 hover:bg-cyan-300 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 transition-transform hover:scale-110 cursor-pointer"
                    aria-label="Play Sample Lecture"
                  >
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </button>
                )}
              </div>

              {/* Quick Concept Highlights */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-blue-950/60 rounded-xl border border-blue-900/40">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-slate-200">Concept Derivations</span>
                  </div>
                  <span className="text-[11px] text-cyan-300 font-bold">100% Logic, 0% Rote</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-blue-950/60 rounded-xl border border-blue-900/40">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-slate-200">Pre-Board Score Boost</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">+28% Avg Improvement</span>
                </div>
              </div>

              {/* Bottom Faculty Mini Profile */}
              <div className="mt-4 pt-3.5 border-t border-blue-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    alt="Er. Anand Sharma"
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400/50"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">Er. Anand Sharma</p>
                    <p className="text-[10px] text-slate-400">IIT Roorkee Alum • 12+ Yrs Teaching</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.95 (420+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Floating Achievement Floating Pill 1 */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-3 shadow-xl backdrop-blur-md items-center gap-3 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-white">100/100 Target</p>
                <p className="text-[10px] text-cyan-300">Board Exam Answer Blueprints</p>
              </div>
            </div>

            {/* Floating Achievement Floating Pill 2 */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-2.5 shadow-xl backdrop-blur-md items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-white">15,000+ Enrolled</p>
                <p className="text-[10px] text-slate-400">Class 6–12 Students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Platform Metrics Banner */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 border border-blue-900/40 rounded-3xl backdrop-blur-sm">
          <div className="text-center p-3 border-r border-blue-900/30 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              50,000+
            </p>
            <p className="text-xs font-semibold text-slate-400 mt-1">Students Guided</p>
          </div>

          <div className="text-center p-3 border-r border-blue-900/30 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              98.2%
            </p>
            <p className="text-xs font-semibold text-slate-400 mt-1">Board Exam Pass Rate</p>
          </div>

          <div className="text-center p-3 border-r border-blue-900/30 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              500+
            </p>
            <p className="text-xs font-semibold text-slate-400 mt-1">Video Lectures & Notes</p>
          </div>

          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              24×7
            </p>
            <p className="text-xs font-semibold text-slate-400 mt-1">WhatsApp Doubt Mentor</p>
          </div>
        </div>
      </div>
    </section>
  );
};
