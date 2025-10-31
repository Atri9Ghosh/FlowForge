import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    failed: 0
  });

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      // In a real implementation, this would fetch from your API
      // For demo purposes, we'll use mock data
      const mockWorkflows = [
        {
          id: '1',
          name: 'Email to Telegram',
          trigger: 'gmail:new_email',
          action: 'telegram:send_message',
          isActive: true,
          lastRun: new Date().toISOString(),
          runs: [
            { id: '1', status: 'success', createdAt: new Date().toISOString() },
            { id: '2', status: 'success', createdAt: new Date(Date.now() - 86400000).toISOString() }
          ]
        },
        {
          id: '2',
          name: 'GitHub Issues to Email',
          trigger: 'github:new_issue',
          action: 'gmail:send_email',
          isActive: false,
          lastRun: null,
          runs: []
        }
      ];
      
      setWorkflows(mockWorkflows);
      
      // Calculate stats
      const total = mockWorkflows.length;
      const active = mockWorkflows.filter(w => w.isActive).length;
      const failed = mockWorkflows.flatMap(w => w.runs).filter(r => r.status === 'failed').length;
      
      setStats({ total, active, failed });
    } catch (error) {
      console.error('Error fetching workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/workflows/create" className="btn btn-primary">
          Create Workflow
        </Link>
      </header>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Workflows</p>
        </div>
        <div className="stat-card">
          <h3>{stats.active}</h3>
          <p>Active Workflows</p>
        </div>
        <div className="stat-card">
          <h3>{stats.failed}</h3>
          <p>Failed Runs</p>
        </div>
      </div>
      
      <section className="workflows-section">
        <h2>Your Workflows</h2>
        {loading ? (
          <p>Loading workflows...</p>
        ) : workflows.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any workflows yet.</p>
            <Link to="/workflows/create" className="btn btn-primary">
              Create Your First Workflow
            </Link>
          </div>
        ) : (
          <div className="workflows-list">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="workflow-card">
                <div className="workflow-header">
                  <h3>{workflow.name}</h3>
                  <span className={`status ${workflow.isActive ? 'active' : 'inactive'}`}>
                    {workflow.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="workflow-details">
                  <p>
                    <strong>Trigger:</strong> {workflow.trigger}
                  </p>
                  <p>
                    <strong>Action:</strong> {workflow.action}
                  </p>
                  {workflow.lastRun && (
                    <p>
                      <strong>Last Run:</strong> {new Date(workflow.lastRun).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="workflow-actions">
                  <Link to={`/workflows/${workflow.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;