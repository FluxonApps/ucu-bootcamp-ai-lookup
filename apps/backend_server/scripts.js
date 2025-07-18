"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = Scraper;
exports.aiLookup = aiLookup;
exports.default = ScraperMain;
/* eslint-disable prettier/prettier */
const axios_1 = __importDefault(require("axios"));
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const priceCourse = {
    uah: 1,
    usd: 42,
    eur: 45,
    pln: 11,
    gbp: 56,
    cny: 6,
    jpy: 0.3,
};
const client = new openai_1.default({
    apiKey: process.env.OPEN_AI_API_KEY,
});
async function Scraper({ api_key, url, country, product }) {
    const baseUrl = 'https://api.scrapingdog.com/google_lens';
    const params = {
        api_key,
        url,
        country,
        product_results: product ? 'true' : 'false',
    };
    try {
        const response = await axios_1.default.get(baseUrl, { params });
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.log('Request failed with status code: ' + response.status);
            return null;
        }
    }
    catch (error) {
        console.error('Error making the request: ' + error.message);
        return null;
    }
}
function splitIntoBatches({ array, batchSize = 3 }) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
        const batch = array.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
async function aiLookup({ urlBatches, }) {
    const results = [];
    for (const urlBatch of urlBatches) {
        const response = await client.responses.create({
            model: 'gpt-4.1',
            input: 'For each of the following links, return the price as a plain integer with no text or formatting. Output in this format: [{amount: 19900, currency: eur}, {amount: 29900, currency: usd}, {amount: 39900, currency: uah}].Use double quotes for all keys and string values. Do not include any explanation or extra text. Links: ' +
                urlBatch.join(', '),
        });
        const text = response.output_text;
        try {
            const jsonMatch = text.match(/\[.*\]/s);
            const parsed = JSON.parse((jsonMatch === null || jsonMatch === void 0 ? void 0 : jsonMatch[0]) || '[]');
            parsed.forEach((priceObj, index) => {
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
        }
        catch (err) {
            console.error('Failed to parse prices:', err);
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
async function ScraperMain({ imageUrl, country }) {
    var _a;
    const parserApiKey = process.env.SCRAPINGDOG_API_KEY;
    const scraperResponse = await Scraper({
        api_key: parserApiKey,
        url: imageUrl,
        country: country,
        product: true,
    });
    const lensResults = (_a = scraperResponse === null || scraperResponse === void 0 ? void 0 : scraperResponse.lens_results) === null || _a === void 0 ? void 0 : _a.slice(0, 8);
    const pureLinks = lensResults === null || lensResults === void 0 ? void 0 : lensResults.map((item) => item.link);
    const batches = splitIntoBatches({ array: pureLinks !== null && pureLinks !== void 0 ? pureLinks : [], batchSize: 3 });
    const aiResults = await aiLookup({
        urlBatches: batches,
        sortParameter: 'price',
    });
    aiResults.forEach((item, index) => {
        var _a, _b;
        item['image_url'] = ((_a = lensResults === null || lensResults === void 0 ? void 0 : lensResults[index]) === null || _a === void 0 ? void 0 : _a.thumbnail) || '';
        item['title'] = ((_b = lensResults === null || lensResults === void 0 ? void 0 : lensResults[index]) === null || _b === void 0 ? void 0 : _b.title) || '';
    });
    aiResults.sort((a, b) => {
        if (a.price === null || b.price === null || a.currency === null || b.currency === null) {
            return 0;
        }
        const aRate = priceCourse[a.currency];
        const aPriceInUah = a.price * aRate;
        const bRate = priceCourse[b.currency];
        const bPriceInUah = b.price * bRate;
        return aPriceInUah - bPriceInUah;
    });
    return { similarListings: aiResults };
}
