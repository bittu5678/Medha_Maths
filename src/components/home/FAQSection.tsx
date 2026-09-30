import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQ_ITEMS } from '../../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { getWhatsAppUrl } = useApp();
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Clear Answers to Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about Medha Maths courses, validity, mobile access, and admissions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-blue-900/40 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-950 border-cyan-400 text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-950/70 via-slate-900 to-blue-950/70 border border-blue-800/50 rounded-3xl text-center space-y-3">
          <p className="font-bold text-white text-base">Still have questions or need course guidance?</p>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Our academic counselors are available on WhatsApp to guide you regarding batch timings, syllabus, and study plans.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Talk to Counselor on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
