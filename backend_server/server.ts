import express from 'express';
import dotenv from 'dotenv';

import ScraperMain from './scripts'

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT);

// Handling GET / Request
app.get('/', async (req, res) => {
    const url = req.query.url as string;

    const result = await ScraperMain(url);

    res.status(200).send(result);
})

app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})
