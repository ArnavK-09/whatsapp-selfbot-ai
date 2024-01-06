// Import required modules
const express = require('express');
const client = require("./index.js");

// Create an Express application
const app = express();
const port = 3001; // You can use any available port

// Define a route
app.get('/', (_, res) => {
  res.send('Hello From Whatsapp Bot!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  client.initialize()
});