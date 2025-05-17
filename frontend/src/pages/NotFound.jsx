import { Link } from "react-router-dom"
import Header from "../components/Header"

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="form-container text-center">
          <h1 className="form-title">404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
