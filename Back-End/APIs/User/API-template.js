const express = require('express');
const router = express.Router();

// Define a route for the router
router.get('/', (req, res) => {
  res.send('Hello from the router!');
});

// Export the router
module.exports = router;
