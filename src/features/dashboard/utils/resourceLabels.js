const RESOURCE_LABELS = {
  Articles: 'Article',
  Blogs: 'Blog',
  Courses: 'Course',
  Events: 'Event',
  Gallery: 'Gallery',
  Projects: 'Project',
  Volunteers: 'Volunteer',
  Webinar: 'Webinar',
};

export const getResourceLabel = (filter) =>
  RESOURCE_LABELS[filter] || filter || 'Item';
