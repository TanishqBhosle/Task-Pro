import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/projectService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>
        <Link to="/projects/new" className="btn btn-default">
          Create Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="no-projects">
          <p>You don't have any projects yet.</p>
          <Link to="/projects/new" className="btn btn-default">
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
