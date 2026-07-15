import { projectAPI, eventAPI, articleAPI, blogAPI, webinarAPI, volunteerAPI, courseAPI, galleryAPI } from '../services';
import { extractArrayFromResponse } from './apiHelpers';

export const fetchDashboardData = async () => {
  const results = await Promise.allSettled([
    projectAPI.getProjects(),
    eventAPI.getAllEvents(),
    articleAPI.getAllArticles(),
    blogAPI.getAllBlogsAdmin(),
    webinarAPI.getAllWebinars(),
    volunteerAPI.getAllVolunteers(),
    courseAPI.getAllCourses(),
    galleryAPI.getGallery(),
  ]);

  return {
    projects:   extractArrayFromResponse(results[0].value, ['projects', 'data']),
    events:     extractArrayFromResponse(results[1].value, ['events', 'data']),
    articles:   extractArrayFromResponse(results[2].value, ['articles', 'data']),
    blogs:      extractArrayFromResponse(results[3].value, ['blogs', 'data']),
    webinars:   extractArrayFromResponse(results[4].value, ['webinars', 'data']),
    volunteers: extractArrayFromResponse(results[5].value, ['volunteers', 'data']),
    courses:    extractArrayFromResponse(results[6].value, ['courses', 'data']),
    gallery:    extractArrayFromResponse(results[7].value, ['images', 'data']),
  };
};
