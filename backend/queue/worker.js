const { Worker } = require('bullmq');
const redis = require('redis');
const prisma = require('../models');
const { processWorkflow } = require('../services/workflowService');

// Redis connection
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined
};

// Create worker
const worker = new Worker('workflowQueue', async (job) => {
  const { workflowId } = job.data;
  
  try {
    // Update run status to pending
    const run = await prisma.workflowRun.create({
      data: {
        workflowId,
        status: 'pending',
        logs: 'Starting workflow execution...'
      }
    });
    
    // Process the workflow
    const result = await processWorkflow(workflowId, run.id);
    
    // Update run status
    await prisma.workflowRun.update({
      where: { id: run.id },
      data: {
        status: result.success ? 'success' : 'failed',
        logs: result.logs,
        endedAt: new Date()
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error processing workflow:', error);
    
    // Update run status to failed
    await prisma.workflowRun.create({
      data: {
        workflowId,
        status: 'failed',
        logs: error.message || 'Unknown error occurred'
      }
    });
    
    throw error;
  }
}, { 
  connection: redisConnection,
  concurrency: 5 // Process up to 5 jobs concurrently
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

console.log('Worker started and listening for jobs...');

module.exports = worker;