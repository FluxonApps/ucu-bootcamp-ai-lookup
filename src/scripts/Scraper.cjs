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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = Scraper;
exports.aiLookup = aiLookup;
exports.default = ScraperMain;
/* eslint-disable prettier/prettier */
var axios_1 = require("axios");
var openai_1 = require("openai");
require("dotenv/config");
var priceCourse = {
    uah: 1,
    usd: 42,
    eur: 45,
    pln: 11,
    gbp: 56,
    cny: 6,
    jpy: 0.3,
};
var client = new openai_1.default({
    apiKey: process.env.OPEN_AI_API_KEY,
});
function Scraper(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var baseUrl, params, response, error_1;
        var api_key = _b.api_key, url = _b.url, country = _b.country, product = _b.product;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    baseUrl = 'https://api.scrapingdog.com/google_lens';
                    params = {
                        api_key: api_key,
                        url: url,
                        country: country,
                        product_results: product ? 'true' : 'false',
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(baseUrl, { params: params })];
                case 2:
                    response = _c.sent();
                    if (response.status === 200) {
                        return [2 /*return*/, response.data];
                    }
                    else {
                        console.log('Request failed with status code: ' + response.status);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.error('Error making the request: ' + error_1.message);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function splitIntoBatches(_a) {
    var array = _a.array, _b = _a.batchSize, batchSize = _b === void 0 ? 3 : _b;
    var batches = [];
    for (var i = 0; i < array.length; i += batchSize) {
        var batch = array.slice(i, i + batchSize);
        batches.push(batch);
    }
    return batches;
}
function aiLookup(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var results, _loop_1, _i, urlBatches_1, urlBatch;
        var urlBatches = _b.urlBatches;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    results = [];
                    _loop_1 = function (urlBatch) {
                        var response, text, jsonMatch, parsed;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, client.responses.create({
                                        model: 'gpt-4.1',
                                        input: 'For each of the following links, return the price as a plain integer with no text or formatting. Output in this format: [{amount: 19900, currency: eur}, {amount: 29900, currency: usd}, {amount: 39900, currency: uah}].Use double quotes for all keys and string values. Do not include any explanation or extra text. Links: ' +
                                            urlBatch.join(', '),
                                    })];
                                case 1:
                                    response = _d.sent();
                                    text = response.output_text;
                                    console.log('Raw response:', text);
                                    try {
                                        jsonMatch = text.match(/\[.*\]/s);
                                        parsed = JSON.parse((jsonMatch === null || jsonMatch === void 0 ? void 0 : jsonMatch[0]) || '[]');
                                        parsed.forEach(function (priceObj, index) {
                                            var url = urlBatch[index];
                                            if (!url) {
                                                return;
                                            }
                                            results.push({
                                                url: url,
                                                price: priceObj.amount,
                                                currency: priceObj.currency,
                                                name_of_website: new URL(url).hostname,
                                            });
                                            return undefined;
                                        });
                                    }
                                    catch (err) {
                                        console.error('Failed to parse prices:', err);
                                        urlBatch.forEach(function (url) {
                                            results.push({
                                                url: url,
                                                price: null,
                                                currency: null,
                                                name_of_website: new URL(url).hostname,
                                            });
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, urlBatches_1 = urlBatches;
                    _c.label = 1;
                case 1:
                    if (!(_i < urlBatches_1.length)) return [3 /*break*/, 4];
                    urlBatch = urlBatches_1[_i];
                    return [5 /*yield**/, _loop_1(urlBatch)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
function ScraperMain(imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var parserApiKey, scraperResponse, lensResults, pureLinks, batches, aiResults;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parserApiKey = process.env.SCRAPINGDOG_API_KEY;
                    return [4 /*yield*/, Scraper({ api_key: parserApiKey, url: imageUrl, country: 'ua', product: true })];
                case 1:
                    scraperResponse = _b.sent();
                    lensResults = (_a = scraperResponse === null || scraperResponse === void 0 ? void 0 : scraperResponse.lens_results) === null || _a === void 0 ? void 0 : _a.slice(0, 8);
                    pureLinks = lensResults === null || lensResults === void 0 ? void 0 : lensResults.map(function (item) { return item.link; });
                    batches = splitIntoBatches({ array: pureLinks !== null && pureLinks !== void 0 ? pureLinks : [], batchSize: 3 });
                    return [4 /*yield*/, aiLookup({ urlBatches: batches, sortParameter: 'price' })];
                case 2:
                    aiResults = _b.sent();
                    aiResults.forEach(function (item, index) {
                        var _a;
                        item['title'] = ((_a = lensResults === null || lensResults === void 0 ? void 0 : lensResults[index]) === null || _a === void 0 ? void 0 : _a.title) || '';
                    });
                    aiResults.sort(function (a, b) {
                        if (a.price === null || b.price === null || a.currency === null || b.currency === null) {
                            return 0;
                        }
                        var aRate = priceCourse[a.currency];
                        var aPriceInUah = a.price * aRate;
                        var bRate = priceCourse[b.currency];
                        var bPriceInUah = b.price * bRate;
                        return aPriceInUah - bPriceInUah;
                    });
                    return [2 /*return*/, { similarListings: aiResults }];
            }
        });
    });
}
// test call
// (async () => {
//   const imageUrl =
//     'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkrbe3LSy-EAQYMa_BR1x0SU4FOKskVEk-epTJTUve6XU5s3d0VGWNtkHboVYk9kszrM4SAxegOmbjKmXuOn-GGlqaB4U1KbB22mhsOMwK8G5JIbC3chBWP10';
//   const result = await ScraperMain(imageUrl);
//   //   console.log('Final Result:', result);
// })();
