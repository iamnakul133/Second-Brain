const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + ".md";
    cb(null, uniqueFilename);
  },
});

// Create the multer middleware
const upload = multer({ storage: storage });

module.exports = upload;

//upload route content

// const express = require('express');
// const upload = require('./multerConfig');
// const fs = require('fs');
// const app = express();
// const { Pool } = require('pg');

// // Create a PostgreSQL pool
// const pool = new Pool({
//   user: 'your_username',
//   host: 'your_host',
//   database: 'your_database',
//   password: 'your_password',
//   port: 5432 // Adjust the port as per your PostgreSQL configuration
// });

// // Handle form submission
// app.post('/upload', upload.single('content'), (req, res) => {
//   // Get the data from the request body
//   const { title, description, user_id } = req.body;

//   // Get the stored file path
//   const filePath = req.file.path;

//   // Generate a unique file name
//   const fileName = uuidv4() + '.md';

//   // Rename the file
//   fs.renameSync(filePath, 'public/uploads/' + fileName);

//   // Construct the link to the document
//   const contentLink = '/uploads/' + fileName;

//   // Store the link and other post details in the database
//   const query = 'INSERT INTO posts (title, description, content_link, user_id) VALUES ($1, $2, $3, $4)';
//   const values = [title, description, contentLink, user_id];

//   pool.query(query, values, (error, result) => {
//     if (error) {
//       console.error('Error inserting post into database:', error);
//       // Handle the error accordingly
//       return res.status(500).send('Internal Server Error');
//     }

//     // Redirect or respond to the user
//     res.redirect('/success');
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
