import { useState, useRef, useEffect } from "react";
import { Users, Video, Calendar, Briefcase, Venus } from "lucide-react";

const stats = [
  { value: 660, label: "Members in the Community", icon: Users },
  { value: 931, label: "Attended our Webinars", icon: Video },
  { value: 250, label: "Women Impacted", icon: Venus },
  { value: 21, label: "Webinars Hosted", icon: Calendar },
  { value: 3, label: "Collaborative Projects", icon: Briefcase },
];

// Particle burst component
const ParticleBurst = ({ active, onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create 30 particles
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 4 + 2,
        alpha: 0.8,
        life: 1,
      });
    }
    particlesRef.current = particles;

    let startTime = performance.now();
    const duration = 800;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx * (1 - progress);
        p.y += p.vy * (1 - progress);
        p.alpha = 0.8 * (1 - progress);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#FD90A7";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress), 0, Math.PI * 2);
        ctx.fill();
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [active, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const ImpactStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [celebrating, setCelebrating] = useState(
    Array(stats.length).fill(false),
  );
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setCounts(stats.map((stat) => stat.value));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, idx) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[idx] = end;
                  return newCounts;
                });
                // Trigger celebration for this card
                setCelebrating((prev) => {
                  const newCeleb = [...prev];
                  newCeleb[idx] = true;
                  return newCeleb;
                });
                clearInterval(timer);
              } else {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[idx] = Math.floor(start);
                  return newCounts;
                });
              }
            }, 16);
            return () => clearInterval(timer);
          });
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleCelebrationComplete = (idx) => {
    setCelebrating((prev) => {
      const newCeleb = [...prev];
      newCeleb[idx] = false;
      return newCeleb;
    });
  };

  return (
    <section ref={sectionRef} className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading with dash */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            OUR IMPACT
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative text-center p-6 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {celebrating[idx] && (
                  <ParticleBurst
                    active={celebrating[idx]}
                    onComplete={() => handleCelebrationComplete(idx)}
                  />
                )}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FD90A7]/20 group-hover:to-[#FD90A7]/5 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#FD90A7] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#1D2130] mb-1">
                  {counts[idx].toLocaleString()}
                </div>
                <div className="text-sm text-[#525560] relative inline-block">
                  {stat.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FD90A7] group-hover:w-full transition-all duration-300"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
