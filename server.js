// Import required modules
const express = require('express');
const client = require("./index.js");

// Create an Express application
const app = express();
const port = 3000; // You can use any available port

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
client.initialize()
});