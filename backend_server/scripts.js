"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = Scraper;
exports.PriceGetter = PriceGetter;
const axios_1 = __importDefault(require("axios"));
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: "your API"
});
function Scraper({ api_key, url, country, product }) {
    const baseUrl = 'https://api.scrapingdog.com/google_lens';
    const params = {
        api_key: api_key,
        url: url,
        country: country,
        product_results: product ? 'true' : 'false',
    };
    axios_1.default
        .get(baseUrl, { params })
        .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.log('Request failed with status code: ' + response.status);
        }
    })
        .catch((error) => {
        console.error('Error making the request: ' + error.message);
    });
}
function PriceGetter(link) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.responses.create({
            model: "gpt-4.1",
            input: `Find and print as single number price of the product from this page ${link}`
        });
        //   console.log(response["lens_result"])
    });
}
