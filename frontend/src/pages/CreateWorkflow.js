import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateWorkflow = () => {
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Available integrations
  const integrations = {
    gmail: {
      name: 'Gmail',
      triggers: [
        { value: 'gmail:new_email', label: 'New Email' }
      ],
      actions: [
        { value: 'gmail:send_email', label: 'Send Email' }
      ]
    },
    github: {
      name: 'GitHub',
      triggers: [
        { value: 'github:new_issue', label: 'New Issue' },
        { value: 'github:new_pr', label: 'New Pull Request' }
      ],
      actions: [
        { value: 'github:create_issue', label: 'Create Issue' },
        { value: 'github:comment_on_issue', label: 'Comment on Issue' }
      ]
    },
    telegram: {
      name: 'Telegram',
      triggers: [],
      actions: [
        { value: 'telegram:send_message', label: 'Send Message' }
      ]
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, this would call your API
      // For demo purposes, we'll simulate creation
      setTimeout(() => {
        alert('Workflow created successfully!');
        navigate('/workflows');
      }, 1000);
    } catch (error) {
      console.error('Error creating workflow:', error);
      alert('Failed to create workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-workflow">
      <header className="create-workflow-header">
        <h1>Create New Workflow</h1>
        <p>Connect a trigger and an action to automate your tasks</p>
      </header>
      
      <form onSubmit={handleSubmit} className="workflow-form">
        <div className="form-group">
          <label htmlFor="name">Workflow Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Email to Telegram Notifications"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Trigger</label>
          <div className="integration-grid">
            {Object.entries(integrations).map(([key, integration]) => (
              <div key={key} className="integration-section">
                <h3>{integration.name}</h3>
                {integration.triggers.map((triggerOption) => (
                  <div key={triggerOption.value} className="radio-option">
                    <input
                      type="radio"
                      id={triggerOption.value}
                      name="trigger"
                      value={triggerOption.value}
                      checked={trigger === triggerOption.value}
                      onChange={(e) => setTrigger(e.target.value)}
                      disabled={integration.triggers.length === 0}
                    />
                    <label htmlFor={triggerOption.value}>{triggerOption.label}</label>
                  </div>
                ))}
                {integration.triggers.length === 0 && (
                  <p className="no-options">No triggers available</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Action</label>
          <div className="integration-grid">
            {Object.entries(integrations).map(([key, integration]) => (
              <div key={key} className="integration-section">
                <h3>{integration.name}</h3>
                {integration.actions.map((actionOption) => (
                  <div key={actionOption.value} className="radio-option">
                    <input
                      type="radio"
                      id={actionOption.value}
                      name="action"
                      value={actionOption.value}
                      checked={action === actionOption.value}
                      onChange={(e) => setAction(e.target.value)}
                      disabled={integration.actions.length === 0}
                    />
                    <label htmlFor={actionOption.value}>{actionOption.label}</label>
                  </div>
                ))}
                {integration.actions.length === 0 && (
                  <p className="no-options">No actions available</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/workflows')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !name || !trigger || !action}
          >
            {loading ? 'Creating...' : 'Create Workflow'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkflow;