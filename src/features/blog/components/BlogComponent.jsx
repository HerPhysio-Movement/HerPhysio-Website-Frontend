import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { blogAPI } from '../../../services/blogAPI';
import toast from 'react-hot-toast';

const BlogComponent = () => {
  const { currentUser } = useUser();
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    author: currentUser?.f_name ? `${currentUser.f_name} ${currentUser.l_name || ''}`.trim() : 'Admin',
    email: currentUser?.email || '',
    status: 'published',
  });
  const [loading, setLoading] = useState(true);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await blogAPI.getAllBlogsPublic();
        const articlesArray = data.blogs || (Array.isArray(data) ? data : []);
        const published = articlesArray.filter(article => article.status === 'published');
        setArticles(published);
      } catch (error) {
        console.error('Failed to load articles:', error);
        toast.error('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('Only admins can create articles');
      return;
    }
    try {
      await blogAPI.createBlog(formData);
      toast.success('Article published');
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        image_url: '',
        author: currentUser?.f_name ? `${currentUser.f_name} ${currentUser.l_name || ''}`.trim() : 'Admin',
        email: currentUser?.email || '',
        status: 'published',
      });
      setShowForm(false);
      // Refresh the list
      const data = await blogAPI.getAllBlogsPublic();
      const articlesArray = data.blogs || (Array.isArray(data) ? data : []);
      setArticles(articlesArray.filter(a => a.status === 'published'));
    } catch (error) {
      console.log(error);
      toast.error('Failed to publish article');
    }
  };

  if (loading) {
    return <div className="pt-20 text-center">Loading articles...</div>;
  }

  return (
    <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-[#1D2130]">Blog</h1>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997] transition"
            >
              {showForm ? 'Cancel' : 'New Article'}
            </button>
          )}
        </div>

        {showForm && isAdmin && (
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                required
              />
              <textarea
                name="excerpt"
                placeholder="Short excerpt (optional)"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD90A7]"
                rows="2"
              />
              <textarea
                name="content"
                placeholder="Full content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD90A7]"
                rows="6"
                required
              />
              <input
                type="url"
                name="image_url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD90A7]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997] transition"
              >
                Publish
              </button>
            </form>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No articles yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1D2130] mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    By {article.author || 'Her Physio'} on{' '}
                    {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'Recent'}
                  </p>
                  <p className="text-gray-600 line-clamp-3">
                    {article.excerpt || article.content?.substring(0, 150)}
                  </p>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-[#FD90A7] font-medium mt-4 inline-block hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogComponent;