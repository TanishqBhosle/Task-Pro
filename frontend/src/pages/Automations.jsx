import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAutomations, toggleAutomationStatus } from '../services/automationService';

const Automations = () => {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAutomations = async () => {
    try {
      setLoading(true);
      const data = await getAutomations();
      setAutomations(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch automations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  const handleToggleStatus = async (id, isActive) => {
    try {
      await toggleAutomationStatus(id, isActive);
      // Refresh the list after toggling status
      fetchAutomations();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update automation status');
    }
  };

  if (loading) {
    return <div className="loading">Loading automations...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="automations-page">
      <div className="automations-header">
        <h1>Automations</h1>
        <Link to="/automations/new" className="btn btn-default">
          Create Automation
        </Link>
      </div>

      {automations.length === 0 ? (
        <div className="no-automations">
          <p>You don't have any automations yet.</p>
          <Link to="/automations/new" className="btn btn-default">
            Create your first automation
          </Link>
        </div>
      ) : (
        <div className="automations-list">
          {automations.map(automation => (
            <div key={automation._id} className="automation-card">
              <div className="automation-info">
                <h3>{automation.name}</h3>
                <p>{automation.description}</p>
                <div className="automation-meta">
                  <span className={`automation-status status-${automation.isActive ? 'active' : 'inactive'}`}>
                    {automation.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="automation-trigger">
                    Trigger: {automation.trigger}
                  </span>
                </div>
              </div>
              <div className="automation-actions">
                <Link to={`/automations/${automation._id}`} className="btn btn-sm btn-outline">
                  View
                </Link>
                <button 
                  className={`btn btn-sm ${automation.isActive ? 'btn-destructive' : 'btn-default'}`}
                  onClick={() => handleToggleStatus(automation._id, automation.isActive)}
                >
                  {automation.isActive ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Automations;
