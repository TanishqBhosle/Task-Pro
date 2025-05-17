import { Link } from "react-router-dom"

const ProjectCard = ({ project }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{project.name}</h3>
        <span className="badge badge-medium">{project.status}</span>
      </div>
      <div className="card-body">
        <p>{project.description}</p>
      </div>
      <div className="card-footer">
        <Link to={`/projects/${project._id}`} className="btn btn-primary">
          View Project
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard
