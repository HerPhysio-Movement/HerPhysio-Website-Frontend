import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Clock, Play, Search, Sparkles, Tag, X } from 'lucide-react';
import { courseAPI } from '../../../services/courseAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import { getYouTubeEmbedUrl } from '../../../utils/videoHelpers';
import { coursesData } from '../data/resourcesData';
import { BackgroundParticles } from './SectionComponents';

const getCourseId = (course) =>
  course?.id || course?._id || course?.course_id || course?.courseId;

const getCourseTitle = (course) =>
  course?.course_title || course?.title || 'Untitled course';

const getCourseVideoUrl = (course) =>
  course?.youtube_url ||
  course?.youtubeUrl ||
  course?.video_url ||
  course?.videoUrl ||
  course?.link ||
  '';

const getCourseImage = (course) =>
  course?.image_url || course?.thumbnail_url || course?.image || course?.thumbnail;

const getCourseDescription = (course) =>
  course?.description || course?.fullDescription || course?.caption || '';

const normalizeStaticCourse = (course) => ({
  ...course,
  course_title: course.title,
  description: course.fullDescription || course.description,
  caption: course.description,
  category: course.level,
});

const CoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const loadCourses = useCallback(async () => {
    try {
      const response = await courseAPI.getAllCourses();
      const apiCourses = extractArrayFromResponse(response, ['courses', 'data', 'items']);
      setCourses(apiCourses.length > 0 ? apiCourses : coursesData.map(normalizeStaticCourse));
    } catch (error) {
      console.error('Failed to load courses:', error);
      setCourses(coursesData.map(normalizeStaticCourse));
    }
  }, []);

  useEffect(() => {
    const fetchInitialCourses = async () => {
      try {
        await loadCourses();
      } finally {
        setLoading(false);
      }
    };

    fetchInitialCourses();
  }, [loadCourses]);

  const handleCategorySearch = async (event) => {
    event.preventDefault();

    const category = categorySearch.trim();
    if (!category) {
      setActiveCategory('');
      setSearching(true);
      try {
        await loadCourses();
      } finally {
        setSearching(false);
      }
      return;
    }

    setSearching(true);
    try {
      const response = await courseAPI.getCoursesByCategory(category);
      setCourses(extractArrayFromResponse(response, ['courses', 'data', 'items']));
      setActiveCategory(category);
    } catch (error) {
      console.error('Failed to search courses by category:', error);
      setCourses([]);
      setActiveCategory(category);
    } finally {
      setSearching(false);
    }
  };

  const clearCategorySearch = async () => {
    setCategorySearch('');
    setActiveCategory('');
    setSearching(true);
    try {
      await loadCourses();
    } finally {
      setSearching(false);
    }
  };

  const selectedVideoUrl = getCourseVideoUrl(selectedCourse);
  const selectedEmbedUrl = getYouTubeEmbedUrl(selectedVideoUrl);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF9] flex items-center justify-center">
        <div className="animate-pulse text-[#FD90A7] text-lg">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#FFFAF9] pt-20 pb-16 overflow-hidden">
      <BackgroundParticles variant="courses" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#FD90A7] mb-5">
          <Sparkles className="w-4 h-4" />
          Course Library
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          Online Courses
        </h1>
        <div className="w-20 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
        <p className="text-[#A19390] max-w-xl mx-auto text-lg">
          Learn practical movement, posture, pelvic health, and recovery skills
          through focused courses created for women&apos;s wellbeing.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleCategorySearch}
          className="mb-8 bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-3"
        >
          <label className="relative flex-1">
            <span className="sr-only">Search courses by category</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A19390]" />
            <input
              type="search"
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Search by category"
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#F3E4E2] bg-white text-[#1A1A1A] placeholder:text-[#A19390] focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/40"
            />
          </label>
          <div className="flex gap-3">
            {activeCategory && (
              <button
                type="button"
                onClick={clearCategorySearch}
                className="h-12 px-4 rounded-xl border border-[#F3E4E2] text-[#A19390] hover:text-[#C7365B] hover:bg-[#FEE7E4] transition"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={searching}
              className="h-12 px-6 rounded-xl bg-[#FD90A7] text-white font-semibold hover:bg-[#F77997] transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {activeCategory && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEE7E4] text-[#C7365B] text-sm font-semibold">
            <Tag className="w-4 h-4" />
            Showing {activeCategory} courses
          </div>
        )}

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-[#F3E4E2]">
            <BookOpen className="w-16 h-16 text-[#F3E4E2] mx-auto mb-4" />
            <p className="text-[#A19390] text-lg">
              {activeCategory
                ? `No courses found for "${activeCategory}".`
                : 'No courses available yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const title = getCourseTitle(course);
              const imageUrl = getCourseImage(course);

              return (
                <article
                  key={getCourseId(course) || index}
                  className="group bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="relative aspect-video bg-linear-to-br from-[#FD90A7]/15 to-[#6020F0]/10 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <BookOpen className="w-12 h-12 text-[#FD90A7]" />
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#FD90A7] text-xs font-semibold shadow-sm">
                      {getCourseVideoUrl(course) ? (
                        <Play className="w-3.5 h-3.5" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5" />
                      )}
                      Open course
                    </div>
                    {course.category && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEE7E4]/95 text-[#C7365B] text-[11px] font-semibold uppercase tracking-[0.12em] shadow-sm">
                        <Tag className="w-3 h-3" />
                        {course.category}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#A19390] mb-3">
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#FD90A7] transition-colors">
                      {title}
                    </h2>
                    <p className="text-[#A19390] text-sm leading-relaxed line-clamp-3 flex-1">
                      {getCourseDescription(course)}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-[#FD90A7]">
                      View course
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#F3E4E2]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 sm:p-6 flex justify-between items-center border-b border-[#F3E4E2]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] pr-8">
                {getCourseTitle(selectedCourse)}
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 rounded-lg hover:bg-[#F3E4E2] transition text-[#A19390]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {selectedEmbedUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 mb-5">
                  <iframe
                    src={selectedEmbedUrl}
                    title={getCourseTitle(selectedCourse)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden bg-[#F3E4E2] flex items-center justify-center mb-5">
                  {getCourseImage(selectedCourse) ? (
                    <img
                      src={getCourseImage(selectedCourse)}
                      alt={getCourseTitle(selectedCourse)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-12 h-12 text-[#FD90A7]" />
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#A19390] mb-4">
                {selectedCourse.category && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {selectedCourse.category}
                  </span>
                )}
                {selectedCourse.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedCourse.duration}
                  </span>
                )}
              </div>

              <p className="text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                {getCourseDescription(selectedCourse)}
              </p>

              {selectedVideoUrl && (
                <div className="mt-6 pt-4 border-t border-[#F3E4E2]">
                  <a
                    href={selectedVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FD90A7] hover:text-[#C7365B] font-semibold transition"
                  >
                    Watch on source <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CoursesComponent;
