import axios from 'axios';

type ScraperProps = {
  api_key: string;
  url: string;
  country: string;
  product?: boolean;
};

export default function Scraper({ api_key, url, country, product }: ScraperProps) {
  const baseUrl = 'https://api.scrapingdog.com/google_lens';
  const params: any = {
    api_key,
    url,
    country,
    product_results: product ? 'true' : 'false',
  };
  axios
    .get(baseUrl, { params })
    .then((response: any) => {
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log('Request failed with status code: ' + response.status);
      }
    })
    .catch((error: any) => {
      console.error('Error making the request: ' + error.message);
    });
}
