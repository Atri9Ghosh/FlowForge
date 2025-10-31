const prisma = require('../models');

// Get all workflows for a user
const getWorkflows = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const workflows = await prisma.workflow.findMany({
      where: { userId },
      include: {
        runs: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json(workflows);
  } catch (error) {
    console.error('Error fetching workflows:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific workflow
const getWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;
    
    const workflow = await prisma.workflow.findUnique({
      where: { 
        id,
        userId
      },
      include: {
        runs: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    
    res.status(200).json(workflow);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new workflow
const createWorkflow = async (req, res) => {
  try {
    const { name, trigger, action, cron } = req.body;
    const userId = req.auth.userId;
    
    const workflow = await prisma.workflow.create({
      data: {
        name,
        trigger,
        action,
        cron,
        userId
      }
    });
    
    res.status(201).json(workflow);
  } catch (error) {
    console.error('Error creating workflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a workflow
const updateWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, trigger, action, cron, isActive } = req.body;
    const userId = req.auth.userId;
    
    const workflow = await prisma.workflow.update({
      where: { 
        id,
        userId
      },
      data: {
        name,
        trigger,
        action,
        cron,
        isActive
      }
    });
    
    res.status(200).json(workflow);
  } catch (error) {
    console.error('Error updating workflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a workflow
const deleteWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;
    
    await prisma.workflow.delete({
      where: { 
        id,
        userId
      }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting workflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Toggle workflow active status
const toggleWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;
    
    const workflow = await prisma.workflow.findUnique({
      where: { 
        id,
        userId
      }
    });
    
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    
    const updatedWorkflow = await prisma.workflow.update({
      where: { id },
      data: {
        isActive: !workflow.isActive
      }
    });
    
    res.status(200).json(updatedWorkflow);
  } catch (error) {
    console.error('Error toggling workflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getWorkflows,
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  toggleWorkflow
};