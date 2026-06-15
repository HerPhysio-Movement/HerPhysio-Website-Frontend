const validators = {
  required: (value, fieldName) => {
    if (value === undefined || value === null || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
      return `${fieldName} is required`;
    }
    return null;
  },
  email: (value) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null),
  phone: (value) => (!/^\+?[\d\s\-()]{7,15}$/.test(value) ? 'Invalid phone number' : null),
  password: (value) => (value && value.length < 6 ? 'Password must be at least 6 characters' : null),
  minLength: (min) => (value) => ((value || '').length < min ? `Must be at least ${min} characters` : null),
  url: (value) => {
    if (!value) return null;
    try { new URL(value); return null; } catch { return 'Must be a valid URL'; }
  },
};

const rules = {
  Projects: {
    title: [validators.required],
    description: [validators.required, validators.minLength(10)],
    category: [validators.required],
  },
  Events: {
    event_name: [validators.required],
    event_host: [validators.required],
    description: [validators.required, validators.minLength(10)],
    event_date: [validators.required],
    event_time: [validators.required],
    venue: [validators.required],
    caption: [validators.required],
    link: [validators.required, validators.url],
  },
  Articles: {
    title: [validators.required],
    content: [validators.required, validators.minLength(10)],
    author: [validators.required],
    email: [validators.required, validators.email],
  },
  Blogs: {
    title: [validators.required],
    content: [validators.required, validators.minLength(10)],
    author: [validators.required],
    email: [validators.required, validators.email],
  },
  Webinar: {
    webinar_title: [validators.required],
    webinar_host: [validators.required],
    description: [validators.required, validators.minLength(10)],
    youtube_url: [validators.url],
  },
  Courses: {
    course_title: [validators.required],
    caption: [validators.required],
    description: [validators.required, validators.minLength(10)],
    category: [validators.required],
    tags: [validators.required],
    youtube_url: [validators.url],
  },
  Volunteers: {
    f_name: [validators.required],
    l_name: [validators.required],
    email: [validators.required, validators.email],
    p_number: [validators.required, validators.phone],
    motivation_note: [validators.required],
  },
};

export const validateForm = (type, data) => {
  const errors = {};
  const fields = rules[type];
  if (!fields) return { isValid: true, errors: {} };

  Object.keys(fields).forEach((field) => {
    for (const rule of fields[field]) {
      const error = rule(data[field], field);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
};