import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../services/taskService';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <Link to="/tasks/new" className="btn btn-default">
          Create Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>You don't have any tasks yet.</p>
          <Link to="/tasks/new" className="btn btn-default">
            Create your first task
          </Link>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className={`task-status status-${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                  <span className="task-due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                <Link to={`/tasks/${task._id}`} className="btn btn-sm btn-outline">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
