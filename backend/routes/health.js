const express = require("express");
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint to verify the API is running
 * @access  Public
 * @returns {HTML} Simple HTML response indicating API status
 */
router.get("/", (req, res) => {
  res.send(" <h2> Communets-E-commerce Admin backend Working ✅ </h2>");
});

/**
 * TODO: Consider enhancing the health check with:
 * - Database connection status
 * - API version information
 * - Environment information
 * - System metrics (memory usage, uptime)
 */

module.exports = router;
    