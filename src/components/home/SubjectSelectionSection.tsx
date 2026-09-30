import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS_LIST } from '../../data/mockData';
import {
  Calculator,
  Atom,
  BookOpen,
  Globe,
  PenTool,
  Laptop,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SubjectId } from '../../types';

export const SubjectSelectionSection: React.FC = () => {
  const { navigateTo, setSelectedSubjectFilter } = useApp();

  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'mathematics':
        return <Calculator className="w-7 h-7 text-cyan-400" />;
      case 'science':
        return <Atom className="w-7 h-7 text-emerald-400" />;
      case 'english':
        return <BookOpen className="w-7 h-7 text-indigo-400" />;
      case 'social-science':
        return <Globe className="w-7 h-7 text-amber-400" />;
      case 'hindi':
        return <PenTool className="w-7 h-7 text-rose-400" />;
      case 'computer-science':
        return <Laptop className="w-7 h-7 text-blue-400" />;
      default:
        return <BookOpen className="w-7 h-7 text-cyan-400" />;
    }
  };

  const handleSubjectClick = (id: SubjectId) => {
    setSelectedSubjectFilter(id);
    navigateTo('courses', { subjectId: id });
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Curated Subject Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What Do You Want to Learn?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every subject is broken down from root fundamentals to advanced board question patterns. Explore courses, formula sheets, and chapter tests.
          </p>
        </div>

        {/* Subjects 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS_LIST.map((subj) => (
            <div
              key={subj.id}
              onClick={() => handleSubjectClick(subj.id)}
              className="group bg-slate-900/80 hover:bg-blue-950/60 border border-blue-900/40 hover:border-cyan-400/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Hindi Name */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-blue-800/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getSubjectIcon(subj.id)}
                  </div>
                  {subj.hindiName && (
                    <span className="text-xs font-bold text-slate-400 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
                      {subj.hindiName}
                    </span>
                  )}
                </div>

                {/* Subject Name */}
                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {subj.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-semibold text-cyan-400/90 mt-1">
                  {subj.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {subj.description}
                </p>

                {/* Popular Topics Pills */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    High-Yield Topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {subj.popularTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explore Button */}
              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                <span>Explore {subj.name.split(' ')[0]} Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
