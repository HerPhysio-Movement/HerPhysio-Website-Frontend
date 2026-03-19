import { donationStats } from "../constants";
import { useState, useMemo, useEffect, useRef } from "react";

const DonationStats = ({ showHeading = true }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState(donationStats.map(() => 0));

  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const chartRef = useRef(null);

  // Entrance animations
  useEffect(() => {
    setAnimated(true);
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCounts(
        donationStats.map((stat) =>
          Math.min(
            Math.floor((stat.percentage / steps) * step),
            stat.percentage,
          ),
        ),
      );
      if (step >= steps) {
        setCounts(donationStats.map((stat) => stat.percentage));
        clearInterval(interval);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  // Calculate total and gap
  const total = donationStats.reduce((acc, stat) => acc + stat.percentage, 0);
  const gap = 100 - total;

  // Prepare data including gap
  const data =
    gap > 0
      ? [
          ...donationStats,
          {
            label: "unallocated",
            percentage: gap,
            color: "rgba(255,255,255,0.15)",
            description: "Reserved for future initiatives and emergencies",
          },
        ]
      : donationStats;

  // Generate pie slices
  const slices = useMemo(() => {
    let startAngle = 0;
    return data.map((item) => {
      const angle = (item.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      const slice = { ...item, startAngle, endAngle };
      startAngle = endAngle;
      return slice;
    });
  }, [data]);

  // SVG dimensions
  const size = 320;
  const center = size / 2;
  const outerRadius = size * 0.4;
  const innerRadius = size * 0.2;

  const polarToCartesian = (angle, radius) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const describeSlice = (startAngle, endAngle) => {
    const startOuter = polarToCartesian(startAngle, outerRadius);
    const endOuter = polarToCartesian(endAngle, outerRadius);
    const startInner = polarToCartesian(startAngle, innerRadius);
    const endInner = polarToCartesian(endAngle, innerRadius);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      "M",
      startOuter.x,
      startOuter.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      1,
      endOuter.x,
      endOuter.y,
      "L",
      endInner.x,
      endInner.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      0,
      startInner.x,
      startInner.y,
      "Z",
    ].join(" ");
  };

  const handleSliceClick = (index) => {
    if (data[index].label === "unallocated") return;
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleMouseMove = (e, index) => {
    if (data[index].label === "unallocated") return;
    setTooltip({
      visible: true,
      x: e.clientX + 15,
      y: e.clientY - 30,
      content: (
        <div>
          <strong className="block text-pink-300">{data[index].label}</strong>
          <p className="text-sm mt-1 max-w-xs">{data[index].description}</p>
        </div>
      ),
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
    setHoveredIndex(null);
  };

  const selectedSlice = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <div className="w-full" style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {showHeading && (
          <h3 className="text-3xl font-semibold text-center text-white mb-12">
            How we spend your donations
          </h3>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Chart Container */}
          <div
            ref={chartRef}
            className="relative group flex justify-center items-center w-full lg:w-auto"
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            <div
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 transition-transform duration-500 ease-out group-hover:rotate-y-12 group-hover:rotate-x-6"
              style={{
                transformStyle: "preserve-3d",
                opacity: animated ? 1 : 0,
                transition: "opacity 1s ease, transform 0.5s ease",
              }}
            >
              <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
                <defs>
                  <filter
                    id="glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="4"
                      result="blur"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {slices.map((slice, index) => {
                  const isGap = slice.label === "unallocated";
                  const isHovered = hoveredIndex === index && !isGap;
                  const isSelected = selectedIndex === index && !isGap;
                  return (
                    <path
                      key={index}
                      d={describeSlice(slice.startAngle, slice.endAngle)}
                      fill={slice.color}
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={isHovered ? 2 : 1}
                      filter={isSelected ? "url(#glow)" : "none"}
                      onMouseMove={(e) => !isGap && handleMouseMove(e, index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleSliceClick(index)}
                      style={{
                        transition:
                          "stroke-width 0.2s, filter 0.2s, transform 0.2s",
                        transform: isHovered
                          ? `scale(1.02) translateZ(10px)`
                          : "scale(1)",
                        transformOrigin: "center",
                        cursor: isGap ? "default" : "pointer",
                      }}
                    />
                  );
                })}
                <circle
                  cx={center}
                  cy={center}
                  r={innerRadius - 2}
                  fill="black"
                />
              </svg>
            </div>
          </div>

          {/* Right Panel: Legend & Details */}
          <div className="w-full lg:w-auto lg:flex-1 max-w-md">
            {/* Legend Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {donationStats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 group cursor-pointer p-3 rounded-lg transition-all ${
                    hoveredIndex === index ? "bg-white/10" : ""
                  }`}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleSliceClick(index)}
                >
                  <div
                    className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: stat.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-base sm:text-lg font-semibold block truncate">
                      {counts[index]}% {stat.label}
                    </span>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Slice Panel */}
            {selectedSlice && selectedSlice.label !== "unallocated" && (
              <div
                className="mt-4 p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm animate-fadeIn"
                style={{ borderLeft: `4px solid ${selectedSlice.color}` }}
              >
                <h4 className="text-white text-xl font-semibold mb-2">
                  {selectedSlice.label}
                </h4>
                <p className="text-gray-300 mb-2">
                  {selectedSlice.description}
                </p>
                <p className="text-pink-300 font-medium">
                  {selectedSlice.percentage}% of donations
                </p>
                <button
                  className="mt-2 text-sm text-pink-400 hover:text-pink-300 underline transition"
                  onClick={() => setSelectedIndex(null)}
                >
                  Close
                </button>
              </div>
            )}

            {/* Gap Note */}
            {gap > 0 && (
              <p className="text-gray-400 mt-4 text-sm text-center lg:text-left">
                * {gap.toFixed(1)}% unallocated (reserved for future needs)
              </p>
            )}
          </div>
        </div>

        {/* Floating Tooltip */}
        {tooltip.visible && (
          <div
            className="fixed bg-black/90 text-white p-3 rounded-lg shadow-2xl border border-pink-500/30 z-50 pointer-events-none max-w-xs"
            style={{
              left: Math.min(tooltip.x, window.innerWidth - 320),
              top: tooltip.y,
              transform: "translateY(-100%)",
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationStats;
