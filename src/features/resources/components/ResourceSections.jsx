import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Tag, X } from 'lucide-react';
import { FloatingCard, CardContent, ResourceModal } from './FloatingCard';
import { SectionHeader, BackgroundParticles, DividerWithText } from './SectionComponents';
import { notesData, socialLinksData } from '../data/resourcesData';
import { courseAPI } from '../../../services/courseAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import { getYouTubeEmbedUrl } from '../../../utils/videoHelpers';

const cardStyles = [
  { rotation: '-rotate-2', zIndex: 'z-10' },
  { rotation: 'rotate-1', zIndex: 'z-20' },
  { rotation: 'rotate-2', zIndex: 'z-15' },
];

const getCourseId = (course) =>
  course?.id || course?._id || course?.course_id || course?.courseId;

const getCourseTitle = (course) =>
  course?.course_title || course?.title || 'Untitled course';

const getCourseDescription = (course) =>
  course?.description || course?.fullDescription || course?.caption || '';

const getCourseVideoUrl = (course) =>
  course?.link ||
  course?.youtube_url ||
  course?.youtubeUrl ||
  course?.video_url ||
  course?.videoUrl ||
  '';

const getCourseImage = (course) =>
  course?.image_url ||
  course?.imageUrl ||
  course?.thumbnail_url ||
  course?.thumbnailUrl ||
  course?.image ||
  course?.thumbnail ||
  '';

const getCourseTimestamp = (course) => {
  const dateValue =
    course?.created_at ||
    course?.createdAt ||
    course?.date_created ||
    course?.updated_at ||
    course?.updatedAt ||
    course?.published_at ||
    course?.publishedAt;

  const timestamp = Date.parse(dateValue);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const normalizeCourse = (course, index) => {
  const style = cardStyles[index % cardStyles.length];

  return {
    ...course,
    id: getCourseId(course) || `course-${index}`,
    title: getCourseTitle(course),
    description: getCourseDescription(course),
    fullDescription: getCourseDescription(course),
    duration: course?.duration || course?.course_duration || '',
    level: course?.level || course?.difficulty || course?.category || '',
    link: getCourseVideoUrl(course),
    tags: Array.isArray(course?.tags)
      ? course.tags
      : String(course?.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
    rotation: style.rotation,
    zIndex: style.zIndex,
  };
};

/**
 * Section: Care That Moves With You (Notes/Approaches)
 */
export const NotesSection = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <section className="relative px-4 py-16 overflow-hidden md:py-24 sm:px-8 md:px-16 bg-gradient-to-b from-white to-gray-50">
      <BackgroundParticles variant="default" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader title="Why Our Resources?" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {notesData.map((note) => {
            const Icon = note.icon;
            return (
              <FloatingCard
                key={note.id}
                item={note}
                isSelected={selectedNote?.id === note.id}
                onSelect={() => setSelectedNote(note)}
                rotation={note.rotation}
                zIndex={note.zIndex}
              >
                <CardContent
                  icon={Icon}
                  title={note.title}
                  description={note.description}
                  bgColor={note.bgColor}
                  color={note.color}
                />
              </FloatingCard>
            );
          })}
        </div>

        <div className="mt-8 text-xs text-center text-gray-400 md:mt-10">
          Click any card to learn more
        </div>
      </div>

      {/* Note Modal */}
      <ResourceModal
        item={selectedNote}
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        maxWidth="max-w-md"
      >
        {selectedNote && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{ backgroundColor: `${selectedNote.iconBg}20` }}
              >
                <selectedNote.icon
                  className="w-6 h-6"
                  style={{ color: selectedNote.color }}
                />
              </div>
              <h3 className="text-xl font-bold text-[#1D2130]">{selectedNote.title}</h3>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              {selectedNote.fullDescription}
            </p>
            <Link
              to={selectedNote.ctaLink}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FD90A7] hover:underline"
              onClick={() => setSelectedNote(null)}
            >
              {selectedNote.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}
      </ResourceModal>
    </section>
  );
};

/**
 * Section: Online Courses
 */
export const CoursesSection = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [recentCourses, setRecentCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const selectedVideoUrl = getCourseVideoUrl(selectedCourse);
  const selectedEmbedUrl = getYouTubeEmbedUrl(selectedVideoUrl);

  useEffect(() => {
    let isMounted = true;

    const loadRecentCourses = async () => {
      try {
        const response = await courseAPI.getAllCourses();
        const apiCourses = extractArrayFromResponse(response, ['courses', 'data', 'items']);
        const sortedCourses = apiCourses
          .map((course, index) => ({ course, index }))
          .sort((a, b) => {
            const timestampDifference =
              getCourseTimestamp(b.course) - getCourseTimestamp(a.course);

            return timestampDifference || a.index - b.index;
          })
          .slice(0, 3)
          .map(({ course }, index) => normalizeCourse(course, index));

        if (isMounted) {
          setRecentCourses(sortedCourses);
        }
      } catch (error) {
        console.error('Failed to load recent courses:', error);
        if (isMounted) {
          setRecentCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoadingCourses(false);
        }
      }
    };

    loadRecentCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="courses" className="relative px-4 py-16 overflow-hidden md:py-24 sm:px-8 md:px-16 bg-gradient-to-b from-white to-gray-50">
      <BackgroundParticles variant="courses" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader title="Online Courses" />

        {loadingCourses ? (
          <div className="py-12 text-center text-[#FD90A7]">
            Loading courses...
          </div>
        ) : recentCourses.length === 0 ? (
          <div className="py-14 px-6 text-center bg-white/70 backdrop-blur-sm border border-[#F3E4E2] rounded-2xl shadow-sm">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-[#F3E4E2]" />
            <p className="text-[#A19390] text-lg">
              No courses available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {recentCourses.map((course) => (
              <FloatingCard
                key={course.id}
                item={course}
                isSelected={selectedCourse?.id === course.id}
                onSelect={() => setSelectedCourse(course)}
                rotation={course.rotation}
                zIndex={course.zIndex}
              >
                <CardContent
                  icon={BookOpen}
                  title={course.title}
                  description={course.description}
                  bgColor="#FD90A7/10"
                  color="#FD90A7"
                  metadata={
                    <>
                      {course.duration && <span>{course.duration}</span>}
                      {course.duration && course.level && <span>&bull;</span>}
                      {course.level && <span>{course.level}</span>}
                    </>
                  }
                />
              </FloatingCard>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FD90A7] text-white font-semibold shadow-md hover:bg-[#F77997] transition"
          >
            View courses page <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
                aria-label="Close course details"
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

              {selectedCourse.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedCourse.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-[#FEE7E4] text-[#C7365B] text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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
    </section>
  );
};

/**
 * Section: Connect With Us (Social Links)
 */
export const SocialSection = () => {
  return (
    <section className="relative px-4 py-16 overflow-hidden md:py-24 sm:px-8 md:px-16 bg-gradient-to-b from-white to-gray-50">
      <BackgroundParticles variant="social" />

      <div className="relative mx-auto max-w-7xl">
        <DividerWithText text="Connect with us" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {socialLinksData.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 group ${link.rotation} ${link.zIndex}`}
              >
                <CardContent
                  icon={Icon}
                  title={link.title}
                  // description={link.description}
                  bgColor={link.bgColor}
                  color={link.color}
                  showHoverText={true}
                />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-[#FD90A7]/20 rounded-b-full" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};


