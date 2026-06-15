import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, Calendar, MapPin, FolderOpen } from 'lucide-react';
import { projectAPI } from '../../../services/projectAPI';

const ProjectsDone = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectAPI.getPublishedProjects();
        const projectsArray = data.projects || data || [];
        // Show up to 3 projects on homepage
        setProjects(projectsArray.slice(0, 3));
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse text-[#FD90A7]">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null; // or a placeholder
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Our Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2130] mb-4">
            Our Projects
          </h2>
          <div className="w-20 h-1 bg-[#FD90A7] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-[#525560]">
            We are empowering women, one project at a time. Here are some of our recent initiatives.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="relative aspect-video bg-linear-to-br from-[#FD90A7]/15 to-[#6020F0]/10 flex items-center justify-center overflow-hidden">
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FolderOpen className="w-12 h-12 text-[#FD90A7]" />
                )}
                </div>
                {/* <img
                  src={project.thumbnail_url || 'https://placehold.net/building.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.category && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-[#1D2130]">
                    {project.category}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1D2130] mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-[#525560] text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                <button
                  onClick={() => openModal(project)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FD90A7] hover:gap-3 transition-all"
                >
                  Learn more <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects button */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7] hover:text-white transition"
          >
            View all projects
          </Link>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <div className="relative aspect-video bg-linear-to-br from-[#FD90A7]/15 to-[#6020F0]/10 flex items-center justify-center overflow-hidden">
                {selectedProject.thumbnail_url ? (
                  <img
                    src={selectedProject.thumbnail_url}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FolderOpen className="w-12 h-12 text-[#FD90A7] -translate-y-12" />
                )}
              </div>
              {/* <img
                src={selectedProject.thumbnail_url || 'https://placehold.net/building.svg'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              /> */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white h-8 w-8 rounded-full hover:bg-black/70 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1D2130] mb-3">{selectedProject.title}</h3>
              {selectedProject.category && (
                <div className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] text-xs px-3 py-1 rounded-full mb-4">
                  {selectedProject.category}
                </div>
              )}
              <p className="text-[#525560] leading-relaxed mb-6">{selectedProject.description}</p>
              {selectedProject.created_at && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedProject.created_at).toLocaleDateString()}</span>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997] transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsDone;