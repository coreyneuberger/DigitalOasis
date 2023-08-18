import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalle2Routes from './routes/dalle2Routes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://digital-oasis.vercel.app'
}));
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