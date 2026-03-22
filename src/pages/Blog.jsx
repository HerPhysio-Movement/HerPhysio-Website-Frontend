import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { can } from "../utils/roles";
import toast from "react-hot-toast";

const Blog = () => {
  const { currentUser } = useUser();
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("blog_articles");
    if (stored) setArticles(JSON.parse(stored));
  }, []);

  const saveArticles = (newArticles) => {
    localStorage.setItem("blog_articles", JSON.stringify(newArticles));
    setArticles(newArticles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { id: Date.now(), ...formData };
    saveArticles([newArticle, ...articles]);
    toast.success("Article published");
    setFormData({ title: "", author: "", date: "", content: "", image: "" });
    setShowForm(false);
  };

  return (
    <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1D2130] font-zodiak">
            Blog
          </h1>
          {can(currentUser, "manage_content") && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-[#FD90A7] text-white rounded-full"
            >
              {showForm ? "Cancel" : "New Article"}
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                name="content"
                rows="6"
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FD90A7] text-white rounded-full"
              >
                Publish
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1D2130] mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  By {article.author} on {article.date}
                </p>
                <p className="text-gray-600 line-clamp-3">{article.content}</p>
                <a
                  href={`/blog/${article.id}`}
                  className="text-[#FD90A7] font-medium mt-4 inline-block"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Blog;
