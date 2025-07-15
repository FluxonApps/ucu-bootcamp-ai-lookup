"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const scripts_1 = require("./scripts");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
const API_KEY = process.env.API_KEY;
// Handling GET / Request
app.get('/', (req, res) => {
    const api_key = "";
    const country = "Ukraine";
    const url = req.query.url;
    const all_parsed_data = (0, scripts_1.Scraper)({ api_key, url, country });
    res.send("Hello");
});
// Server setup
app.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
