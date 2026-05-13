// src/features/community/components/CommunityComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Calendar, MessageCircle, Sparkles, ArrowRight, Globe, Coffee, BookOpen, Target, X, CheckCircle, Mail } from 'lucide-react';
import EventsSection from '../../events/components/EventsSection';

const years = ['2022', '2023', '2024', '2025', '2026', '2027', '2028'];
const datasets = [
  { 
    name: 'Community Members', 
    color: '#FD90A7', 
    gradient: ['#FD90A7', '#C7365B'],
    data: [1200, 2400, 3800, 5000, 10000, 18000, 30000],
    icon: Users,
    description: 'We are building a thriving community of women and advocates across Africa.'
  },
  { 
    name: 'Volunteers', 
    color: '#C7365B', 
    gradient: ['#C7365B', '#8B2448'],
    data: [45, 98, 150, 200, 500, 900, 1600],
    icon: Heart,
    description: 'Our volunteer network is the heartbeat of our outreach and training programs.'
  },
  { 
    name: 'Workshops', 
    color: '#F5A623', 
    gradient: ['#F5A623', '#D48806'],
    data: [8, 18, 32, 50, 100, 200, 350],
    icon: Calendar,
    description: 'Each workshop equips women with knowledge and professionals with skills.'
  },
  { 
    name: 'Lives Impacted', 
    color: '#4A90E2', 
    gradient: ['#4A90E2', '#1E5AA7'],
    data: [300, 750, 1800, 3000, 20000, 50000, 100000],
    icon: Target,
    description: 'Every life transformed ripples through families and communities.'
  },
];

const CommunityComponent = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [hoverModal, setHoverModal] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const graphRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const communityGroups = [
    { title: 'Pelvic Health Support Group', members: 234, icon: Heart, description: 'A safe space to share and heal together.' },
    { title: 'New Moms Circle', members: 156, icon: Users, description: 'For mothers at every stage – ask, share, connect.' },
    { title: 'Physiotherapy Students Network', members: 89, icon: BookOpen, description: 'Learn, mentor, and grow with peers.' },
    { title: 'Wellness Wednesday Chats', members: 112, icon: MessageCircle, description: 'Weekly conversations on mind, body, and spirit.' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (graphRef.current) observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleJoinClick = (groupName) => {
    setSelectedGroup(groupName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup('');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    alert(`Subscribed with ${email}! (demo)`);
    setEmail('');
    setIsSubmitting(false);
  };

  const handlePointMouseEnter = (info) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setHoverModal(info);
  };

  const handlePointMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoverModal(null);
    }, 300);
  };

  const handleModalMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleModalMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoverModal(null);
    }, 300);
  };

  // Graph calculations
  const maxValue = Math.max(...datasets.flatMap(d => d.data)) + 5000;
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
    <main className="bg-white">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-white via-[#FFF5F7] to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FD90A7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C7365B]/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-6 border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Our Community</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1D2130] mb-4 leading-tight">
            Together, We Make Impact.
          </h1>
          <p className="text-lg text-[#525560] max-w-2xl mx-auto mb-8">
            Join a vibrant community of women, healthcare professionals, and advocates dedicated to transforming women's health across Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/volunteer-signup" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD90A7] text-white rounded-md font-semibold hover:bg-[#f77997] transition shadow-md">
              Become a volunteer
            </Link>
            <Link to="/events" className="inline-flex items-center gap-2 px-6 py-3 border border-[#FD90A7] text-[#FD90A7] rounded-md font-semibold hover:bg-[#FD90A7]/10 transition">
              View events
            </Link>
          </div>
        </div>
      </section>

      {/* Graph section */}
      <section ref={graphRef} className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Target className="w-4 h-4" />
              <span>Exponential Growth</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1D2130] mb-3">
              The Her Physio Curve
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              From grassroots to continental movement — our impact is accelerating.
            </p>
          </div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-100">
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
                    className="cursor-pointer transition-transform hover:scale-125"
                    onMouseEnter={() => handlePointMouseEnter({ dataset: ds.name, year: years[i], value, color: ds.color, description: ds.description, icon: ds.icon })}
                    onMouseLeave={handlePointMouseLeave}
                  />
                );
              }))}

              {/* X‑axis labels */}
              <line x1={padding.left} y1={padding.top + graphHeight} x2={padding.left + graphWidth} y2={padding.top + graphHeight} stroke="#d1d5db" strokeWidth="2" />
              {years.map((year, i) => (
                <text key={i} x={xPos(i)} y={padding.top + graphHeight + 25} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="500">{year}</text>
              ))}
            </svg>

            <div className="flex flex-wrap justify-center gap-8 mt-6">
              {datasets.map((ds) => (
                <div key={ds.name} className="flex items-center gap-2 group cursor-default">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ds.color }} />
                  <span className="text-sm text-gray-700 group-hover:text-[#FD90A7] transition">{ds.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-gray-400 mt-6">* Projections based on current growth rate. Hover on any point for details.</div>
          </div>
        </div>
      </section>

      {/* Why Join? section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Why Her Physio Community?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-3">Join a Movement, Not Just a Group</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="text-[#525560] text-lg max-w-xl mx-auto">Three pillars that make our community different.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="group text-center p-6 transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <Users className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Connect</h3>
              <p className="text-gray-500 leading-relaxed">Meet like‑minded women, healthcare advocates, and mentors who share your vision.</p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-transparent mx-auto group-hover:w-20 transition-all duration-300" />
            </div>
            <div className="group text-center p-6 transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <BookOpen className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Learn</h3>
              <p className="text-gray-500 leading-relaxed">Access expert‑led workshops, webinars, and a growing library of health resources.</p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-transparent mx-auto group-hover:w-20 transition-all duration-300" />
            </div>
            <div className="group text-center p-6 transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <Heart className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Give Back</h3>
              <p className="text-gray-500 leading-relaxed">Volunteer for outreaches, mentor others, and leave a lasting impact.</p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-transparent mx-auto group-hover:w-20 transition-all duration-300" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FD90A7]" /> Free membership</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FD90A7]" /> Global network</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FD90A7]" /> No pressure, all support</div>
          </div>
        </div>
      </section>

      {/* Join a Group section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Users className="w-4 h-4" />
              <span>Find Your Tribe</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-3">Join a Group</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="text-gray-500 max-w-xl mx-auto">Connect with women who share your journey and interests.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityGroups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-bold text-xl text-[#1D2130] group-hover:text-[#FD90A7] transition-colors">{group.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{group.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-400">{group.members} members</span>
                    <button
                      onClick={() => handleJoinClick(group.title)}
                      className="text-[#FD90A7] font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      Join <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsSection showHeading={false} />
        </div>
      </section>

      {/* Newsletter section – fixed without broken SVG pattern */}
      <section className="relative py-24 bg-gradient-to-br from-[#FD90A7]/5 via-white to-[#C7365B]/5 overflow-hidden">
        {/* Simple decorative dots – safe CSS pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FD90A7 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-6 border border-white/50 shadow-sm">
            <Mail className="w-4 h-4" />
            <span>Never miss an update</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D2130] mb-3">Stay in the loop</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Get community news, event invites, and health tips delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent bg-white/90 backdrop-blur-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#FD90A7] text-white rounded-md font-semibold hover:bg-[#f77997] transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Modal for group join */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-2xl border border-gray-200 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FD90A7]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-[#FD90A7]" /></div>
              <h3 className="text-xl font-bold text-[#1D2130] mb-2">{selectedGroup}</h3>
              <p className="text-gray-600 mb-6">Register with us and you will be updated as time goes on. The windows are closed for now.</p>
              <button onClick={closeModal} className="px-5 py-2 bg-[#FD90A7] text-white rounded-md font-medium hover:bg-[#f77997] transition">Got it</button>
            </div>
          </div>
        </div>
      )}

      {/* Hover Modal for graph points */}
      {hoverModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
        >
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
            <button onClick={() => setHoverModal(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${hoverModal.color}20` }}>
                {hoverModal.icon && React.createElement(hoverModal.icon, { className: "w-10 h-10", style: { color: hoverModal.color } })}
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-2">{hoverModal.dataset}</h3>
              <div className="text-3xl font-black text-[#FD90A7] mb-2">{hoverModal.value.toLocaleString()}</div>
              <p className="text-sm text-gray-500 mb-1">Year: {hoverModal.year}</p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">{hoverModal.description}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
};

export default CommunityComponent;