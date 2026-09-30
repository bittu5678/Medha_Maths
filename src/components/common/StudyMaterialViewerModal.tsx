import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Download,
  FileText,
  Lock,
  CheckCircle2,
  Share2,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const StudyMaterialViewerModal: React.FC = () => {
  const {
    activeStudyMaterial,
    closeMaterialReader,
    user,
    openCheckout,
    addToast
  } = useApp();

  const [currentPage, setCurrentPage] = useState(1);

  if (!activeStudyMaterial) return null;

  const isPurchased =
    activeStudyMaterial.isFree ||
    user?.purchasedMaterialIds.includes(activeStudyMaterial.id) ||
    user?.role === 'admin';

  const totalPages = activeStudyMaterial.pageCount || 24;

  const handleDownload = () => {
    if (!isPurchased) {
      openCheckout({ type: 'material', material: activeStudyMaterial });
      return;
    }
    addToast('success', 'Download Started', `Downloading "${activeStudyMaterial.title}".`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-blue-900/60 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-5 border-b border-blue-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-700/50 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-400/30">
                  Class {activeStudyMaterial.classLevel} • {activeStudyMaterial.subjectName}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 capitalize">
                  {activeStudyMaterial.category.replace('-', ' ')}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white truncate mt-0.5">
                {activeStudyMaterial.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isPurchased ? (
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF ({activeStudyMaterial.fileSizeBytes})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  closeMaterialReader();
                  openCheckout({ type: 'material', material: activeStudyMaterial });
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock for ₹{activeStudyMaterial.price}</span>
              </button>
            )}

            <button
              onClick={closeMaterialReader}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Reader Canvas Area */}
        <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-200 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            {/* Watermark / Header */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-900 flex items-center justify-center text-white text-xs font-black">
                  M
                </div>
                <span className="font-extrabold text-sm text-blue-950 tracking-tight">
                  MEDHA MATHS ACADEMY
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Document Simulated Sample Content */}
            <div className="my-6 space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-3.5 rounded-r-xl">
                <h4 className="font-extrabold text-base text-blue-950">
                  {activeStudyMaterial.title}
                </h4>
                <p className="text-xs text-blue-800 mt-1">
                  Prepared by {activeStudyMaterial.author} for CBSE & State Board 2025-26 Examinations.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900">
                  Section A: Key Formulas, Axioms & Board Marking Guidelines
                </p>
                <div className="p-3 bg-slate-100 rounded-lg font-mono text-[11px] text-slate-800">
                  1. Fundamental Theorem: Any composite number = product of primes (unique factorization).
                  <br />
                  2. For any two numbers a, b: LCM(a, b) × HCF(a, b) = a × b.
                  <br />
                  3. Irrationality condition: If p is prime and p divides a², then p divides a.
                </div>
                <p>
                  Tip for high marks: Always state the formula on the right margin with a neat box before substituting numerical values to secure full step marks in board evaluation.
                </p>
              </div>
            </div>

            {/* Document Bottom Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>Class {activeStudyMaterial.classLevel} • {activeStudyMaterial.subjectName}</span>
              <span>Confidential Student Resource • Medha Maths</span>
            </div>
          </div>
        </div>

        {/* Reader Footer Controls */}
        <div className="bg-slate-950 p-3 px-6 border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 hidden sm:block">
            {activeStudyMaterial.downloadsCount.toLocaleString()} students downloaded this resource
          </p>
        </div>
      </div>
    </div>
  );
};
