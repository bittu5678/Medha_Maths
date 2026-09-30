import React from 'react';
import { DEMO_REVIEWS } from '../../data/mockData';
import { Star, Quote, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900/60 border-y border-blue-900/30 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Student & Parent Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Loved by Students. Trusted by Parents.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real feedback from school students who unlocked concept clarity and boosted their pre-board & board exam scores with Medha Maths.
          </p>
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1 rounded-full inline-block">
              * Demo Student Feedback & Achievements for Illustration
            </span>
          </div>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950/85 border border-blue-900/40 rounded-3xl p-6 relative flex flex-col justify-between hover:border-cyan-400/40 transition-all shadow-lg"
            >
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm">{rev.studentName}</p>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> Verified Student
                    </span>
                  </div>
                  <p className="text-xs text-cyan-300 mt-0.5">
                    Class {rev.classLevel} CBSE Batch • {rev.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
