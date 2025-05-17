import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <div className="sidebar-menu">
        <Link to="/" className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link to="/projects" className={`sidebar-link ${location.pathname.includes("/projects") ? "active" : ""}`}>
          Projects
        </Link>
        <Link to="/tasks" className={`sidebar-link ${location.pathname.includes("/tasks") ? "active" : ""}`}>
          Tasks
        </Link>
        <Link
          to="/automations"
          className={`sidebar-link ${location.pathname.includes("/automations") ? "active" : ""}`}
        >
          Automations
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
