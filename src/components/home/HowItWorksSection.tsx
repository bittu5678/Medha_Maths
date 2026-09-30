import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Layers,
  CreditCard,
  PlayCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      step: '01',
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      title: 'Choose Your Class',
      desc: 'Pick your school grade from Class 6 to Class 12 tailored to CBSE or State boards.'
    },
    {
      step: '02',
      icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
      title: 'Select Your Subject',
      desc: 'Choose Mathematics, Science, SST, English, Hindi, or Computer Science.'
    },
    {
      step: '03',
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: 'Choose Your Course',
      desc: 'Select a Full Course, Chapter-wise booster, Crash course, or Test series package.'
    },
    {
      step: '04',
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      title: 'Make Secure Payment',
      desc: 'Pay safely via Razorpay UPI, GPay, PhonePe, Cards or Net Banking with zero extra fees.'
    },
    {
      step: '05',
      icon: <PlayCircle className="w-6 h-6 text-rose-400" />,
      title: 'Start Learning',
      desc: 'Instant unlock on your Student Dashboard. Watch lectures, solve quizzes & clear doubts!'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Simple 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get started in less than 2 minutes and begin your journey towards 100/100 in school and board exams.
          </p>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((st, i) => (
            <div
              key={st.step}
              className="bg-slate-900/70 border border-blue-900/40 rounded-3xl p-5 flex flex-col justify-between hover:border-cyan-400/50 hover:bg-slate-900 transition-all duration-300 relative group shadow-md"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-blue-800/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-bold text-cyan-400/90">
                <span>Step {i + 1} of 5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('courses')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
