const prisma = require('../models');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create user (called during signup)
const createUser = async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId }
    });
    
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name
      }
    });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  createUser
};