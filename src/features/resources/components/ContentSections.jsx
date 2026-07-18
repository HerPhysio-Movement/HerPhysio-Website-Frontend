import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  BookOpen,
  Image,
  X,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { FloatingCard, CardContent, ResourceModal } from './FloatingCard';
import { SectionHeader, BackgroundParticles } from './SectionComponents';
import { blogAPI } from '../../../services/blogAPI';
import { articleAPI } from '../../../services/articleAPI';
import { galleryAPI } from '../../../services/galleryAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import {
  getWebinarHost,
  getWebinarId,
  getWebinarTitle,
  getWebinarVideoUrl,
  getYouTubeEmbedUrl,
  // extractArrayFromResponse,
} from '../../../utils/videoHelpers';
const ALLOWED_TAGS = new Set([
  'a',
  'b',
  'blockquote',
  'br',
  'code',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'li',
  'ol',
  'p',
  'pre',
  'span',
  'strong',
  'ul',
]);

const ALLOWED_ATTRIBUTES = new Set(['href', 'target', 'rel', 'title']);

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, '').trim();

const getItemTimestamp = (item) => {
  const dateValue =
    item.created_at ||
    item.createdAt ||
    item.published_at ||
    item.publishedAt ||
    item.date ||
    item.updated_at ||
    item.updatedAt;
  const timestamp = Date.parse(dateValue);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const isPublishedItem = (item) =>
  item.status === 'published' ||
  item.status === 'Published' ||
  item.is_published === true ||
  item.published === true;

const EmptySectionState = ({ icon: Icon, message }) => (
  <div className="rounded-lg border border-dashed border-[#F3C7D2] bg-white/70 px-6 py-10 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FD90A7]/10">
      <Icon className="h-6 w-6 text-[#FD90A7]" />
    </div>
    <p className="text-sm font-medium text-gray-500">{message}</p>
  </div>
);

const sanitizeHtml = (html = '') => {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return stripHtml(html);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.body.querySelectorAll('*').forEach((element) => {
    const tagName = element.tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }

    [...element.attributes].forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase();
      const attributeValue = attribute.value.trim();

      if (
        attributeName.startsWith('on') ||
        !ALLOWED_ATTRIBUTES.has(attributeName) ||
        (attributeName === 'href' && /^javascript:/i.test(attributeValue))
      ) {
        element.removeAttribute(attribute.name);
      }
    });

    if (tagName === 'a') {
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return doc.body.innerHTML;
};

/**
 * Section: Webinar Recordings (fetches from API)
 */
export const WebinarsSection = ({ webinars = [] }) => {
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const rotations = ['-rotate-3', 'rotate-0', 'rotate-2'];
  const zIndices = ['z-10', 'z-20', 'z-15'];
  const previewWebinars = webinars.slice(0, 3);
  const selectedWebinarVideoUrl = getWebinarVideoUrl(selectedWebinar);
  const selectedWebinarEmbedUrl = getYouTubeEmbedUrl(selectedWebinarVideoUrl);

  return (
    <section id="webinars" className="relative px-4 py-16 overflow-hidden md:py-24 sm:px-8 md:px-16 bg-gradient-to-b from-white to-gray-50">
      <BackgroundParticles variant="webinars" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px] mb-2">
              Webinar Recordings
            </h2>
            <p className="text-[#525560] text-lg max-w-2xl">
              Missed a live session? Explore our library with expert talks on demand.
            </p>
          </div>
          <Link
            to="/webinars"
            className="text-sm text-[#FD90A7] hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {previewWebinars.length > 0 ? (
            previewWebinars.map((webinar, idx) => {
            const webinarId = getWebinarId(webinar) || idx;
            const title = getWebinarTitle(webinar);
            const host = getWebinarHost(webinar);

            return (
              <FloatingCard
                key={webinarId}
                item={webinar}
                isSelected={getWebinarId(selectedWebinar) === getWebinarId(webinar)}
                onSelect={() => setSelectedWebinar(webinar)}
                rotation={rotations[idx]}
                zIndex={zIndices[idx]}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FD90A7]/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-[#FD90A7]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1D2130] mb-1 line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-xs text-[#FD90A7] font-medium mb-2">
                      {host}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {webinar.description || webinar.caption}
                    </p>
                    <div className="mt-3 text-xs text-[#FD90A7] opacity-0 group-hover:opacity-100 transition">
                      Click to watch
                    </div>
                  </div>
                </div>
              </FloatingCard>
            );
            })
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptySectionState
                icon={Play}
                message="No webinar recordings are available yet."
              />
            </div>
          )}
        </div>
      </div>

      <ResourceModal
        item={selectedWebinar}
        isOpen={!!selectedWebinar}
        onClose={() => setSelectedWebinar(null)}
        maxWidth="max-w-3xl"
        hasImage={!selectedWebinarEmbedUrl}
        imageUrl={selectedWebinar?.image_url}
      >
        {selectedWebinar && (
          <>
            {selectedWebinarEmbedUrl && (
              <div className="mb-5 overflow-hidden bg-gray-900 rounded-lg aspect-video">
                <iframe
                  src={selectedWebinarEmbedUrl}
                  title={getWebinarTitle(selectedWebinar)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-[#1D2130] mb-2">
              {getWebinarTitle(selectedWebinar)}
            </h3>
            <p className="text-sm text-[#FD90A7] font-medium mb-3">
              Presented by {getWebinarHost(selectedWebinar)}
            </p>
            <p className="mb-6 leading-relaxed text-gray-600">
              {selectedWebinar.description || selectedWebinar.caption}
            </p>
            {selectedWebinarVideoUrl && (
              <a
                href={selectedWebinarVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997] transition"
              >
                <Play className="w-4 h-4" /> Watch Recording
              </a>
            )}
          </>
        )}
      </ResourceModal>
    </section>
  );
};

/**
 * Section: Articles & Insights (fetches from API)
 */
export const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  useEffect(() => {
    const normalizeItem = (item, source) => {
      const publishedAt =
        item.created_at || item.published_at || item.publishedAt || item.date || item.publish_date;
      const itemId =
        item.id ||
        item._id ||
        item.blog_id ||
        item.article_id ||
        item.articleId ||
        item.title?.replace(/\s+/g, '-').toLowerCase() ||
        'untitled';

      return {
        ...item,
        type: source,
        id: `${source}-${itemId}`,
        title: item.title || item.heading || 'Untitled',
        author: item.author || item.publisher || 'Her Physio',
        created_at: publishedAt,
        excerpt:
          stripHtml(
            item.excerpt ||
              item.summary ||
              item.description ||
              (typeof item.content === 'string' ? item.content.substring(0, 120) : '')
          ),
        content: item.content || item.body || item.description || '',
        image_url:
          item.image_url || item.image || item.featured_image || item.thumbnail || '',
        status: item.status || item.state || 'published',
      };
    };

    const fetchArticles = async () => {
      try {
        const [blogData, articleData] = await Promise.all([
          blogAPI.getAllBlogsPublic(),
          articleAPI.getAllArticles(),
        ]);

        const blogItems = extractArrayFromResponse(blogData, ['blogs', 'data', 'items']);
        const articleItems = extractArrayFromResponse(articleData, ['articles', 'data', 'items']);

        const publishedBlogs = blogItems
          .map((item) => normalizeItem(item, 'blog'))
          .filter(isPublishedItem);

        const publishedArticles = articleItems
          .map((item) => normalizeItem(item, 'article'))
          .filter(isPublishedItem);

        setArticles(publishedArticles);
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Failed to load articles:', error);
        setArticles([]);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="relative px-4 py-16 overflow-hidden bg-white md:py-24 sm:px-8 md:px-16">
        <BackgroundParticles variant="articles" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            tag="From our blog"
            title="Articles & Insights"
            subtitle="Practical advice, stories, and expert perspectives."
          />
        <div className="animate-pulse text-[#FD90A7] text-lg">
          Loading articles...
        </div>
      </div>
      </section>
    );
  }

  const latestArticles = [...articles]
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))
    .slice(0, 3);
  const latestBlogs = [...blogs]
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))
    .slice(0, 3);
  const hasArticlesOrBlogs = latestArticles.length > 0 || latestBlogs.length > 0;

  const rotations = ['-rotate-2', 'rotate-1', 'rotate-2'];
  const zIndices = ['z-10', 'z-20', 'z-15'];
  const renderArticleCards = (items) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((article, idx) => (
        <FloatingCard
          key={article.id}
          item={article}
          isSelected={selectedArticle?.id === article.id}
          onSelect={() => setSelectedArticle(article)}
          rotation={rotations[idx]}
          zIndex={zIndices[idx]}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] bg-[#FEE7E4] text-[#C7365B]">
              {article.type === 'blog' ? 'Blog' : 'Article'}
            </span>
          </div>
          <CardContent
            icon={BookOpen}
            title={article.title}
            description={
              <>
                <span className="block mb-1 text-xs text-gray-400">
                  {article.created_at
                    ? new Date(article.created_at).toLocaleDateString()
                    : 'Recent'}
                </span>
                <span className="line-clamp-3">
                  {article.excerpt || article.content?.substring(0, 100)}
                </span>
              </>
            }
            bgColor="#FD90A7/10"
            color="#FD90A7"
            showHoverText={true}
          />
        </FloatingCard>
      ))}
    </div>
  );

  return (
    <section className="relative px-4 py-16 overflow-hidden bg-white md:py-24 sm:px-8 md:px-16">
      <BackgroundParticles variant="articles" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tag="From our blog"
          title="Articles & Insights"
          subtitle="Practical advice, stories, and expert perspectives."
        />

        {hasArticlesOrBlogs ? (
          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-[#1D2130]">
                Latest Articles
              </h3>
              {latestArticles.length > 0 ? (
                renderArticleCards(latestArticles)
              ) : (
                <EmptySectionState
                  icon={BookOpen}
                  message="No articles are available yet."
                />
              )}
            </div>

            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-[#1D2130]">
                Latest Blogs
              </h3>
              {latestBlogs.length > 0 ? (
                renderArticleCards(latestBlogs)
              ) : (
                <EmptySectionState
                  icon={BookOpen}
                  message="No blogs are available yet."
                />
              )}
            </div>
          </div>
        ) : (
          <EmptySectionState
            icon={BookOpen}
            message="No articles or blogs are available yet."
          />
        )}

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FD90A7] hover:underline"
          >
            View all articles & blogs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* <ResourceModal
        item={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        maxWidth="max-w-2xl"
        hasImage={true}
        imageUrl={selectedArticle?.image_url}
      > */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#F3E4E2]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 sm:p-6 flex justify-between items-center border-b border-[#F3E4E2]">
                <h2 className="text-2xl font-bold text-[#1A1A1A] pr-8">
                  {selectedArticle.title}
                </h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-lg hover:bg-[#F3E4E2] transition text-[#A19390]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4 text-sm text-[#A19390] mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedArticle.author || 'Her Physio'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedArticle.created_at
                      ? new Date(selectedArticle.created_at).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )
                      : 'Recent'}
                  </span>
                </div>
                {selectedArticle.type === 'article' && selectedArticle.bio && (
                  <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-sm text-[#1A1A1A] leading-relaxed">{selectedArticle.bio}</p>
                  </div>
                )}
                {selectedArticle.content && (
                  <div
                    className="prose prose-sm max-w-none text-[#1A1A1A] leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(selectedArticle.content),
                    }}
                  />
                )}
                {selectedArticle.link && (
                  <div className="pt-4 mt-6 border-t border-gray-200">
                    <a
                      href={selectedArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#FD90A7] hover:text-[#C7365B] font-semibold transition"
                    >
                      Read full article <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      {/* </ResourceModal> */}
    </section>
  );
};

/**
 * Section: Gallery Preview (fetches latest images from API)
 */
export const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      try {
        const galleryItems = await galleryAPI.getGallery();
        if (!isMounted) return;
        setImages(Array.isArray(galleryItems) ? galleryItems : []);
      } catch (error) {
        console.error('Failed to load gallery preview:', error);
        if (isMounted) setImages([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const latestImages = [...images]
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))
    .slice(0, 3);
  const currentIndex = selectedImage
    ? latestImages.findIndex((image) => image.id === selectedImage.id)
    : -1;
  const goToPrevious = (event) => {
    event.stopPropagation();
    if (currentIndex > 0) setSelectedImage(latestImages[currentIndex - 1]);
  };
  const goToNext = (event) => {
    event.stopPropagation();
    if (currentIndex < latestImages.length - 1) {
      setSelectedImage(latestImages[currentIndex + 1]);
    }
  };

  return (
    <section className="relative px-4 py-16 overflow-hidden bg-[#FFFAF9] md:py-24 sm:px-8 md:px-16">
      <BackgroundParticles variant="articles" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tag="Gallery"
          title="Latest Moments"
          subtitle="A glimpse into our outreach events, training sessions, and community connections."
        />

        {loading ? (
          <div className="text-center animate-pulse text-[#FD90A7] text-lg">
            Loading gallery...
          </div>
        ) : latestImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {latestImages.map((image, idx) => {
              const rotations = ['-rotate-2', 'rotate-1', 'rotate-2'];
              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-lg border border-[#F3E4E2] bg-white/80 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:rotate-0 hover:shadow-xl cursor-pointer ${rotations[idx]}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.image_url || '/gallery1.jpg'}
                      alt={image.title || image.description || 'Gallery image'}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <div className="p-3 rounded-full shadow-lg bg-white/90 backdrop-blur-md">
                        <Eye className="w-5 h-5 text-[#FD90A7]" />
                      </div>
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#FD90A7] shadow-sm">
                      {image.caption || 'Event'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#1D2130] line-clamp-2">
                      {image.title || image.description || 'Gallery image'}
                    </h3>
                    {image.description && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptySectionState
            icon={Image}
            message="No gallery images are available yet."
          />
        )}

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FD90A7] hover:underline"
          >
            View all gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/70 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 text-white transition rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentIndex < latestImages.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image_url || '/gallery1.jpg'}
              alt={selectedImage.title || selectedImage.description || 'Gallery image'}
              className="object-contain max-w-full max-h-[85vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-white">
              <p className="mb-1 text-sm font-medium">
                {selectedImage.caption || 'Event'}
              </p>
              <p className="text-lg font-semibold">
                {selectedImage.title || selectedImage.description || 'Gallery image'}
              </p>
              {selectedImage.description && (
                <p className="mt-2 text-sm text-white/80">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
