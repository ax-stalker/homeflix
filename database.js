import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getMovies(){
    const [rows]= await pool.query("SELECT * FROM movies")
    return rows
    }

// const movies= await getMovies()
// console.log(movies)

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
    INSERT INTO movies (title)
    values(?)`,[title])
    return result.insertId
    }



// const result= await createMovie('Me Time.mp4')
// console.log(result)
