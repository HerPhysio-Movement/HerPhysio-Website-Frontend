// src/features/blog/components/BlogComponent.jsx
import { useState, useEffect } from 'react';
import { blogAPI } from '../../../services/blogAPI';
import { articleAPI } from '../../../services/articleAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import {
  Sparkles,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  X,
} from 'lucide-react';

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

const BlogComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const normalizeItem = (item, source) => {
      const publishedAt =
        item.created_at || item.published_at || item.publishedAt || item.date || item.publish_date;
      return {
        ...item,
        type: source,
        id:
          item.id ||
          item._id ||
          item.blog_id ||
          item.article_id ||
          item.articleId ||
          `${source}-${item.title?.replace(/\s+/g, '-').toLowerCase()}`,
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
          .filter((item) => item.status === 'published');

        const publishedArticles = articleItems
          .map((item) => normalizeItem(item, 'article'))
          .filter((item) => item.status === 'published');

        const combined = [...publishedBlogs, ...publishedArticles].sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );

        setArticles(combined);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF9] flex items-center justify-center">
        <div className="animate-pulse text-[#FD90A7] text-lg">
          Loading articles...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFAF9] pt-20 pb-16">
      {/* Hero header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
          <Sparkles className="w-4 h-4" />
          Our Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          Articles & Insights
        </h1>
        <div className="w-20 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
        <p className="text-[#A19390] max-w-xl mx-auto text-lg">
          Practical advice, stories, and expert perspectives on women’s health
          and physiotherapy.
        </p>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-[#F3E4E2]">
            <BookOpen className="w-16 h-16 text-[#F3E4E2] mx-auto mb-4" />
            <p className="text-[#A19390] text-lg">
              No articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={`${article.type}-${article.id}`}
                className="group bg-white/60 backdrop-blur-md border border-[#F3E4E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] bg-[#FEE7E4] text-[#C7365B]">
                    {article.type === 'blog' ? 'Blog' : 'Article'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#FD90A7] transition-colors">
                  {article.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#A19390] mb-3">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {article.author || 'Her Physio'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.created_at
              ? new Date(article.created_at).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )
              : 'Recent'}
          </span>
        </div>
                <p className="text-[#A19390] text-sm leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt || article.content?.substring(0, 120)}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-[#FD90A7] group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
            ))}

          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
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
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                <div className="mt-6 pt-4 border-t border-gray-200">
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
    </main>
  );
};

export default BlogComponent;
