import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X, ChevronRight, Sparkles, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { getWhatsAppUrl, whatsAppNumber } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickOptions = [
    {
      title: 'Course Admissions & Fees',
      desc: 'Ask about full year batch fees, subjects & discounts',
      type: 'general' as const
    },
    {
      title: 'Class 6–12 Guidance',
      desc: 'Talk with our academic counselor for subject advice',
      type: 'course' as const,
      courseName: 'School Foundation Course'
    },
    {
      title: 'Payment & Checkout Help',
      desc: 'Assistance with UPI, Razorpay, or instant unlock',
      type: 'payment' as const
    }
  ];

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    let cleanNumber = whatsAppNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length === 10) {
      cleanNumber = '91' + cleanNumber;
    }
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-slate-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center p-1.5 shadow-inner">
                <MessageCircle className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Medha Maths WhatsApp Support</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  <span>Online • Instant Reply</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-950/95 space-y-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-300">
              <p className="font-medium text-emerald-400 mb-0.5">Namaste! 🙏</p>
              <p>How can our academic team help you today? Choose an option or type your question below:</p>
            </div>

            {/* Quick Option Buttons */}
            <div className="space-y-2">
              {quickOptions.map((opt, i) => (
                <a
                  key={i}
                  href={getWhatsAppUrl(opt.type, opt.courseName)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 transition-all group cursor-pointer"
                >
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                      {opt.title}
                    </p>
                    <p className="text-[11px] text-slate-400">{opt.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              ))}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleCustomSend} className="mt-3 pt-2 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
                aria-label="Send WhatsApp Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 px-4 py-3 rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 font-bold text-sm transition-all hover:scale-105 cursor-pointer border border-emerald-300/40 select-none"
        id="floating-whatsapp-btn"
        aria-label="Open WhatsApp Chat Support"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-slate-950 fill-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-200 animate-ping" />
        </div>
        <span className="hidden sm:inline font-extrabold tracking-tight">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
