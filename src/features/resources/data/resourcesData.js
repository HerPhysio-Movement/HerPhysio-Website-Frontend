import { 
  GraduationCap, Users, Stethoscope, BookOpen, 
  Youtube, Heart, Instagram, Twitter, Linkedin, Mail  
} from 'lucide-react';

/**
 * Static data for "Care That Moves With You" section
 */
export const notesData = [
  {
    id: 1,
    title: 'Demystifying Women\'s Health',
    icon: GraduationCap,
    iconBg: '#FD90A7',
    bgColor: '#FD90A7/10',
    color: '#FD90A7',
    description: 'Seminars, videos, and guides that make the women\'s health field accessible and easy to navigate for...',
    fullDescription: 'Seminars, videos, and guides that make the women\'s health field accessible and easy to navigate for students, physiotherapists, and healthcare professionals.',
    cta: 'Explore resources',
    ctaLink: '/resources',
    rotation: '-rotate-3',
    zIndex: 'z-10',
  },
  {
    id: 2,
    title: 'Building Confident Professionals',
    icon: Users,
    iconBg: '#C7365B',
    bgColor: '#C7365B/10',
    color: '#C7365B',
    description: 'Practical training and resources that equip physiotherapists and changemakers with the...',
    fullDescription: 'Practical training and resources that equip physiotherapists and changemakers with the skills and confidence to grow in the women\'s health space.',
    cta: 'Book a session',
    ctaLink: '/contact-us',
    rotation: 'rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 3,
    title: 'Taking Health to the Community',
    icon: Stethoscope,
    iconBg: '#4A90E2',
    bgColor: '#4A90E2/10',
    color: '#4A90E2',
    description: 'Outreaches and workshops that empower physiotherapists to educate women about...',
    fullDescription: 'Outreaches and workshops that empower physiotherapists to educate women about their bodies, right where they live.',
    cta: 'Join an outreach',
    ctaLink: '/volunteer-signup',
    rotation: 'rotate-2',
    zIndex: 'z-15',
  },
  // {
  //   id: 4,
  //   title: 'Research & Advocacy',
  //   icon: BookOpen,
  //   iconBg: '#F5A623',
  //   bgColor: '#F5A623/10',
  //   color: '#F5A623',
  //   description: 'We push for policies that prioritise women\'s health and fund community-driven research.',
  //   fullDescription: 'We collaborate with universities and health bodies to conduct research on women\'s health physiotherapy in Africa. Our advocacy work aims to make physiotherapy accessible to every woman.',
  //   cta: 'Read our research',
  //   ctaLink: '/blog',
  //   rotation: '-rotate-1',
  //   zIndex: 'z-5',
  // },
];

/**
 * Static data for "Online Courses" section
 */
export const coursesData = [
  {
    id: 1,
    title: 'Back Health & Posture',
    description: 'Learn exercises and habits to prevent and manage back pain, tailored for women.',
    fullDescription: 'This course covers anatomy of the spine, common causes of back pain, posture correction techniques, and a 15-minute daily routine. Includes video demonstrations and downloadable guides.',
    duration: '2 hours',
    level: 'Beginner',
    rotation: '-rotate-2',
    zIndex: 'z-10',
  },
  {
    id: 2,
    title: 'Pilates for Core Strength',
    description: 'Gentle, effective Pilates routines to strengthen your core and improve mobility.',
    fullDescription: 'Designed for women of all fitness levels, this course includes 6 Pilates sessions focusing on deep core activation, pelvic stability, and flexibility. No equipment needed.',
    duration: '1.5 hours',
    level: 'All levels',
    rotation: 'rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 3,
    title: 'Pelvic Floor Basics',
    description: 'Understand your pelvic floor - anatomy, common issues, and simple exercises.',
    fullDescription: 'Learn the anatomy of the pelvic floor, how to perform Kegels correctly, and when to seek help. Includes audio-guided relaxation and practical tips.',
    duration: '1 hour',
    level: 'Beginner',
    rotation: 'rotate-2',
    zIndex: 'z-15',
  },
];

/**
 * Static data for "Connect With Us" social media section
 */
export const socialLinksData = [
  {
    id: 1,
    title: 'Twitter(X)',
    description: 'Watch, learn, and subscribe.',
    icon: Twitter,
    url: 'https://www.x.com/Her_Physio',
    color: '#1DA1F2',
    bgColor: '#FD90A7/10',
    rotation: '-rotate-2',
    zIndex: 'z-10',
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Watch, learn, and subscribe.',
    icon: Linkedin,
    url: 'https://www.linkedin.com/company/herphysio-movement',
    color: '#4A90E2',
    bgColor: '#4A90E2/10',
    rotation: '-rotate-1',
    zIndex: 'z-10',
  },
  {
    id: 3,
    title: 'Instagram',
    description: 'Daily tips and community stories.',
    icon: Instagram,
    url: 'https://www.instagram.com/herphysio_movement',
    color: '#DD00DD',
    bgColor: '#4A90E2/10',
    rotation: 'rotate-1',
    zIndex: 'z-15',
  },
  {
    id: 4,
    title: "Email",
    description: 'Curated resources and articles.',
    icon: Mail,
    url: 'mailto:herphysiomovement@gmail.com',
    color: 'red',
    bgColor: '#C7365B/10',
    rotation: 'rotate-2',
    zIndex: 'z-20',
  },
];

/**
 * Top news items for the news section
 */
export const topNewsData = [
  {
    id: 1,
    icon: 'Sparkles',
    type: 'Announcement',
    date: 'April 2025',
    title: 'New: Free Pelvic Health Webinar Series',
    description: 'Four‑part series with leading physiotherapists. First session "Understanding Your Pelvic Floor" – available on demand.',
    link: '/resources#webinars',
    color: '#FD90A7',
  },
  {
    id: 2,
    icon: 'Calendar',
    type: 'Event',
    date: 'May 15, 2025',
    title: 'Community Outreach in Lagos',
    description: 'Free physiotherapy screenings and education. Volunteers needed!',
    link: '/volunteer-signup',
    color: '#FD90A7',
  },
  {
    id: 3,
    icon: 'Heart',
    type: 'Impact',
    date: 'March 2025',
    title: 'Over 900 Women Reached This Quarter',
    description: 'Expanded reach across three new communities – thanks to our volunteers and partners.',
    link: '/impact',
    color: '#FD90A7',
  },
];
