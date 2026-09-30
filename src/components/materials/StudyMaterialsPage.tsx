import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CLASSES_DATA, SUBJECTS_LIST } from '../../data/mockData';
import {
  FileText,
  Download,
  Lock,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ClassLevel, SubjectId } from '../../types';

export const StudyMaterialsPage: React.FC = () => {
  const { studyMaterials, openMaterialReader, openCheckout, user } = useApp();
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredMaterials = studyMaterials.filter((mat) => {
    if (selectedClass !== 'all' && mat.classLevel !== selectedClass) return false;
    if (selectedSubject !== 'all' && mat.subjectId !== selectedSubject) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        mat.title.toLowerCase().includes(q) ||
        mat.description.toLowerCase().includes(q) ||
        mat.subjectName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>CBSE & State Board Curated Notes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Study Materials & Formula Sheets
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            High-yield handwritten formula cheat sheets, NCERT exemplar step solutions, mind maps, and previous 10-year question banks for Classes 6 to 12.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-5 mb-8 shadow-xl space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search formula sheets, notes, mind maps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 mr-1">Class:</span>
            <button
              onClick={() => setSelectedClass('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedClass === 'all'
                  ? 'bg-cyan-400 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              All Classes
            </button>
            {CLASSES_DATA.map((c) => (
              <button
                key={c.level}
                onClick={() => setSelectedClass(c.level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedClass === c.level
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}
              >
                Class {c.level}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-1">Subject:</span>
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              All Subjects
            </button>
            {SUBJECTS_LIST.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubject === s.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}
              >
                {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Study Materials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => {
            const isUnlocked =
              mat.isFree ||
              user?.purchasedMaterialIds.includes(mat.id) ||
              user?.role === 'admin';

            return (
              <div
                key={mat.id}
                className="bg-slate-900/80 border border-blue-900/40 hover:border-cyan-400/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-950 text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-blue-800/80">
                      Class {mat.classLevel} • {mat.subjectName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        mat.isFree
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {mat.isFree ? 'Free Download' : `₹${mat.price}`}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-blue-800/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {mat.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">By {mat.author}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {mat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{mat.pageCount} Pages • {mat.fileSizeBytes}</span>
                    <span>{mat.downloadsCount.toLocaleString()} Downloads</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => openMaterialReader(mat)}
                    className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 border border-blue-900/60 text-slate-200 hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preview PDF</span>
                  </button>

                  {isUnlocked ? (
                    <button
                      onClick={() => openMaterialReader(mat)}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openCheckout({ type: 'material', material: mat })}
                      className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock ₹{mat.price}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
