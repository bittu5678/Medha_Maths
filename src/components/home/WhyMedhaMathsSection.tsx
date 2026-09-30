import React from 'react';
import {
  Brain,
  Target,
  CheckSquare,
  Layers,
  Smartphone,
  Smile,
  Sparkles
} from 'lucide-react';

export const WhyMedhaMathsSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: 'Concept-Based Learning',
      description: 'Zero rote learning. We teach the underlying logic, derivations, and real-world intuition behind every mathematical theorem and scientific law.'
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-400" />,
      title: 'Exam-Focused Preparation',
      description: 'Targeted for 95%+ in school & board exams. Complete analysis of 10-year previous board question trends and official CBSE marking schemes.'
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-amber-400" />,
      title: 'Practice & Quizzes',
      description: 'Chapter-wise MCQ speed tests, assertion-reason drills, case-based questions, and full-length simulated mock examination papers.'
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: 'Structured Courses',
      description: 'Systematic chapter modules from NCERT fundamentals to high-order thinking (HOTS) questions. Never feel overwhelmed or lost.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: 'Learning Anytime, Anywhere',
      description: 'Study smoothly on your mobile phone, tablet, laptop, or desktop with instant video playback, downloadable PDF notes, and formula sheets.'
    },
    {
      icon: <Smile className="w-6 h-6 text-rose-400" />,
      title: 'Student-Friendly Explanation',
      description: 'Engaging, friendly teachers who explain difficult topics in easy Hinglish with step-by-step whiteboard derivations and doubt support.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-y border-blue-900/30 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>The Medha Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why Learn With Medha Maths?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We bridge the gap between classroom textbooks and top exam scores through crystal-clear concept pedagogy, board answer-writing secrets, and continuous student support.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-slate-950/80 border border-blue-900/40 hover:border-cyan-400/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-blue-800/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
