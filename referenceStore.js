import mysql from 'mysql2'

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

// create a table to store video information
const createTable = `
  CREATE TABLE IF NOT EXISTS videos (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    tags VARCHAR(255),
    category VARCHAR(255)
  )
`;

// execute the create table query
connection.query(createTable, (err, results) => {
  if (err) {
    console.error('Error creating table: ' + err.stack);
    return;
  }
  console.log('Table created successfully');
});

// insert a new video into the database
const video = {
  title: 'Kranium - Can&#39;t Believe ft. Ty Dolla $ign &amp; WizKid (Dance Video)',
  description: 'Dance version',
  url: 'https://example.com/sample.mp4',
  tags: 'sample, testing',
  category: 'testing'
};

const insertVideo = `
  INSERT INTO videos (title, description, url, tags, category)
  VALUES (?, ?, ?, ?, ?)
`;

connection.query(insertVideo, [video.title, video.description, video.url, video.tags, video.category], (err, results) => {
  if (err) {
    console.error('Error inserting video: ' + err.stack);
    return;
  }
  console.log('Video inserted successfully with ID: ' + results.insertId);
});

// select all videos from the database
const selectVideos = `
  SELECT * FROM videos
`;

connection.query(selectVideos, (err, results) => {
  if (err) {
    console.error('Error selecting videos: ' + err.stack);
    return;
  }
  console.log('Videos retrieved successfully');
  console.log(results);
});

// close the database connection
connection.end((err) => {
  if (err) {
    console.error('Error closing database connection: ' + err.stack);
    return;
  }
  console.log('Database connection closed');
});
