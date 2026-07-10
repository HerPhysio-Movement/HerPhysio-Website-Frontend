import React from 'react';
import { Target, X } from 'lucide-react';

const CommunityGraphSection = ({
  graphRef,
  datasets,
  years,
  hasAnimated,
  hoverModal,
  onPointMouseEnter,
  onPointMouseLeave,
  onModalMouseEnter,
  onModalMouseLeave,
  onCloseModal,
}) => {
  const maxValue = Math.max(...datasets.flatMap((dataset) => dataset.data)) + 5000;
  const width = 1000;
  const height = 500;
  const padding = { top: 40, right: 60, bottom: 60, left: 80 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xPos = (index) => padding.left + (index / (years.length - 1)) * graphWidth;
  const yPos = (value) => padding.top + graphHeight - (value / maxValue) * graphHeight;

  const getSmoothPath = (data) => {
    let path = '';
    for (let i = 0; i < data.length; i++) {
      const x = xPos(i);
      const y = yPos(data[i]);
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const xPrev = xPos(i - 1);
        const yPrev = yPos(data[i - 1]);
        const cp1x = xPrev + (x - xPrev) * 0.5;
        const cp1y = yPrev;
        const cp2x = x - (x - xPrev) * 0.5;
        const cp2y = y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
      }
    }
    return path;
  };

  const getAreaPath = (data) => {
    let path = getSmoothPath(data);
    const lastX = xPos(data.length - 1);
    const firstX = xPos(0);
    path += ` L ${lastX} ${padding.top + graphHeight} L ${firstX} ${padding.top + graphHeight} Z`;
    return path;
  };

  return (
    <section ref={graphRef} className="py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Target className="w-4 h-4" />
            <span>Exponential Growth</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1D2130] mb-3">
            The Her Physio Curve
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
          <p className="max-w-xl mx-auto text-lg text-gray-500">
            From grassroots to continental movement — our impact is accelerating.
          </p>
        </div>

        <div className="relative p-4 border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-xl">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ overflow: 'visible' }}>
            <defs>
              {datasets.map((ds, idx) => (
                <linearGradient key={idx} id={`grad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={ds.gradient[0]} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={ds.gradient[1]} stopOpacity="0.05" />
                </linearGradient>
              ))}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick) => {
              const y = padding.top + graphHeight * (1 - tick);
              const value = Math.round(maxValue * tick);
              return (
                <g key={tick}>
                  <line x1={padding.left} y1={y} x2={padding.left + graphWidth} y2={y} stroke="#f0f0f0" strokeWidth="1.5" strokeDasharray="6 4" />
                  <text x={padding.left - 10} y={y + 4} fontSize="11" fill="#9ca3af" textAnchor="end">{value.toLocaleString()}</text>
                </g>
              );
            })}

            {/* Areas */}
            {datasets.map((ds, idx) => (
              <path key={idx} d={getAreaPath(ds.data)} fill={`url(#grad-${idx})`} fillOpacity={hasAnimated ? 1 : 0} style={{ transition: 'fill-opacity 1.8s ease-out' }} />
            ))}

            {/* Lines */}
            {datasets.map((ds, idx) => (
              <path key={idx} d={getSmoothPath(ds.data)} fill="none" stroke={ds.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={hasAnimated ? 'none' : '2000'} strokeDashoffset={hasAnimated ? '0' : '2000'} style={{ transition: 'stroke-dashoffset 2s ease-out' }} filter="url(#glow)" />
            ))}

            {/* Interactive points */}
            {hasAnimated && datasets.map((ds, dIdx) => ds.data.map((value, i) => {
              const cx = xPos(i);
              const cy = yPos(value);
              return (
                <circle
                  key={`${dIdx}-${i}`}
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill={ds.color}
                  stroke="white"
                  strokeWidth="3"
                  className="transition-transform cursor-pointer hover:scale-125"
                  onMouseEnter={() => onPointMouseEnter({ dataset: ds.name, year: years[i], value, color: ds.color, description: ds.description, icon: ds.icon })}
                  onMouseLeave={onPointMouseLeave}
                />
              );
            }))}

            {/* X-axis labels */}
            <line x1={padding.left} y1={padding.top + graphHeight} x2={padding.left + graphWidth} y2={padding.top + graphHeight} stroke="#d1d5db" strokeWidth="2" />
            {years.map((year, i) => (
              <text key={i} x={xPos(i)} y={padding.top + graphHeight + 25} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="500">{year}</text>
            ))}
          </svg>

          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {datasets.map((dataset) => (
              <div key={dataset.name} className="flex items-center gap-2 cursor-default group">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dataset.color }} />
                <span className="text-sm text-gray-700 group-hover:text-[#FD90A7] transition">{dataset.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-center text-gray-400">* Projections based on current growth rate. Hover on any point for details.</div>
        </div>
      </div>

      {hoverModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
          onMouseEnter={onModalMouseEnter}
          onMouseLeave={onModalMouseLeave}
        >
          <div className="relative w-full max-w-md p-6 bg-white border border-gray-200 shadow-2xl rounded-xl">
            <button onClick={onCloseModal} className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full" style={{ backgroundColor: `${hoverModal.color}20` }}>
                {hoverModal.icon && React.createElement(hoverModal.icon, { className: 'w-10 h-10', style: { color: hoverModal.color } })}
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-2">{hoverModal.dataset}</h3>
              <div className="text-3xl font-black text-[#FD90A7] mb-2">{hoverModal.value.toLocaleString()}</div>
              <p className="mb-1 text-sm text-gray-500">Year: {hoverModal.year}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{hoverModal.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityGraphSection;
