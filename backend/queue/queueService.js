const { Queue } = require('bullmq');
const redis = require('redis');

// Redis connection
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined
};

// Create queue
const workflowQueue = new Queue('workflowQueue', { 
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});

// Add workflow to queue
const addWorkflowToQueue = async (workflowId) => {
  const job = await workflowQueue.add('processWorkflow', {
    workflowId
  }, {
    jobId: `workflow-${workflowId}-${Date.now()}`
  });
  
  return job;
};

// Get queue status
const getQueueStatus = async () => {
  const waiting = await workflowQueue.getWaiting();
  const active = await workflowQueue.getActive();
  const completed = await workflowQueue.getCompleted();
  const failed = await workflowQueue.getFailed();
  
  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length
  };
};

module.exports = {
  workflowQueue,
  addWorkflowToQueue,
  getQueueStatus
};