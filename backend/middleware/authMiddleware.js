// middleware/authMiddleware.js
const admin = require('firebase-admin');
const User = require('../models/UserSchema'); // Use the correct User model

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: No token provided.' });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    // 1. Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      return res.status(403).send({ message: 'Forbidden: Invalid token.' });
    }

    // 2. Check if the UID belongs to a user in your DB
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      // This case is important: the token is valid, but the user is not in our system.
      return res.status(403).send({ message: 'Forbidden: User not registered in our system.' });
    }

    // 3. Attach the MongoDB user object to the request
    req.user = user;

    next(); // Token is valid, user exists, proceed to the next function.
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(403).send({ message: 'Forbidden: Invalid token or server error.' });
  }
};

module.exports = authMiddleware;