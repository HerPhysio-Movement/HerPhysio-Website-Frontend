import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

/**
 * Contact information data
 */
export const contactInfoData = [
  {
    id: 1,
    icon: Phone,
    title: 'Call us',
    value: '+234 708 919 8901',
    href: 'tel:+2347089198901',
    type: 'phone',
  },
  {
    id: 2,
    icon: Mail,
    title: 'Email us',
    value: 'herphysiomovement@gmail.com',
    href: 'mailto:herphysiomovement@gmail.com',
    type: 'email',
  },
  {
    id: 3,
    icon: MapPin,
    title: 'Location',
    value: 'Lagos, Nigeria',
    href: null,
    type: 'location',
  },
];

/**
 * Social media links
 */
export const socialMediaLinks = [
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/share/p/161JYUarcj/',
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/herphysio_movement',
    icon: FaInstagram,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/Her_Physio',
    icon: FaTwitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/herphysio-movement',
    icon: FaLinkedinIn,
  },
];

/**
 * Form field configuration
 */
export const formFieldsConfig = [
  {
    name: 'f_name',
    label: 'First Name',
    type: 'text',
    icon: 'User',
    required: true,
  },
  {
    name: 'l_name',
    label: 'Last Name',
    type: 'text',
    icon: 'User',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    icon: 'Mail',
    required: true,
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    icon: 'Tag',
    required: true,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    icon: 'MessageSquare',
    required: true,
    rows: 5,
  },
];
