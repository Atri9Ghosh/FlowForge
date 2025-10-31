const express = require('express');
const router = express.Router();
const {
  getWorkflows,
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  toggleWorkflow
} = require('../controllers/workflowController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all workflows
router.get('/', getWorkflows);

// Get a specific workflow
router.get('/:id', getWorkflow);

// Create a new workflow
router.post('/', createWorkflow);

// Update a workflow
router.put('/:id', updateWorkflow);

// Delete a workflow
router.delete('/:id', deleteWorkflow);

// Toggle workflow active status
router.patch('/:id/toggle', toggleWorkflow);

module.exports = router;