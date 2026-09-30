import React from 'react';
import { useApp } from '../../context/AppContext';
import { CLASSES_DATA } from '../../data/mockData';
import { GraduationCap, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const ClassSelectionSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-slate-900/60 border-y border-blue-900/30 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-cyan-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Structured School Batches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Choose Your Class
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tailored curriculum for school examinations, Olympiads, and Board preparations. Select your grade to explore specialized syllabus courses and study materials.
          </p>
        </div>

        {/* Class Cards Grid (7 classes from Class 6 to 12) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CLASSES_DATA.map((cls) => {
            const isBoardClass = cls.level === 10 || cls.level === 12;

            return (
              <div
                key={cls.level}
                className={`group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative border ${
                  isBoardClass
                    ? 'bg-gradient-to-b from-blue-950/90 to-slate-950 border-cyan-400/50 shadow-xl shadow-cyan-900/20 hover:border-cyan-400'
                    : 'bg-slate-950/80 border-blue-900/40 hover:border-blue-700/80 hover:bg-slate-900/90'
                }`}
              >
                {isBoardClass && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md">
                    Board Special 🔥
                  </div>
                )}

                <div>
                  {/* Top Class Number & Badge */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-cyan-300 leading-none">CLASS</span>
                        <span className="text-xl font-black text-white">{cls.level}</span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-lg">
                      {cls.badge}
                    </span>
                  </div>

                  {/* Title & Board */}
                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {cls.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mt-0.5">
                    {cls.targetBoard}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                    {cls.description}
                  </p>

                  {/* Subject Count */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>{cls.subjectCount} Core Subjects</span>
                    </div>
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {cls.highlight}
                    </span>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="mt-6">
                  <button
                    onClick={() => navigateTo('courses', { classLevel: cls.level })}
                    className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isBoardClass
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 hover:bg-blue-950 border border-blue-800/60 text-slate-200 hover:text-cyan-300'
                    }`}
                  >
                    <span>Explore Class {cls.level} Courses</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
