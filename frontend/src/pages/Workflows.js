import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'GitHub Issues to Email',
          trigger: 'github:new_issue',
          action: 'gmail:send_email',
          isActive: false,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          name: 'PR Notifications',
          trigger: 'github:new_pr',
          action: 'telegram:send_message',
          isActive: true,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      
      setWorkflows(mockWorkflows);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    if (filter === 'active') return workflow.isActive;
    if (filter === 'inactive') return !workflow.isActive;
    return true;
  });

  const toggleWorkflowStatus = async (workflowId) => {
    try {
      // In a real implementation, this would call your API
      setWorkflows(workflows.map(w => 
        w.id === workflowId ? { ...w, isActive: !w.isActive } : w
      ));
    } catch (error) {
      console.error('Error toggling workflow:', error);
    }
  };

  return (
    <div className="workflows">
      <header className="workflows-header">
        <h1>Workflows</h1>
        <Link to="/workflows/create" className="btn btn-primary">
          Create Workflow
        </Link>
      </header>
      
      <div className="workflows-filter">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'inactive' ? 'active' : ''}
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </button>
      </div>
      
      {loading ? (
        <p>Loading workflows...</p>
      ) : filteredWorkflows.length === 0 ? (
        <div className="empty-state">
          <p>No workflows found.</p>
          <Link to="/workflows/create" className="btn btn-primary">
            Create Your First Workflow
          </Link>
        </div>
      ) : (
        <div className="workflows-list">
          {filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="workflow-item">
              <div className="workflow-info">
                <h3>{workflow.name}</h3>
                <p>
                  <strong>Trigger:</strong> {workflow.trigger} → <strong>Action:</strong> {workflow.action}
                </p>
                <p className="workflow-date">
                  Created: {new Date(workflow.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="workflow-actions">
                <button 
                  className={`btn ${workflow.isActive ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => toggleWorkflowStatus(workflow.id)}
                >
                  {workflow.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <Link to={`/workflows/${workflow.id}`} className="btn btn-secondary">
                  View
                </Link>
                <button className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workflows;