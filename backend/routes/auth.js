const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const User = require("../models/UserSchema"); // Use your User model

// Handles both login and signup
// Login endpoint: only allows login for existing users
router.post("/login", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const idToken = authorization.split("Bearer ")[1];

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid } = decodedToken;

    // Look for the user in your database
    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      // User exists (Login)
      return res.status(200).json(user);
    } else {
      // User does not exist
      return res
        .status(404)
        .json({ error: "User not found. Please sign up first." });
    }
  } catch (error) {
    console.error("Error verifying token or logging in user:", error);
    res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
});

// Signup endpoint: only allows signup for new users
router.post("/signup", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const idToken = authorization.split("Bearer ")[1];

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Look for the user in your database
    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      // User already exists
      return res
        .status(409)
        .json({ error: "User already exists. Please log in." });
    } else {
      // User does not exist (Signup)
      const finalName = name && name.trim() ? name : email;
      const newUser = new User({
        firebaseUid: uid,
        email: email,
        name: finalName,
      });
      await newUser.save();
      return res.status(201).json(newUser); // 201 Created
    }
  } catch (error) {
    console.error("Error verifying token or signing up user:", error);
    res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
});

module.exports = router;
