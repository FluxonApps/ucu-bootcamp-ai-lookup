import express from 'express';
import dotenv from 'dotenv';

import {Scraper, PriceGetter} from './scripts'

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT);
const API_KEY = process.env.API_KEY;

// Handling GET / Request
app.get('/', (req, res) => {
    const url = req.query.url as string;
    // call the main Scrape function
    res.status(200).send("Hello");
})

app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})
