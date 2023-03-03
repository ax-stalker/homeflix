import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// create a table to store video information

async function createTable(){
    const t=await pool.query( `
    CREATE TABLE IF NOT EXISTS movies (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      url VARCHAR(255) NOT NULL,
      tags VARCHAR(255),
      category VARCHAR(255)
    );
  `)
  return;
}
const tab=await createTable()
console.log("done")

// insert a new video into the database
const movie = {
    title: 'Bensoul - Niombee (Official Music Video) For Skiza Dial *811*548#',
    description: 'Music video',
    url: 'https://www.youtube.com/embed/PN9QEk6xTa0',
    tags: 'music, gospel',
    category: 'music'
  };

  const insertMovie = `
  INSERT INTO movies (title, description, url, tags, category)
  VALUES (?, ?, ?, ?, ?)
`;
async function newMovies(){
const newMovie = await pool.query(insertMovie, [movie.title, movie.description, movie.url, movie.tags, movie.category])

    return;
  };

  const inserted= await newMovies()
  console.log("inserted");


//get all available movies
export async function getMovies(){
    const [rows]= await pool.query("SELECT * FROM movies")
    return rows
    }


const movies= await getMovies()
console.log(movies)

 





export async function getMovie(id){
    const [rows]= await pool.query(`
    SELECT * 
    FROM movies
    WHERE id =?`,[id])
    return rows[0]
    }

    // const movie= await getMovie(1)
    // console.log(movie)

export async function createMovie(title){
    const [result] = await pool.query(`
    INSERT INTO movies (title, description, url, tags, category)
    values(?,?,?,?,?)`,[title,description, url, tags, category])
    return result.insertId
    }



// const result= await createMovie('H_ART THE BAND - MILELE (Official Music Video)', 'gospel video', 'https://www.youtube.com/embed/KJwhxo6HS-c', 'music', 'gospel', 'music')
// console.log(result)
