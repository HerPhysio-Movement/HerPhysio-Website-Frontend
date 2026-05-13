import { projectAPI, eventAPI, blogAPI, webinarAPI, volunteerAPI, courseAPI } from '../services';
import { extractArrayFromResponse } from './apiHelpers';

export const fetchDashboardData = async () => {
  const results = await Promise.allSettled([
    projectAPI.getProjects(),
    eventAPI.getAllEvents(),
    blogAPI.getAllBlogsAdmin(),
    webinarAPI.getAllWebinars(),
    volunteerAPI.getAllVolunteers(),
    courseAPI.getAllCourses(),
  ]);

  return {
    projects:   extractArrayFromResponse(results[0].value, ['projects', 'data']),
    events:     extractArrayFromResponse(results[1].value, ['events', 'data']),
    articles:   extractArrayFromResponse(results[2].value, ['blogs', 'data']),
    webinars:   extractArrayFromResponse(results[3].value, ['webinars', 'data']),
    volunteers: extractArrayFromResponse(results[4].value, ['volunteers', 'data']),
    courses:    extractArrayFromResponse(results[5].value, ['courses', 'data']),
  };
};