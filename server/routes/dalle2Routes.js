import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res) => {
    res.send('Hello from Dalle!');
});

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;
        
        const response = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const img = response.data.data[0].b64_json;

        res.status(200).json({ image: img });
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
})
export default router;