import React from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import {
  Star,
  Clock,
  BookOpen,
  Layers,
  Users,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { navigateTo, openCheckout, user } = useApp();

  const isEnrolled = user?.enrolledCourseIds.includes(course.id);
  const discountPercent = Math.round(
    ((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100
  );

  const handleViewCourse = () => {
    navigateTo('course-details', { slug: course.slug });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEnrolled) {
      navigateTo('dashboard');
    } else {
      openCheckout({ type: 'course', course });
    }
  };

  return (
    <div
      onClick={handleViewCourse}
      className="group bg-slate-950 border border-blue-900/40 hover:border-cyan-400/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 cursor-pointer text-slate-100 relative"
      id={`course-card-${course.id}`}
    >
      {/* Top Image & Overlay Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-blue-950/90 text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-blue-700/60 backdrop-blur-md">
            Class {course.classLevel}
          </span>
          <span className="bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-700/60 backdrop-blur-md">
            {course.subjectName}
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md">
            {discountPercent}% OFF
          </div>
        )}

        {course.badge && (
          <div className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30 backdrop-blur-md">
            {course.badge}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Teacher Info */}
          <div className="flex items-center gap-2 mb-2.5">
            <img
              src={course.teacher.avatar}
              alt={course.teacher.name}
              className="w-6 h-6 rounded-full object-cover border border-cyan-400/40"
            />
            <span className="text-xs text-slate-300 font-medium truncate">
              {course.teacher.name}
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Syllabus Stats Chips */}
          <div className="grid grid-cols-3 gap-2 mt-4 py-2.5 px-3 bg-slate-900/70 border border-slate-800/80 rounded-xl text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{course.chaptersCount} Chapters</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{course.lessonsCount} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{course.durationHours}h Study</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                ₹{course.discountedPrice}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{course.originalPrice}
              </span>
            </div>

            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
              Full Session Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleViewCourse}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-blue-900/60 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
            >
              View Course
            </button>

            <button
              onClick={handleBuyNow}
              className={`w-full py-2.5 font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center shadow-md ${
                isEnrolled
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isEnrolled ? 'Enrolled ✓' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
