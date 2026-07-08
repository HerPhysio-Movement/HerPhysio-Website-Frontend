// src/features/community/components/CommunityComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Calendar, Sparkles, ArrowRight, BookOpen, Target, X, CheckCircle, Mail, HelpingHand, Share2, Quote } from 'lucide-react';
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

const communityVoices = [
  "I'm new to the community, but so far Her Physio Movement is doing great.",
  "I would love having more webinars with long term professionals and increasing advocacy and enlightenment for people to know more about women's health physiotherapy.",
  "I can't think of any right now, I think Her Physio Movement is doing great with its webinars.",
  "Women's health has always been an interesting aspect of physiotherapy to me which makes me want to learn more about it and also be part of educating women and people as a whole about women's health and its tremendous input in health issues related to women.",
  "I would like to be a part of a community that fosters growth in women's health.",
  "I'm interested in challenging inequalities, promoting health equity and advancing women's right and empowerment.",
  "I love everything women and I am looking forward to being a pelvic health PT.",
  "I think that a large population of women does not know how much Physiotherapy can help them, especially complications from reproduction.",
  "I am interested in women's health because I've come to realise how complex the body of a woman is and even importantly how ignorant a lot of women are concerning things happening in their body.",
  "I want to be part of a community that prioritizes women's health and wellbeing. I'm excited about the opportunity to contribute to a community that provides a space for discussions all to improve women's health regardless of the challenges in our society.",
  "I want to contribute my quota to making health care information and services available to women especially those who are unavailable to access such services.",
  "I'm passionate about improving women's health and believe in the power of community to drive change. Joining this platform will allow me to learn, share knowledge, and collaborate with others who are equally committed to empowering women through evidence-based physiotherapy care.",
  "I have always been super interested in women's health . So when I saw this community I felt drawn to it.",
  "I really think that the health of mothers and women in general is often ignored and there are a lot of cultural bias against the gender. I am also conducting a research on the Caregiving burdens and quality of life of Mothers of children with autism, so I am really interested in advocating for women.",
  "I am interested in joining a women's health community because I believe women deserve safe spaces where they can learn, share, and talk openly about their physical, mental, and emotional well-being. I am passionate about growth, awareness, and empowering women with the right information to make healthier choices. Being part of such a community also allows me to learn from others while contributing positively.",
];

const CommunityComponent = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoverModal, setHoverModal] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const graphRef = useRef(null);
  const newsletterRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const involvementCards = [
    {
      title: 'Join the Community',
      description: 'Subscribe to our newsletter to join our community today.',
      icon: Mail,
      action: 'Subscribe to newsletter',
      onClick: () => newsletterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    },
    {
      title: 'Attend our Events',
      description: "Look out for upcoming events where you can learn something new in women's health.",
      icon: Calendar,
      action: 'Events',
      to: '/events',
    },
    {
      title: 'Donate towards an Outreach',
      description: 'Give towards mini-projects addressing the health needs of women in the community.',
      icon: HelpingHand,
      action: 'Donate',
      to: '/donate',
    },
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
        <div className="relative mx-auto text-center max-w-7xl">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-6 border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Our Community</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1D2130] mb-4 leading-tight">
            Together, We Make Impact.
          </h1>
          <p className="text-lg text-[#525560] max-w-2xl mx-auto mb-8">
            Join a community of women, healthcare professionals, and changemakers committed to transforming women's health across Africa. Whether you want to learn, or are ready to give back, there is a place for you <b>here</b>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
                <div key={ds.name} className="flex items-center gap-2 cursor-default group">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ds.color }} />
                  <span className="text-sm text-gray-700 group-hover:text-[#FD90A7] transition">{ds.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-center text-gray-400">* Projections based on current growth rate. Hover on any point for details.</div>
          </div>
        </div>
      </section>

      {/* Community voices section */}
      <section className="py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Quote className="w-4 h-4" />
              <span>Community Reflections</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-3">Voices from our Community</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="text-[#525560] text-lg max-w-xl mx-auto">
              Real reflections from people learning, advocating, and growing together in women's health.
            </p>
          </div>

          <div className="gap-6 columns-1 sm:columns-2 lg:columns-3">
            {communityVoices.map((voice, idx) => (
              <figure
                key={idx}
                className="p-6 mb-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm break-inside-avoid rounded-xl hover:-translate-y-1 hover:shadow-xl"
              >
                <Quote className="mb-4 h-8 w-8 text-[#FD90A7]/40" />
                <blockquote className="text-sm leading-relaxed text-[#525560]">
                  "{voice}"
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join? section */}
      <section className="py-20 overflow-hidden bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Why Her Physio Community?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-3">Join a Movement, Not Just a Group</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="text-[#525560] text-lg max-w-xl mx-auto">Three pillars that make our community different.</p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3"><div className="p-6 text-center transition-all duration-300 group hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <BookOpen className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Learn from Experts</h3>
              <p className="leading-relaxed text-gray-500">Access monthly seminars, and resources designed to empower you with women’s health knowledge.</p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-transparent mx-auto group-hover:w-20 transition-all duration-300" />
            </div>
            
            <div className="p-6 text-center transition-all duration-300 group hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <HelpingHand className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Volunteer for an Outreach</h3>
              <p className="leading-relaxed text-gray-500">Give your time and skills to address the health needs of women in the community during outreaches.</p>
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-transparent mx-auto group-hover:w-20 transition-all duration-300" />
            </div>

            <div className="p-6 text-center transition-all duration-300 group hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                    <Share2 className="w-10 h-10 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">Build your Network</h3>
              <p className="leading-relaxed text-gray-500">Connect with people who have similar passions with you, and who are willing to make a difference in women’s health.</p>
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

      {/* Get Involved section */}
      <section className="py-20 overflow-hidden bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <HelpingHand className="w-4 h-4" />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1D2130] mb-3">Get Involved</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
            <p className="max-w-xl mx-auto text-gray-500">Choose a simple next step and help strengthen women's health in your community.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {involvementCards.map((card, idx) => {
              const Icon = card.icon;
              const actionClassName = "text-[#FD90A7] font-medium text-sm hover:underline flex items-center gap-1";
              return (
                <div
                  key={idx}
                  className="flex flex-col p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors shrink-0">
                      <Icon className="w-6 h-6 text-[#FD90A7] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-bold text-xl text-[#1D2130] group-hover:text-[#FD90A7] transition-colors">{card.title}</h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-gray-500">{card.description}</p>
                  <div className="flex items-center justify-end pt-3 mt-auto border-t border-gray-100">
                    {card.to ? (
                      <Link to={card.to} className={actionClassName}>
                        {card.action} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button onClick={card.onClick} className={actionClassName}>
                        {card.action} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-[#525560]">
              You can be a part of this movement that improves the lives of women in your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link to="/donate" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD90A7] text-white rounded-md font-semibold hover:bg-[#f77997] transition shadow-md">
                Donate Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/volunteer-signup" className="inline-flex items-center gap-2 px-6 py-3 border border-[#FD90A7] text-[#FD90A7] rounded-md font-semibold hover:bg-[#FD90A7]/10 transition">
                Volunteer Today <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <EventsSection showHeading={false} />
        </div>
      </section>

      {/* Newsletter section – fixed without broken SVG pattern */}
      <section ref={newsletterRef} className="relative py-24 bg-gradient-to-br from-[#FD90A7]/5 via-white to-[#C7365B]/5 overflow-hidden">
        {/* Simple decorative dots – safe CSS pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FD90A7 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-6 border border-white/50 shadow-sm">
            <Mail className="w-4 h-4" />
            <span>Never miss an update</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D2130] mb-3">Stay in the loop</h2>
          <p className="max-w-xl mx-auto mb-8 text-gray-600">
            Get community news, event invites, and health tips delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
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
          <p className="mt-4 text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Hover Modal for graph points */}
      {hoverModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
        >
          <div className="relative w-full max-w-md p-6 bg-white border border-gray-200 shadow-2xl rounded-xl">
            <button onClick={() => setHoverModal(null)} className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full" style={{ backgroundColor: `${hoverModal.color}20` }}>
                {hoverModal.icon && React.createElement(hoverModal.icon, { className: "w-10 h-10", style: { color: hoverModal.color } })}
              </div>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-2">{hoverModal.dataset}</h3>
              <div className="text-3xl font-black text-[#FD90A7] mb-2">{hoverModal.value.toLocaleString()}</div>
              <p className="mb-1 text-sm text-gray-500">Year: {hoverModal.year}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{hoverModal.description}</p>
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
