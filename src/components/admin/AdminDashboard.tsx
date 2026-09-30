import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Users,
  CreditCard,
  CheckCircle,
  Eye,
  Settings,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Upload,
  GraduationCap,
  Play,
  FileText,
  Lock,
  ChevronDown,
  ChevronRight,
  Database,
  ExternalLink
} from 'lucide-react';
import { Course, ClassLevel, SubjectId, CourseType, SchoolClass, SchoolSubject } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    courses,
    orders,
    classes,
    subjects,
    addNewCourse,
    updateCourse,
    deleteCourse,
    toggleCoursePublish,
    addClass,
    updateClass,
    addSubject,
    updateSubject,
    addChapterModule,
    updateChapterModule,
    deleteChapterModule,
    addLessonToModule,
    updateLessonInModule,
    deleteLessonFromModule,
    user,
    navigateTo,
    isSupabaseLive
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'curriculum' | 'classes' | 'subjects' | 'students' | 'orders'>('courses');

  // Course Modal State
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState<ClassLevel>(10);
  const [newSubject, setNewSubject] = useState<SubjectId>('mathematics');
  const [newCourseType, setNewCourseType] = useState<CourseType>('complete_course');
  const [newOriginalPrice, setNewOriginalPrice] = useState('2499');
  const [newDiscountedPrice, setNewDiscountedPrice] = useState('999');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('Er. Anand Sharma');
  const [newTeacherQual, setNewTeacherQual] = useState('Senior Faculty & IIT Alum • 12+ Yrs Exp');

  // Selected Course for Curriculum management
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState<string>(courses[0]?.id || '');
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');

  // Lesson Modal State
  const [selectedModuleIdForLesson, setSelectedModuleIdForLesson] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [newLessonPdfUrl, setNewLessonPdfUrl] = useState('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf');
  const [newLessonDuration, setNewLessonDuration] = useState('45');
  const [newLessonIsFree, setNewLessonIsFree] = useState(false);

  // New Class Form State
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSlug, setNewClassSlug] = useState('');
  const [newClassDesc, setNewClassDesc] = useState('');

  // New Subject Form State
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectSlug, setNewSubjectSlug] = useState('');
  const [newSubjectIcon, setNewSubjectIcon] = useState('BookOpen');

  // Guard against non-admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center mb-4 text-rose-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black">Restricted Administrator Area</h2>
        <p className="text-slate-400 text-xs mt-1 max-w-sm">
          You must be signed in with an administrator account to access this page.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const currentCurriculumCourse = courses.find((c) => c.id === selectedCourseForCurriculum) || courses[0];
  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const subjectObj = subjects.find((s) => s.id === newSubject) || { name: 'Mathematics' };
    const courseSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingCourseId) {
      const existing = courses.find((c) => c.id === editingCourseId);
      if (existing) {
        await updateCourse({
          ...existing,
          title: newTitle,
          classLevel: newClass,
          subjectId: newSubject,
          subjectName: subjectObj.name,
          courseType: newCourseType,
          originalPrice: Number(newOriginalPrice) || 2499,
          discountedPrice: Number(newDiscountedPrice) || 999,
          shortDescription: newShortDesc || existing.shortDescription,
          teacher: {
            ...existing.teacher,
            name: newTeacherName,
            qualification: newTeacherQual
          }
        });
      }
    } else {
      const newCourseObj: Course = {
        id: `course-${Date.now()}`,
        slug: courseSlug,
        title: newTitle,
        shortDescription: newShortDesc || 'Comprehensive online batch covering complete NCERT syllabus.',
        fullDescription: 'Comprehensive online school course prepared by senior faculty with video lessons and quizzes.',
        classLevel: newClass,
        subjectId: newSubject,
        subjectName: subjectObj.name,
        courseType: newCourseType,
        board: 'CBSE & State Board',
        language: 'Hinglish',
        originalPrice: Number(newOriginalPrice) || 2499,
        discountedPrice: Number(newDiscountedPrice) || 999,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        teacher: {
          id: `teacher-${Date.now()}`,
          name: newTeacherName,
          qualification: newTeacherQual,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          bio: 'Senior subject expert passionate about conceptual pedagogy.',
          experienceYears: 10,
          rating: 4.9,
          subjectSpeciality: 'Senior Faculty'
        },
        chaptersCount: 0,
        lessonsCount: 0,
        durationHours: 48,
        rating: 4.9,
        reviewCount: 12,
        studentCount: 1,
        isFeatured: true,
        isPublished: true,
        badge: 'New Batch 🚀',
        outcomes: [
          'Master 100% textbook theory & derivations',
          'Learn step-marking techniques for board exams'
        ],
        requirements: ['Notebook and pen'],
        modules: [],
        createdAt: new Date().toISOString()
      };
      await addNewCourse(newCourseObj);
    }

    setIsAddCourseModalOpen(false);
    setEditingCourseId(null);
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim() || !currentCurriculumCourse) return;
    addChapterModule(currentCurriculumCourse.id, {
      chapterNumber: currentCurriculumCourse.modules.length + 1,
      title: newModuleTitle.trim(),
      description: newModuleDesc.trim() || 'Core chapter concepts and board numericals.',
      lessons: []
    });
    setIsAddModuleModalOpen(false);
    setNewModuleTitle('');
    setNewModuleDesc('');
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !currentCurriculumCourse || !selectedModuleIdForLesson) return;
    addLessonToModule(currentCurriculumCourse.id, selectedModuleIdForLesson, {
      title: newLessonTitle.trim(),
      summary: 'High-definition video lecture with concept breakdown.',
      durationMinutes: Number(newLessonDuration) || 45,
      isFreePreview: newLessonIsFree,
      videoUrl: newLessonVideoUrl.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      notesPdfUrl: newLessonPdfUrl.trim() || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
    });
    setSelectedModuleIdForLesson(null);
    setNewLessonTitle('');
    setNewLessonDuration('45');
    setNewLessonIsFree(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                ADMIN CONTROL ROOM
              </span>
              {isSupabaseLive ? (
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Supabase Live Sync
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Local Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Medha Maths Academy Management
            </h1>
            <p className="text-xs text-slate-400">
              Manage courses, curriculum chapters, lessons, classes, subjects, and student enrollments.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCourseId(null);
              setNewTitle('');
              setIsAddCourseModalOpen(true);
            }}
            className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Admin KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-400">Total Courses</p>
            <p className="text-2xl font-black text-cyan-400 mt-1">{courses.length}</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-400">Published Classes</p>
            <p className="text-2xl font-black text-indigo-400 mt-1">{classes.filter(c => c.isActive).length}</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-400">Active Subjects</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{subjects.filter(s => s.isActive).length}</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-400">Total Revenue</p>
            <p className="text-2xl font-black text-amber-400 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Admin Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'courses' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Courses Catalog ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'curriculum' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Curriculum (Chapters & Lessons)
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'classes' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Classes ({classes.length})
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'subjects' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subjects ({subjects.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'students' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Students & Enrolled Users
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Orders & Payments ({orders.length})
          </button>
        </div>

        {/* Tab 1: Courses Management */}
        {activeTab === 'courses' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Course</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Teacher</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white max-w-xs">{course.title}</div>
                        <div className="text-[11px] text-slate-400">{course.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-950 text-cyan-300 font-bold px-2 py-0.5 rounded border border-blue-800">
                          Class {course.classLevel}
                        </span>
                        <div className="text-slate-400 mt-1">{course.subjectName}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-white font-extrabold">₹{course.discountedPrice}</span>
                        <span className="text-slate-500 line-through text-[11px] ml-1.5">₹{course.originalPrice}</span>
                      </td>
                      <td className="p-4">
                        <div>{course.teacher.name}</div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleCoursePublish(course.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            course.isPublished
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {course.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCourseForCurriculum(course.id);
                            setActiveTab('curriculum');
                          }}
                          className="p-1.5 bg-blue-950 hover:bg-blue-900 text-cyan-300 rounded-lg"
                          title="Manage Curriculum"
                        >
                          <Layers className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCourseId(course.id);
                            setNewTitle(course.title);
                            setNewClass(course.classLevel);
                            setNewSubject(course.subjectId);
                            setNewCourseType(course.courseType);
                            setNewOriginalPrice(String(course.originalPrice));
                            setNewDiscountedPrice(String(course.discountedPrice));
                            setNewShortDesc(course.shortDescription);
                            setNewTeacherName(course.teacher.name);
                            setNewTeacherQual(course.teacher.qualification);
                            setIsAddCourseModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                          title="Edit Course"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="p-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded-lg"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Curriculum Management */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-400">Select Course:</label>
                <select
                  value={selectedCourseForCurriculum}
                  onChange={(e) => setSelectedCourseForCurriculum(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      Class {c.classLevel} - {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddModuleModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Chapter Module</span>
              </button>
            </div>

            {currentCurriculumCourse ? (
              <div className="space-y-4">
                {currentCurriculumCourse.modules.map((mod) => (
                  <div key={mod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-blue-950 text-cyan-300 font-bold text-xs flex items-center justify-center">
                          {mod.chapterNumber}
                        </span>
                        <div>
                          <h3 className="font-bold text-white text-sm">{mod.title}</h3>
                          <p className="text-xs text-slate-400">{mod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedModuleIdForLesson(mod.id);
                          }}
                          className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-400/30 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Lesson</span>
                        </button>
                        <button
                          onClick={() => deleteChapterModule(currentCurriculumCourse.id, mod.id)}
                          className="p-1.5 text-rose-400 hover:bg-rose-950 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons list inside module */}
                    <div className="pl-10 space-y-2">
                      {mod.lessons.map((les) => (
                        <div key={les.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {les.isFreePreview ? (
                              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                                FREE PREVIEW
                              </span>
                            ) : (
                              <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                PAID
                              </span>
                            )}
                            <span className="font-medium text-white">{les.title}</span>
                            <span className="text-slate-500">({les.durationMinutes} mins)</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateLessonInModule(currentCurriculumCourse.id, mod.id, les.id, {
                                  isFreePreview: !les.isFreePreview
                                })
                              }
                              className="text-[11px] text-cyan-400 hover:underline"
                            >
                              Toggle Free/Paid
                            </button>
                            <button
                              onClick={() => deleteLessonFromModule(currentCurriculumCourse.id, mod.id, les.id)}
                              className="text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {/* Tab 3: Classes Management */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddClassModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add School Class</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{cls.name}</h3>
                    <button
                      onClick={() => updateClass(cls.id, { isActive: !cls.isActive })}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        cls.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cls.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">{cls.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Subjects Management */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddSubjectModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((sub) => (
                <div key={sub.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{sub.name}</h3>
                    <button
                      onClick={() => updateSubject(sub.id, { isActive: !sub.isActive })}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        sub.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sub.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">{sub.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Students View */}
        {activeTab === 'students' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Registered Students Database</h3>
              <span className="text-xs text-slate-400">Total Enrolled Accounts: 1</span>
            </div>

            <div className="divide-y divide-slate-800">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 text-cyan-400 flex items-center justify-center font-bold">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Arjun Kumar</h4>
                    <p className="text-slate-400 text-xs">arjun.student@gmail.com • +91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="bg-blue-950 text-cyan-300 font-bold px-2.5 py-1 rounded-lg border border-blue-700">
                    Class 10
                  </span>
                  <span className="text-slate-400 text-[11px]">Joined: March 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Orders View */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-mono text-cyan-400 font-bold">{o.id}</td>
                    <td className="p-4">
                      <div className="text-white font-semibold">{o.studentName}</div>
                      <div className="text-[11px] text-slate-400">{o.studentEmail}</div>
                    </td>
                    <td className="p-4">{o.courseTitle}</td>
                    <td className="p-4 font-extrabold text-white">₹{o.amount}</td>
                    <td className="p-4">
                      <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        {o.orderStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Course Modal */}
        {isAddCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-blue-900/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">
                {editingCourseId ? 'Edit Course' : 'Create New Course Batch'}
              </h3>
              <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Class 10 Science: Board Exam Master Batch"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Class Level</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(Number(e.target.value) as ClassLevel)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value={6}>Class 6</option>
                      <option value={7}>Class 7</option>
                      <option value={8}>Class 8</option>
                      <option value={9}>Class 9</option>
                      <option value={10}>Class 10</option>
                      <option value={11}>Class 11</option>
                      <option value={12}>Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value as SubjectId)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newDiscountedPrice}
                      onChange={(e) => setNewDiscountedPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Faculty Name</label>
                  <input
                    type="text"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddCourseModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                  >
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Module Modal */}
        {isAddModuleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-blue-900/60 rounded-3xl w-full max-w-md p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Add Chapter Module</h3>
              <form onSubmit={handleAddModule} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chapter Title</label>
                  <input
                    type="text"
                    required
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    placeholder="e.g. Chapter 4 — Quadratic Equations"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    value={newModuleDesc}
                    onChange={(e) => setNewModuleDesc(e.target.value)}
                    placeholder="e.g. Standard form, discriminant and quadratic formula"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModuleModalOpen(false)}
                    className="px-4 py-2 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                  >
                    Add Chapter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Lesson Modal */}
        {selectedModuleIdForLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-blue-900/60 rounded-3xl w-full max-w-md p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Add Video Lesson</h3>
              <form onSubmit={handleAddLesson} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lesson Title</label>
                  <input
                    type="text"
                    required
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g. 4.1 Derivation of Quadratic Formula"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Video Embed URL</label>
                  <input
                    type="url"
                    value={newLessonVideoUrl}
                    onChange={(e) => setNewLessonVideoUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">PDF Notes URL</label>
                  <input
                    type="url"
                    value={newLessonPdfUrl}
                    onChange={(e) => setNewLessonPdfUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isFreeCheckbox"
                    checked={newLessonIsFree}
                    onChange={(e) => setNewLessonIsFree(e.target.checked)}
                    className="rounded text-cyan-500"
                  />
                  <label htmlFor="isFreeCheckbox" className="text-slate-300 font-semibold">
                    Set as Free Preview Lesson (Unauthenticated visitors can view)
                  </label>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedModuleIdForLesson(null)}
                    className="px-4 py-2 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                  >
                    Save Lesson
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
