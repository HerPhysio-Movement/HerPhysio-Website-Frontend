// src/features/gallery/components/GalleryComponent.jsx
import { useState, useMemo } from 'react';
import { X, Search, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const allImages = [
  { id: 1, src: '/gallery1.jpg', alt: 'Community outreach in Lagos', category: 'Outreach' },
  { id: 2, src: '/gallery2.jpg', alt: 'Physiotherapy workshop', category: 'Training' },
  { id: 3, src: '/gallery3.jpg', alt: 'Panel session', category: 'Events' },
  { id: 4, src: '/gallery4.jpg', alt: 'Volunteer training', category: 'Training' },
  { id: 5, src: '/gallery5.jpg', alt: 'Wellness event', category: 'Events' },
  { id: 6, src: '/gallery6.jpg', alt: 'Mentorship program', category: 'Training' },
  { id: 7, src: '/gallery7.jpg', alt: 'Outreach in Ikeja', category: 'Outreach' },
  { id: 8, src: '/gallery8.jpg', alt: 'Webinar recording', category: 'Events' },
  { id: 9, src: '/gallery9.jpg', alt: 'Community health talk', category: 'Outreach' },
  { id: 10, src: '/gallery10.jpg', alt: 'Practical skills training', category: 'Training' },
];

const GalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = ['All', ...new Set(allImages.map((img) => img.category))];

  const filteredImages = useMemo(() => {
    let filtered = allImages;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((img) => img.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((img) => img.alt.toLowerCase().includes(q));
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;
  const loadMore = () => setVisibleCount((prev) => prev + 9);

  // Lightbox navigation
  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;
  const goToPrevious = () => {
    if (currentIndex > 0) setSelectedImage(filteredImages[currentIndex - 1]);
  };
  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) setSelectedImage(filteredImages[currentIndex + 1]);
  };

  // Generate a gentle alternating tilt for each card
  const getTilt = (index) => {
    const tilts = [-2, 1.5, -1, 2.5, -1.5, 0.8];
    return tilts[index % tilts.length];
  };

  return (
    <main className="min-h-screen bg-[#FFFAF9] pt-20 pb-16">
      {/* Hero header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
          <Sparkles className="w-4 h-4" />
          Our Gallery
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          Moments that matter
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
        <p className="text-[#A19390] max-w-xl mx-auto text-lg">
          A visual journey through our outreach events, training sessions, and community connections.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(9); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#FD90A7] text-white shadow-md'
                    : 'bg-white/70 backdrop-blur-sm border border-[#F3E4E2] text-[#A19390] hover:border-[#FD90A7] hover:text-[#FD90A7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A19390]" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent text-sm transition placeholder-[#A19390] text-[#1A1A1A]"
            />
          </div>
        </div>
        <p className="text-xs text-[#A19390] mt-2 text-center sm:text-left">
          Showing {visibleImages.length} of {filteredImages.length} images
        </p>
      </div>

      {/* Image Grid with tilting cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {visibleImages.map((image, idx) => (
            <div
              key={image.id}
              className="group relative bg-white/60 backdrop-blur-md border border-[#F3E4E2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              style={{
                transform: `rotate(${getTilt(idx)}deg)`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${getTilt(idx)}deg) scale(1)`;
              }}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image container – fixed height, object-cover */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Hover eye icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                    <Eye className="w-5 h-5 text-[#FD90A7]" />
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#FD90A7] text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                  {image.category}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-sm font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#FD90A7] transition-colors">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-6 py-3 border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7] hover:text-white transition-all duration-300 shadow-sm"
            >
              Load More
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#F3E4E2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-[#A19390]" />
            </div>
            <p className="text-[#A19390] text-lg">No images found</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {currentIndex < filteredImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-5xl max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm font-medium mb-1">{selectedImage.category}</p>
              <p className="text-lg font-semibold">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryComponent;