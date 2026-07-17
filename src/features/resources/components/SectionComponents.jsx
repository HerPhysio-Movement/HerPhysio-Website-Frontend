/**
 * Reusable section header with optional subtitle and decoration
 * Reduces header duplication across sections
 */
export const SectionHeader = ({ 
  title, 
  subtitle = null, 
  tag = null,
  centered = true
}) => {
  const containerClass = centered ? 'text-center' : '';
  
  return (
    <div className={`${containerClass} mb-12 md:mb-16`}>
      {tag && (
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FD90A7] bg-[#FD90A7]/10 px-3 py-1 rounded-full inline-block mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto rounded-full" />
      {subtitle && (
        <p className="max-w-xl mx-auto mt-4 text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Reusable background particle animations
 * Reduces duplicate particle setup code
 */
export const BackgroundParticles = ({ variant = 'default' }) => {
  const particleConfigs = {
    default: [
      { top: 'top-10', left: 'left-5', width: 'w-20', height: 'h-20', color: '[#FD90A7]/10' },
      { bottom: 'bottom-10', right: 'right-5', width: 'w-28', height: 'h-28', color: '[#C7365B]/10' },
      { top: 'top-1/3', left: 'left-1/4', width: 'w-16', height: 'h-16', color: '[#F5A623]/10' },
    ],
    courses: [
      { top: 'top-10', right: 'right-5', width: 'w-24', height: 'h-24', color: '[#FD90A7]/10' },
      { bottom: 'bottom-10', left: 'left-5', width: 'w-32', height: 'h-32', color: '[#C7365B]/10' },
    ],
    webinars: [
      { top: 'top-10', left: 'left-1/4', width: 'w-20', height: 'h-20', color: '[#FD90A7]/10' },
      { bottom: 'bottom-10', right: 'right-1/3', width: 'w-28', height: 'h-28', color: '[#C7365B]/10' },
    ],
    articles: [
      { top: 'top-20', right: 'right-10', width: 'w-24', height: 'h-24', color: '[#FD90A7]/5' },
      { bottom: 'bottom-20', left: 'left-10', width: 'w-32', height: 'h-32', color: '[#C7365B]/5' },
    ],
    social: [
      { top: 'top-10', left: 'left-10', width: 'w-20', height: 'h-20', color: '[#FD90A7]/10' },
      { bottom: 'bottom-10', right: 'right-10', width: 'w-28', height: 'h-28', color: '[#C7365B]/10' },
    ],
  };

  const config = particleConfigs[variant] || particleConfigs.default;

  return (
    <div className="absolute inset-0 hidden pointer-events-none md:block">
      {config.map((particle, idx) => {
        const posClass = [
          particle.top || '',
          particle.bottom || '',
          particle.left || '',
          particle.right || '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={idx}
            className={`absolute ${posClass} ${particle.width} ${particle.height} bg-${particle.color} rounded-full blur-xl animate-float-slow`}
          />
        );
      })}
    </div>
  );
};

/**
 * Decorative divider with centered text
 */
export const DividerWithText = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
      <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
        {text}
      </h2>
      <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
    </div>
  );
};
