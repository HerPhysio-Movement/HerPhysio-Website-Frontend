import { X } from 'lucide-react';

/**
 * Reusable floating card component used across multiple sections
 * Eliminates 50+ lines of duplicate card rendering code
 */
export const FloatingCard = ({ 
  item, 
  isSelected, 
  onSelect, 
  children,
  rotation = '',
  zIndex = 'z-10',
  backgroundImage = '',
  backgroundAlt = ''
}) => {
  if (!isSelected) {
    return (
      <div
        onClick={onSelect}
        className={`relative overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group ${rotation} ${zIndex}`}
      >
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt={backgroundAlt || item?.title || ''}
              aria-hidden="true"
              className="absolute inset-0 object-cover w-full h-full opacity-20 transition-opacity duration-300 group-hover:opacity-25"
            />
            <div className="absolute inset-0 bg-white/75" />
          </>
        )}
        <div className="relative z-10">{children}</div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-[#FD90A7]/20 rounded-b-full z-20" />
      </div>
    );
  }

  return null;
};

/**
 * Generic modal component for displaying card details
 * Works with any content type (notes, courses, webinars, articles)
 */
export const ResourceModal = ({ 
  item, 
  isOpen, 
  onClose, 
  children,
  maxWidth = 'max-w-md',
  hasImage = false,
  imageUrl = null
}) => {
  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg ${maxWidth} w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl border border-gray-200 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {hasImage && imageUrl && (
          <div className="mb-4 overflow-hidden bg-gray-200 rounded-lg aspect-video">
            <img 
              src={imageUrl} 
              alt={item.title} 
              className="object-cover w-full h-full" 
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

/**
 * Card content renderer - displays icon, title, description
 */
export const CardContent = ({ 
  icon: Icon, 
  title, 
  description, 
  bgColor, 
  color,
  metadata = null,
  showHoverText = true
}) => {
  return (
    <div className="flex items-start gap-4">
      {Icon && (
        <div 
          className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full" 
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-bold text-xl text-[#1D2130] mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">{description}</p>
        {metadata && <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">{metadata}</div>}
        {showHoverText && (
          <div className="mt-3 text-xs text-[#FD90A7] opacity-0 group-hover:opacity-100 transition">
            Click to learn more →
          </div>
        )}
      </div>
    </div>
  );
};
