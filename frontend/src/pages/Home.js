import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>FlowForge</h1>
        <p>Connect your apps and automate your workflow</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/workflows" className="btn btn-secondary">
            View Workflows
          </Link>
        </div>
      </header>
      
      <section className="features">
        <div className="feature">
          <h3>Automate Workflows</h3>
          <p>Create powerful automations that connect your favorite apps</p>
        </div>
        <div className="feature">
          <h3>Real-time Monitoring</h3>
          <p>Track your workflows in real-time with live updates</p>
        </div>
        <div className="feature">
          <h3>Reliable Execution</h3>
          <p>Never miss an automation with our reliable job queue</p>
        </div>
      </section>
    </div>
  );
};

export default Home;