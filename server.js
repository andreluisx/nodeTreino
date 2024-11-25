import express from 'express'
import routes from './src/routes/postsRoute.js'
import cors from 'cors';

const app = express()

app.use(express.static('uploads'))

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
app.listen(8000, ()=>{
    console.log('server escutando...')
})

routes(app)



