import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalle2Routes from './routes/dalle2Routes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();



const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/posts', postRoutes);
app.use('/api/dalle2', dalle2Routes);

app.get('/', async (req, res) => {
    res.send('Hello Corey!');
    });

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }catch (err){
        console.log(err);
    }
}

startServer();