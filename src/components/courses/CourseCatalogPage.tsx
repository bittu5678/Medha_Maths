import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from './CourseCard';
import { SUBJECTS_LIST, CLASSES_DATA } from '../../data/mockData';
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  Filter,
  X,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { ClassLevel, SubjectId, CourseType } from '../../types';

export const CourseCatalogPage: React.FC = () => {
  const {
    courses,
    selectedClassFilter,
    setSelectedClassFilter,
    selectedSubjectFilter,
    setSelectedSubjectFilter,
    selectedCourseTypeFilter,
    setSelectedCourseTypeFilter,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption
  } = useApp();

  const courseTypes: { id: CourseType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Types' },
    { id: 'complete', label: 'Full Course' },
    { id: 'chapter-wise', label: 'Chapter-wise' },
    { id: 'crash', label: 'Crash Course' },
    { id: 'revision', label: 'Revision Course' },
    { id: 'exam-prep', label: 'Exam Preparation' },
    { id: 'study-package', label: 'Study Package' }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Must be published (unless admin view)
      if (!course.isPublished) return false;

      // Class Filter
      if (selectedClassFilter !== 'all' && course.classLevel !== selectedClassFilter) {
        return false;
      }

      // Subject Filter
      if (selectedSubjectFilter !== 'all' && course.subjectId !== selectedSubjectFilter) {
        return false;
      }

      // Course Type Filter
      if (selectedCourseTypeFilter !== 'all' && course.courseType !== selectedCourseTypeFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesSubject = course.subjectName.toLowerCase().includes(q);
        const matchesTeacher = course.teacher.name.toLowerCase().includes(q);
        const matchesDesc = course.shortDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubject && !matchesTeacher && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') {
        return a.discountedPrice - b.discountedPrice;
      }
      if (sortOption === 'price-high') {
        return b.discountedPrice - a.discountedPrice;
      }
      if (sortOption === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      // default 'popular'
      return b.studentCount - a.studentCount;
    });
  }, [
    courses,
    selectedClassFilter,
    selectedSubjectFilter,
    selectedCourseTypeFilter,
    searchQuery,
    sortOption
  ]);

  const hasActiveFilters =
    selectedClassFilter !== 'all' ||
    selectedSubjectFilter !== 'all' ||
    selectedCourseTypeFilter !== 'all' ||
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedClassFilter('all');
    setSelectedSubjectFilter('all');
    setSelectedCourseTypeFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800/60 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Class 6 to Class 12 Course Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            School Board Courses & Batches
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Concept-based live & recorded video lectures, 10-year solved previous year questions, formula notes, and chapter test series.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search courses by topic (e.g. Trigonometry, Real Numbers, Physics, SST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                Sort By:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Batches</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter Pills - Classes */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Class:</span>
              <button
                onClick={() => setSelectedClassFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedClassFilter === 'all'
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                All Classes
              </button>
              {CLASSES_DATA.map((c) => (
                <button
                  key={c.level}
                  onClick={() => setSelectedClassFilter(c.level)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedClassFilter === c.level
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Class {c.level}
                </button>
              ))}
            </div>

            {/* Filter Pills - Subjects */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Subject:</span>
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                All Subjects
              </button>
              {SUBJECTS_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectFilter(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSubjectFilter === s.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Filter Pills - Course Type */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Type:</span>
              {courseTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedCourseTypeFilter(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCourseTypeFilter === t.id
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-400/50'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="ml-auto text-xs font-bold text-rose-400 hover:text-rose-300 underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <p>
            Showing <strong className="text-white">{filteredCourses.length}</strong> available courses for school students
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Courses Found</h3>
            <p className="text-xs text-slate-400">
              No matching courses found for your current filter combination. Try clearing filters or searching for another topic.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
