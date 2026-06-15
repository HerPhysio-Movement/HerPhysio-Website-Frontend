import { 
  GraduationCap, Users, Stethoscope, BookOpen, 
  Youtube, Heart, Instagram 
} from 'lucide-react';

/**
 * Static data for "Care That Moves With You" section
 */
export const notesData = [
  {
    id: 1,
    title: 'Empowering through education',
    icon: GraduationCap,
    iconBg: '#FD90A7',
    bgColor: '#FD90A7/10',
    color: '#FD90A7',
    description: 'Free guides, videos, and articles to help you understand your body and make informed decisions.',
    fullDescription: 'Access a growing library of evidence-based resources created by physiotherapists. From pelvic health to back pain, we break down complex topics into easy-to-understand content. All resources are free and available 24/7.',
    cta: 'Explore resources',
    ctaLink: '/resources',
    rotation: '-rotate-3',
    zIndex: 'z-10',
  },
  {
    id: 2,
    title: 'Community health outreach',
    icon: Users,
    iconBg: '#C7365B',
    bgColor: '#C7365B/10',
    color: '#C7365B',
    description: 'Workshops and events in local communities, bringing care directly to those who need it most.',
    fullDescription: 'We organise free health screenings, workshops, and training sessions in underserved communities. Our mobile teams bring physiotherapy services to your doorstep, ensuring no woman is left behind.',
    cta: 'Join an outreach',
    ctaLink: '/volunteer-signup',
    rotation: 'rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 3,
    title: 'Specialised physiotherapy',
    icon: Stethoscope,
    iconBg: '#4A90E2',
    bgColor: '#4A90E2/10',
    color: '#4A90E2',
    description: 'One-on-one virtual consultations and personalized care plans for pelvic health, prenatal, and postpartum needs.',
    fullDescription: 'Book a confidential virtual session with a certified women\'s health physiotherapist. Receive a tailored plan that addresses your unique concerns - from pelvic pain to postnatal recovery.',
    cta: 'Book a session',
    ctaLink: '/contact-us',
    rotation: 'rotate-2',
    zIndex: 'z-15',
  },
  {
    id: 4,
    title: 'Research & Advocacy',
    icon: BookOpen,
    iconBg: '#F5A623',
    bgColor: '#F5A623/10',
    color: '#F5A623',
    description: 'We push for policies that prioritise women\'s health and fund community-driven research.',
    fullDescription: 'We collaborate with universities and health bodies to conduct research on women\'s health physiotherapy in Africa. Our advocacy work aims to make physiotherapy accessible to every woman.',
    cta: 'Read our research',
    ctaLink: '/blog',
    rotation: '-rotate-1',
    zIndex: 'z-5',
  },
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
    title: 'YouTube',
    description: 'Watch, learn, and subscribe.',
    icon: Youtube,
    url: 'https://www.youtube.com/@HerPhysioMovement',
    color: '#FD90A7',
    bgColor: '#FD90A7/10',
    rotation: '-rotate-2',
    zIndex: 'z-10',
  },
  {
    id: 2,
    title: "Women's Health Portal",
    description: 'Curated resources and articles.',
    icon: Heart,
    url: 'https://www.womenshealth.com/',
    color: '#C7365B',
    bgColor: '#C7365B/10',
    rotation: 'rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 3,
    title: 'Instagram',
    description: 'Daily tips and community stories.',
    icon: Instagram,
    url: 'https://www.instagram.com/herphysio_movement',
    color: '#4A90E2',
    bgColor: '#4A90E2/10',
    rotation: 'rotate-2',
    zIndex: 'z-15',
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
