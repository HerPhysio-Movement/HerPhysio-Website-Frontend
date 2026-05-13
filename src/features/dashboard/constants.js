import { FileText, Calendar, Video, User, Image } from 'lucide-react';

export const filterTabs = [
  { name: 'Projects', icon: FileText, roles: ['admin', 'volunteer'] },
  { name: 'Articles', icon: FileText, roles: ['admin', 'volunteer'] },
  { name: 'Events', icon: Calendar, roles: ['admin', 'volunteer'] },
  { name: 'Webinar', icon: Video, roles: ['admin'] },
  { name: 'Volunteers', icon: User, roles: ['admin'] },
  { name: 'Gallery', icon: Image, roles: ['admin'] },
];