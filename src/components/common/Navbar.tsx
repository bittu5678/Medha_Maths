import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  Phone,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { CLASSES_DATA } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNavClick = (view: any, params?: any) => {
    navigateTo(view, params);
    setIsMobileMenuOpen(false);
    setIsClassDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-blue-900/30 text-white transition-all">
      {/* Top micro-bar for trust & announcements */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-xs py-1.5 px-4 text-center border-b border-blue-800/40 text-blue-100 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30">
          <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" /> NEW 2025-26 BATCH
        </span>
        <span>Admissions Open for Classes 6–12 CBSE & State Boards. Flat 50% Off on Full Year Courses!</span>
        <button
          onClick={() => handleNavClick('courses')}
          className="underline font-semibold hover:text-white ml-1 text-cyan-300 cursor-pointer"
        >
          View Batches &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                <span>MEDHA</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">MATHS</span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-blue-300/80 uppercase">
                Learn Better. Score Better.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'courses'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Courses
            </button>

            {/* Classes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                onBlur={() => setTimeout(() => setIsClassDropdownOpen(false), 200)}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'classes'
                    ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                    : 'hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>Classes</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isClassDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-blue-900/50 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-bold text-blue-400 px-3 py-1 uppercase tracking-wider">
                    Select Your School Class
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {CLASSES_DATA.map((cls) => (
                      <button
                        key={cls.level}
                        onClick={() => handleNavClick('courses', { classLevel: cls.level })}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-950/80 text-xs flex items-center justify-between text-slate-200 hover:text-cyan-300 transition-colors"
                      >
                        <div className="font-semibold">{cls.name}</div>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {cls.highlight}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleNavClick('classes')}
                      className="w-full text-center text-xs font-semibold text-cyan-400 hover:underline py-1"
                    >
                      View All Classes &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('subjects')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'subjects'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Subjects
            </button>

            <button
              onClick={() => handleNavClick('study-material')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'study-material'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Study Material</span>
            </button>

            <button
              onClick={() => handleNavClick('quizzes')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'quizzes'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Tests & Quizzes
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'faq'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'contact'
                  ? 'text-cyan-400 bg-blue-950/80 font-semibold'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Side CTA / Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsUserDropdownOpen(false), 250)}
                  className="flex items-center gap-2.5 bg-slate-900/90 border border-blue-800/50 hover:border-cyan-400/60 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-lg object-cover border border-cyan-400/50"
                  />
                  <div className="text-left text-xs">
                    <p className="font-semibold text-white truncate max-w-[110px]">{user.fullName}</p>
                    <span className="text-[10px] text-cyan-300 font-medium capitalize">
                      {user.role === 'admin' ? '⚡ Admin' : `Class ${user.classLevel}`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-blue-900/60 rounded-xl shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-800 text-xs">
                      <p className="font-bold text-white">{user.fullName}</p>
                      <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-blue-950/70 rounded-lg text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                        <span>Student Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-950/30 rounded-lg text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin Console</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 rounded-lg text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-900/80 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-5 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            {user && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="p-2 bg-blue-900/40 text-cyan-300 rounded-lg text-xs font-bold"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-blue-900/40 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'home' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNavClick('courses')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'courses' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              📚 Courses
            </button>
            <button
              onClick={() => handleNavClick('classes')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'classes' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              🎓 Classes (6–12)
            </button>
            <button
              onClick={() => handleNavClick('subjects')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'subjects' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              🔬 Subjects
            </button>
            <button
              onClick={() => handleNavClick('study-material')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'study-material' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              📄 Study Material
            </button>
            <button
              onClick={() => handleNavClick('quizzes')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'quizzes' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-900 text-slate-300'}`}
            >
              ⏱️ Tests & Quizzes
            </button>
          </div>

          <div className="flex flex-col gap-1 text-sm text-slate-300">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded hover:bg-slate-900"
            >
              About Medha Maths
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 px-3 rounded hover:bg-slate-900"
            >
              Frequently Asked Questions (FAQ)
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded hover:bg-slate-900"
            >
              Contact Support & WhatsApp
            </button>
          </div>

          {user ? (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-xl">
                <img src={user.avatar} alt={user.fullName} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-bold text-white">{user.fullName}</p>
                  <p className="text-xs text-cyan-300">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl"
                >
                  Student Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2.5 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-800/50 rounded-xl"
                >
                  Admin Console
                </button>
              </div>
              <button
                onClick={logout}
                className="w-full py-2 text-xs font-semibold text-rose-400 bg-rose-950/30 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-slate-900 border border-blue-900/60 rounded-xl"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="flex-1 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
