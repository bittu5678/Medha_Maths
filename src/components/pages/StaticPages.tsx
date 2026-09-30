import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Award,
  Sparkles,
  Send,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo, getWhatsAppUrl } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Our Mission & Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Medha Maths
          </h1>
          <p className="text-cyan-300 font-bold text-base">Learn Better. Score Better.</p>
        </div>

        {/* Narrative Box */}
        <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed shadow-xl">
          <h2 className="text-xl font-black text-white">Dedicated to School Mathematics & Science Excellence</h2>
          <p>
            Medha Maths was founded with a singular conviction: every school student in India from Class 6 to Class 12 deserves access to exceptional, concept-driven education.
          </p>
          <p>
            Too often, students are taught to memorize formulas without understanding the fundamental reasoning, resulting in fear of subjects like Mathematics and Science. Medha Maths reverses this paradigm by breaking down difficult theorems into intuitive whiteboard models, real-world examples, and structured step-marking strategies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 bg-slate-950 rounded-2xl border border-blue-900/50">
              <p className="text-cyan-400 font-extrabold text-lg">Classes 6–12</p>
              <p className="text-xs text-slate-400 mt-1">Holistic middle school to higher secondary foundation.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-blue-900/50">
              <p className="text-emerald-400 font-extrabold text-lg">100/100 Target</p>
              <p className="text-xs text-slate-400 mt-1">Targeted board answer keys and NCERT Exemplar mastery.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-blue-900/50">
              <p className="text-amber-400 font-extrabold text-lg">1-on-1 Doubts</p>
              <p className="text-xs text-slate-400 mt-1">Direct teacher WhatsApp resolution whenever you get stuck.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('courses')}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 cursor-pointer"
          >
            Explore All School Batches
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactUsPage: React.FC = () => {
  const { getWhatsAppUrl, addToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentClass, setStudentClass] = useState('10');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addToast('success', 'Enquiry Submitted!', 'Our academic counselor will get in touch shortly on your WhatsApp.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Academic Admissions & Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Medha Maths
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Have questions about course admissions, fee structures, or batch schedules? We are here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-white">Get in Touch Directly</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our academic team for immediate batch enrolment queries, syllabus consultation, or technical support.
              </p>

              <div className="space-y-4 text-xs">
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-bold text-white">WhatsApp Academic Helpdesk</p>
                    <p className="text-[11px] text-emerald-400">+91 73708 10156 • Instant Chat & Support</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white">Email Admissions</p>
                    <p className="text-[11px] text-slate-400">support@medhamaths.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="font-bold text-white">Academic Center</p>
                    <p className="text-[11px] text-slate-400">Medha Maths Digital Learning Campus, New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-950/40 border border-blue-800/40 rounded-2xl text-[11px] text-blue-200">
              Support Hours: Monday to Saturday (9:00 AM – 9:00 PM IST)
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
            {isSent ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Thank You!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your enquiry has been received. Our counselor will WhatsApp you within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-extrabold text-white">Request a Callback</h2>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Student / Parent Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Mobile (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">School Class</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10 (Board)</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12 (Board)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Message or Query</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what course or subject you are looking for..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: Academic Year 2025–2026</p>
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At Medha Maths, we are committed to protecting the privacy of school students and parents. This policy details how we handle student information when accessing our online educational courses, PDF study notes, and quizzes.
          </p>
          <h3 className="font-bold text-white text-base pt-2">1. Information We Collect</h3>
          <p>
            We collect student names, email addresses, phone numbers, and enrolled classes to provide personalized course content, progress tracking, and doubt assistance on WhatsApp.
          </p>
          <h3 className="font-bold text-white text-base pt-2">2. Payment Security</h3>
          <p>
            All financial transactions are processed securely via certified payment partners (Razorpay). Medha Maths does not store your credit card, debit card, or UPI PIN credentials.
          </p>
          <h3 className="font-bold text-white text-base pt-2">3. Child & Student Safety</h3>
          <p>
            We strictly protect the safety of school students and do not sell, rent, or share personal contact records with third-party advertisers.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: Academic Session 2025–2026</p>
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Welcome to Medha Maths. By accessing our website, video lessons, and study materials, you agree to comply with our platform terms.
          </p>
          <h3 className="font-bold text-white text-base pt-2">1. Educational Course License</h3>
          <p>
            Enrolled students are granted a non-exclusive, non-transferable personal license to view video lectures and download formula notes for individual academic preparation. Content redistribution or unauthorized recording is strictly prohibited.
          </p>
          <h3 className="font-bold text-white text-base pt-2">2. Course Validity</h3>
          <p>
            Full-year school courses remain active on your student dashboard until the completion of your respective academic board examinations.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">7-Day Refund Policy</h1>
        <p className="text-xs text-slate-400">Student Satisfaction Guarantee</p>
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            We stand behind the pedagogical quality of our courses. If you are not satisfied with your course experience, you can request a 100% refund within 7 days of purchase.
          </p>
          <h3 className="font-bold text-white text-base pt-2">How to Claim a Refund:</h3>
          <p>
            Simply reach out to our WhatsApp support team or email <strong>support@medhamaths.com</strong> with your registered email and Order ID. Refund approvals are processed within 24 hours back to the original payment source.
          </p>
        </div>
      </div>
    </div>
  );
};
