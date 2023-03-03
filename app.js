import express from 'express'

import { getMovies, getMovie, createMovie  } from './database.js'

const app =express()

app.use(express.json())

app.get("/movies", async (req, res)=>{
   const movies= await getMovies()
    res.send(movies)
})

app.get("/movies/:id", async (req, res)=>{
    const id =req.params.id
    const movie= await getMovie(id)
     res.send(movie)
 })
app.post("/movies", async (req,res)=>{
    const{title}=req.body
    const movie =await createMovie(title)
    res.status(201).send(movie)

})





app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})