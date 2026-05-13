// src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { projectAPI } from '../services/projectAPI';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectAPI.getPublishedProjects();
        setProjects(data.projects || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading projects...</div>;
  if (error) return <div className="pt-20 text-center text-red-500">Error: {error}</div>;

  return (
    <main className="pt-20 pb-16 px-4 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold text-[#1D2130] mb-8">Our Projects</h1>
      <p className="text-[#525560] mb-8">Here are some of the projects we have done to empower women through physiotherapy.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.length ? projects.map((project) => (
          <div key={project.id} className="border p-6 rounded-lg bg-white shadow-sm">
            {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />}
            <h2 className="text-xl font-bold text-[#1D2130]">{project.title}</h2>
            <p className="text-[#525560] mt-2">{project.description}</p>
            <p className="text-sm text-gray-500 mt-2">Category: {project.category}</p>
          </div>
        )) : <p>No projects available.</p>}
      </div>
    </main>
  );
};

export default Projects;