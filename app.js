import express from 'express'

import { getMovies, getMovie, createMovie  } from './database.js'

const app =express()

app.use(express.json())

app.get("/movies", async (req, res)=>{
   const movies= await getMovies()
    //res.send(movies)
    res.send(`
    <html>
      <head>
        <title>Video Platform</title>
        <style>
        </style>
      </head>
      
      <body>
        <h1>Videos</h1>
        <ul>
          ${movies.map((movie) => `<li><a href="${movie.id}">${movie.title}</a></li>`).join('')}
          
        </ul>
        <div>
        ${movies.map((movie) => `<iframe width="1017" height="572" src="${movie.url}" 
        title="${movie.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>`).join('')}
</div>
        
  
      </body>
    </html>
  `);
    
})

app.get("/movies/:id", async (req, res)=>{
    const id =req.params.id
    const movie= await getMovie(id)
     res.send(movie)
 })
app.post("/movies", async (req,res)=>{
    const{title,description, url, tags, category}=req.body
    const movie =await createMovie(title, description, url, tags, category)
    res.status(201).send(movie)

})





app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})