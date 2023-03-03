import mysql from 'mysql2'
import express from 'express'

const app = express();

// create a connection to the database
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with ID: ' + connection.threadId);
});

// create a route to display all videos
app.get('/videos', (req, res) => {
  const selectVideos = `
    SELECT * FROM videos
  `;
  
  connection.query(selectVideos, (err, results) => {
    if (err) {
      console.error('Error selecting videos: ' + err.stack);
      return;
    }
    console.log('Videos retrieved successfully');
    const videos = results;
    res.send(`
      <html>
        <head>
          <title>Video Platform</title>
        </head>
        <body>
          <h1>Videos</h1>
          <ul>
            ${videos.map((video) => `<li><a href="${video.url}">${video.title}</a></li>`).join('')}
          </ul>
        </body>
      </html>
    `);
  });
});

// start the server
app.listen(7000, () => {
  console.log('Server started on port 7000');
});
