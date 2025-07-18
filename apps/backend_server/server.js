"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const scripts_1 = __importDefault(require("./scripts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
}));
app.get('/', (req, res) => {
    res.redirect('/scrape');
});
app.get('/ping', (req, res) => {
    res.status(200).send('Health ping');
});
app.get('/scrape', async (req, res) => {
    const url = req.query.url;
    const result = await (0, scripts_1.default)(url);
    res.status(200).send(result);
});
app.listen(PORT, () => {
    console.log('The application is listening ' + 'on port http://localhost:' + PORT);
});
