// src/features/blog/components/BlogComponent.jsx
import { useState, useEffect } from 'react';
import { blogAPI } from '../../../services/blogAPI';
import {
  Sparkles,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  X,
} from 'lucide-react';

const BlogComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await blogAPI.getAllBlogsPublic();
        const articlesArray = data.blogs || (Array.isArray(data) ? data : []);
        const published = articlesArray.filter(
          (article) => article.status === 'published'
        );
        setArticles(published);
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
        <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
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
                key={article.id}
                className="group bg-white/60 backdrop-blur-md border border-[#F3E4E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                {article.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
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
              {selectedArticle.image_url && (
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}
              <div className="prose prose-sm max-w-none text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogComponent;