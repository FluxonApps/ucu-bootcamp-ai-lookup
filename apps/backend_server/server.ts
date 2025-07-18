import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import ScraperMain from './scripts';
dotenv.config();

const app = express();

const PORT = Number(process.env.PORT);

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.get('/', (req, res) => {
  res.redirect('/scrape');
});

app.get('/ping', (req, res) => {
  res.status(200).send('Health ping');
});

app.get('/scrape', async (req, res) => {
  const url = req.query.url as string;
  const country = req.query.country as string;

  const result = await ScraperMain({imageUrl:url, country:country});

  res.status(200).send(result);
});

app.listen(PORT, () => {
  console.log('The application is listening ' + 'on port http://localhost:' + PORT);
});
