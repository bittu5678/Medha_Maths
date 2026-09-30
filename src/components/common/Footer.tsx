import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
  Instagram,
  Send,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CLASSES_DATA, SUBJECTS_LIST } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { navigateTo, getWhatsAppUrl } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-blue-900/40 text-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer select-none inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
                  <span>MEDHA</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">MATHS</span>
                </div>
                <p className="text-[10px] font-bold tracking-wider text-blue-300 uppercase">
                  Learn Better. Score Better.
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Medha Maths is India’s premier concept-focused online learning platform for school students from Class 6 to Class 12. Complete CBSE & State Board courses, chapter video lectures, 10-year PYQ solutions, test series, and dedicated teacher doubt clearing.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-red-950/70 border border-red-500/30 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-pink-950/70 border border-pink-500/30 text-pink-400 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Safe & Secure
              </span>
              <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                <Award className="w-4 h-4 text-emerald-400" /> CBSE Aligned Curriculum
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('courses')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  All School Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('classes')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Classes (6 to 12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('subjects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Subjects Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('study-material')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Free Notes & PDFs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('quizzes')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Online Tests & Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Medha Maths
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact & WhatsApp Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: School Classes */}
          <div className="space-y-3">
            <p className="text-white font-bold text-sm uppercase tracking-wider">Classes 6 to 12</p>
            <ul className="space-y-2 text-xs">
              {CLASSES_DATA.map((c) => (
                <li key={c.level}>
                  <button
                    onClick={() => navigateTo('courses', { classLevel: c.level })}
                    className="hover:text-cyan-400 transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{c.name} Courses</span>
                    <span className="text-[10px] text-slate-500">{c.targetBoard}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="space-y-3">
            <p className="text-white font-bold text-sm uppercase tracking-wider">Student Helpline</p>
            <div className="space-y-2 text-xs text-slate-300">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Helpline: +91 73708 10156</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@medhamaths.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>New Delhi / Digital Learning Hub, India</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Policies & Terms</p>
              <div className="flex flex-col gap-1 text-xs">
                <button
                  onClick={() => navigateTo('privacy')}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => navigateTo('terms')}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => navigateTo('refund')}
                  className="text-left hover:text-cyan-400 transition-colors"
                >
                  Refund & Cancellation Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Medha Maths. All rights reserved. "Learn Better. Score Better."</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>CBSE & State Board Prep</span>
            <span>•</span>
            <span>Razorpay Secure 256-Bit SSL</span>
            <span>•</span>
            <span>Made for Indian Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
