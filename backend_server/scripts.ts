import axios from 'axios';
import OpenAI from "openai";

type ScraperProps = {
  api_key: string;
  url: string;
  country: string;
  product?: boolean;
};

const client = new OpenAI({
  apiKey: "your API"
});

export function Scraper({ api_key, url, country, product }: ScraperProps) {
  const baseUrl = 'https://api.scrapingdog.com/google_lens';
  const params: any = {
    api_key: api_key,
    url: url,
    country: country,
    product_results: product ? 'true' : 'false',
  };
  axios
    .get(baseUrl, { params })
    .then((response: any) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log('Request failed with status code: ' + response.status);
      }
    })
    .catch((error: any) => {
      console.error('Error making the request: ' + error.message);
    });
}

export async function PriceGetter(link:string) {
  const response = await client.responses.create({
    model:"gpt-4.1",
    input:`Find and print as single number price of the product from this page ${link}`
  })
//   console.log(response["lens_result"])
}
