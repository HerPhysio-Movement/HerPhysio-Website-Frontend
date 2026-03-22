import { useState, useMemo } from "react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { X, Heart, Search, Filter } from "lucide-react";
import ContributionCTA from "../components/HomePage/ContributionCTA";
import EventsSection from "../components/shared/EventsSection";

// Extended gallery images with more variety
const allImages = [
  {
    id: 1,
    src: "/gallery1.jpg",
    alt: "Community outreach in Lagos",
    category: "Outreach",
  },
  {
    id: 2,
    src: "/gallery2.jpg",
    alt: "Physiotherapy workshop",
    category: "Training",
  },
  { id: 3, src: "/gallery3.jpg", alt: "Panel session", category: "Events" },
  {
    id: 4,
    src: "/gallery4.jpg",
    alt: "Volunteer training",
    category: "Training",
  },
  { id: 5, src: "/gallery5.jpg", alt: "Wellness event", category: "Events" },
  {
    id: 6,
    src: "/gallery6.jpg",
    alt: "Mentorship program",
    category: "Training",
  },
  {
    id: 7,
    src: "/gallery7.jpg",
    alt: "Outreach in Ikeja",
    category: "Outreach",
  },
  { id: 8, src: "/gallery8.jpg", alt: "Webinar recording", category: "Events" },
  {
    id: 9,
    src: "/gallery9.jpg",
    alt: "Community health talk",
    category: "Outreach",
  },
  {
    id: 10,
    src: "/gallery10.jpg",
    alt: "Practical skills training",
    category: "Training",
  },
  {
    id: 11,
    src: "/gallery11.jpg",
    alt: "Panel discussion on pelvic health",
    category: "Events",
  },
  {
    id: 12,
    src: "/gallery12.jpg",
    alt: "Outreach in rural area",
    category: "Outreach",
  },
];

const socialLinks = [
  {
    platform: "YouTube",
    action: "Watch, learn, and subscribe",
    url: "https://www.youtube.com/@HerPhysioMovement",
    icon: FaYoutube,
  },
  {
    platform: "Instagram",
    action: "Daily tips and community stories",
    url: "https://www.instagram.com/herphysio_movement",
    icon: FaInstagram,
  },
  {
    platform: "LinkedIn",
    action: "Professional updates and collaborations",
    url: "https://www.linkedin.com/company/herphysio-movement",
    icon: FaLinkedin,
  },
  {
    platform: "Twitter (X)",
    action: "Advocacy and quick updates",
    url: "https://twitter.com/Her_Physio",
    icon: FaTwitter,
  },
  {
    platform: "Facebook",
    action: "Community events and stories",
    url: "https://web.facebook.com/herphysio",
    icon: FaFacebook,
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9); // initially show 9 images

  // Get unique categories
  const categories = ["All", ...new Set(allImages.map((img) => img.category))];

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    let filtered = allImages;
    if (activeCategory !== "All") {
      filtered = filtered.filter((img) => img.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((img) =>
        img.alt.toLowerCase().includes(query),
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  // Limit visible images for "Load More"
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-8 md:px-16 pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Gallery
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-4">
            Moments that matter
          </h1>
          <p className="text-lg text-[#525560] max-w-2xl">
            A visual journey through our outreach events, training sessions, and
            community connections.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="px-4 sm:px-8 md:px-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(9); // reset visible count when category changes
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-[#FD90A7] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9);
                }}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD90A7]"
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="text-sm text-gray-500 mb-4">
            Showing {visibleImages.length} of {filteredImages.length} gallery
            contents
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-8 md:px-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleImages.map((image) => (
              <div
                key={image.id}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
                <div className="absolute top-2 right-2 bg-[#FD90A7]/80 text-white text-xs px-2 py-1 rounded-full">
                  {image.category}
                </div>
              </div>
            ))}
          </div>

          {/* Load More button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="inline-flex items-center px-6 py-3 border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7] hover:text-white transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Social Media Cards */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Connect with us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FD90A7] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-xl flex items-center justify-center text-[#FD90A7] group-hover:bg-[#FD90A7]/20 transition mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D2130] mb-1">
                      {social.platform}
                    </h3>
                    <p className="text-[#525560] text-sm mb-3">
                      {social.action}
                    </p>
                    <span className="text-[#FD90A7] font-medium text-sm group-hover:underline">
                      Follow us →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Section (optional) */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Upcoming Events
            </h2>
          </div>
          <EventsSection showHeading={false} />
        </div>
      </section>

      {/* Contribution CTA */}
      <ContributionCTA />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="text-sm font-medium mb-1">
                {selectedImage.category}
              </p>
              <p className="text-lg font-semibold">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
