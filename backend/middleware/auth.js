const jwt = require('jsonwebtoken');

// Mock authentication middleware (to be replaced with Clerk)
const authenticate = async (req, res, next) => {
  try {
    // In a real implementation, we would verify the Clerk JWT token
    // For now, we'll simulate authentication
    
    // Extract token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // In a real app, we would verify the token with Clerk
    // const session = await clerkClient.verifyToken(token);
    // req.auth = { userId: session.userId };
    
    // For demo purposes, we'll simulate a user ID
    req.auth = { userId: 'user_123' }; // This would come from the verified token
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };