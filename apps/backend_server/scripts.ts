/* eslint-disable prettier/prettier */
import axios from "axios";
import OpenAI from "openai";
import "dotenv/config";

type ScraperProps = {
    api_key: string;
    url: string;
    country: string;
    product?: boolean;
};

type SingleScraperResponse = {
    position: number;
    title: string;
    source: string;
    source_favicon: string;
    link: string;
    thumbnail: string;
};

type ScraperResponse = {
    lens_results: SingleScraperResponse[] | null;
};

type PriceInfo = {
    amount: number;
    currency: string;
};

type ResultItem = {
    url: string;
    price: number | null;
    currency: string | null;
    name_of_website: string;
    image_url?: string;
    title?: string;
};
type CurrencyCode = keyof typeof priceCourse;

type MainResult = {
    similarListings: ResultItem[];
};
const priceCourse = {
    uah: 1,
    usd: 42,
    eur: 45,
    pln: 11,
    gbp: 56,
    cny: 6,
    jpy: 0.3,
};

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY!,
});

export async function Scraper({
    api_key,
    url,
    country,
    product,
}: ScraperProps): Promise<ScraperResponse | null> {
    const baseUrl = "https://api.scrapingdog.com/google_lens";
    const params = {
        api_key,
        url,
        country,
        product_results: product ? "true" : "false",
    };

    try {
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Request failed with status code: " + response.status);

            return null;
        }
    } catch (error: any) {
        console.error("Error making the request: " + error.message);

        return null;
    }
}

function splitIntoBatches({
    array,
    batchSize = 3,
}: {
    array: string[];
    batchSize?: number;
}): string[][] {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
        const batch = array.slice(i, i + batchSize);
        batches.push(batch);
    }

    return batches;
}

export async function aiLookup({
    urlBatches,
}: {
    urlBatches: string[][];
    sortParameter?: string;
}): Promise<ResultItem[]> {
    const results: ResultItem[] = [];

    for (const urlBatch of urlBatches) {
        const response = await client.responses.create({
            model: "gpt-4.1",
            input:
                "For each of the following links, return the price as a plain integer with no text or formatting. Output in this format: [{amount: 19900, currency: eur}, {amount: 29900, currency: usd}, {amount: 39900, currency: uah}].Use double quotes for all keys and string values. Do not include any explanation or extra text. Links: " +
                urlBatch.join(", "),
        });

        const text = response.output_text;

        try {
            const jsonMatch = text.match(/\[.*\]/s);
            const parsed = JSON.parse(jsonMatch?.[0] || "[]");
            parsed.forEach((priceObj: PriceInfo, index: number) => {
                const url = urlBatch[index];
                if (!url) {
                    return;
                }

                results.push({
                    url,
                    price: priceObj.amount,
                    currency: priceObj.currency,
                    name_of_website: new URL(url).hostname,
                });

                return undefined;
            });
        } catch (err) {
            console.error("Failed to parse prices:", err);
            urlBatch.forEach((url) => {
                results.push({
                    url,
                    price: null,
                    currency: null,
                    name_of_website: new URL(url).hostname,
                });
            });
        }
    }

    return results;
}

export default async function ScraperMain(
    imageUrl: string
): Promise<MainResult> {
    const parserApiKey = process.env.SCRAPINGDOG_API_KEY!;
    const scraperResponse = await Scraper({
        api_key: parserApiKey,
        url: imageUrl,
        country: "ua",
        product: true,
    });

    const lensResults = scraperResponse?.lens_results?.slice(0, 8);
    const pureLinks = lensResults?.map((item) => item.link);
    const batches = splitIntoBatches({ array: pureLinks ?? [], batchSize: 3 });
    const aiResults = await aiLookup({
        urlBatches: batches,
        sortParameter: "price",
    });

    aiResults.forEach((item, index) => {
        item["image_url"] = lensResults?.[index]?.thumbnail || "";
        item["title"] = lensResults?.[index]?.title || "";
    });
    aiResults.sort((a, b) => {
        if (
            a.price === null ||
            b.price === null ||
            a.currency === null ||
            b.currency === null
        ) {
            return 0;
        }

        const aRate = priceCourse[a.currency as CurrencyCode];
        const aPriceInUah = a.price! * aRate;
        const bRate = priceCourse[b.currency as CurrencyCode];
        const bPriceInUah = b.price! * bRate;

        return aPriceInUah - bPriceInUah;
    });

    return { similarListings: aiResults };
}
// test call
// (async () => {
//   const imageUrl =
//     'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkrbe3LSy-EAQYMa_BR1x0SU4FOKskVEk-epTJTUve6XU5s3d0VGWNtkHboVYk9kszrM4SAxegOmbjKmXuOn-GGlqaB4U1KbB22mhsOMwK8G5JIbC3chBWP10';
//   const result = await ScraperMain(imageUrl);
//   //   console.log('Final Result:', result);
// })();
