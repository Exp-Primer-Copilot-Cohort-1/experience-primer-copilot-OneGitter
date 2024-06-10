// create web server
const express = require('express');
const app = express();
// import data
const comments = require('./comments.json');
// create a route
app.get('/comments', (req, res) => {
    res.send(comments);
});
// start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Run the server
// $ node comments.js
// Server is running on http://localhost:3000
// Open http://localhost:3000/comments in your browser or any REST client.
