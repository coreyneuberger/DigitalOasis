import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalle2Routes from './routes/dalle2Routes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

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
        app.listen(8080, () => console.log('Server is running on port http://localhost:8080'))
    }catch (err){
        console.log(err);
    }
}

startServer();