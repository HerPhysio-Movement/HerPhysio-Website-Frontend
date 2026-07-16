// src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { ArrowRight, FolderOpen, Image, Sparkles, Tag, X } from 'lucide-react';
import { projectAPI } from '../services/projectAPI';
import { extractArrayFromResponse } from '../utils/apiHelpers';
import { BackgroundParticles } from '../features/resources/components/SectionComponents';

const getProjectId = (project) =>
  project?.id || project?._id || project?.project_id || project?.projectId;

const getProjectTitle = (project) =>
  project?.title || project?.name || 'Untitled project';

const getProjectImage = (project) =>
  project?.thumbnail_url ||
  project?.preview_image ||
  project?.image_url ||
  project?.thumbnail ||
  project?.image;

const getProjectTags = (project) =>
  Array.isArray(project?.tags)
    ? project.tags.filter(Boolean)
    : String(project?.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectAPI.getPublishedProjects();
        setProjects(extractArrayFromResponse(data, ['projects', 'data', 'items']));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF9] flex items-center justify-center">
        <div className="animate-pulse text-[#FD90A7] text-lg">
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFAF9] pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-[#F3E4E2]">
          <p className="text-red-500 text-lg">Error loading projects: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#FFFAF9] pt-20 pb-16 overflow-hidden">
      <BackgroundParticles variant="webinars" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#FD90A7] mb-5">
          <Sparkles className="w-4 h-4" />
          Impact Portfolio
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          Our Projects
        </h1>
        <div className="w-20 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
        <p className="text-[#A19390] max-w-xl mx-auto text-lg">
          Explore the work we have done to support women, improve pelvic health
          education, and bring physiotherapy closer to communities.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-[#F3E4E2]">
            <FolderOpen className="w-16 h-16 text-[#F3E4E2] mx-auto mb-4" />
            <p className="text-[#A19390] text-lg">
              No projects available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const title = getProjectTitle(project);
              const imageUrl = getProjectImage(project);

              return (
                <article
                  key={getProjectId(project) || index}
                  className="group bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-video bg-linear-to-br from-[#FD90A7]/15 to-[#6020F0]/10 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <FolderOpen className="w-12 h-12 text-[#FD90A7]" />
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#FD90A7] text-xs font-semibold shadow-sm">
                      <Image className="w-3.5 h-3.5" />
                      View project
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    {project.category && (
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] bg-[#FEE7E4] text-[#C7365B] mb-3">
                        <Tag className="w-3 h-3" />
                        {project.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#FD90A7] transition-colors">
                      {title}
                    </h2>
                    <p className="text-[#A19390] text-sm leading-relaxed line-clamp-3 flex-1">
                      {project.description}
                    </p>
                    {getProjectTags(project).length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {getProjectTags(project).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#FFFAF9] px-2.5 py-1 text-xs font-medium text-[#A19390]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center text-sm font-medium text-[#FD90A7]">
                      Open project
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#F3E4E2]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 sm:p-6 flex justify-between items-center border-b border-[#F3E4E2]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] pr-8">
                {getProjectTitle(selectedProject)}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg hover:bg-[#F3E4E2] transition text-[#A19390]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="aspect-video rounded-xl overflow-hidden bg-[#F3E4E2] flex items-center justify-center mb-5">
                {getProjectImage(selectedProject) ? (
                  <img
                    src={getProjectImage(selectedProject)}
                    alt={getProjectTitle(selectedProject)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FolderOpen className="w-12 h-12 text-[#FD90A7]" />
                )}
              </div>

              {selectedProject.category && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#A19390] mb-4">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {selectedProject.category}
                  </span>
                </div>
              )}

              <p className="text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                {selectedProject.description}
              </p>

              {getProjectTags(selectedProject).length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {getProjectTags(selectedProject).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#FEE7E4] px-3 py-1 text-xs font-semibold text-[#C7365B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
