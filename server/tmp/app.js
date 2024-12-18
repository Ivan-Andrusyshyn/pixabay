"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const user_1 = __importDefault(require("./routes/user"));
const config_2 = __importDefault(require("./db/config"));
dotenv_1.default.config();
(0, config_2.default)();
const app = (0, express_1.default)();
const port = 3000;
config_1.pool.connect();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    res.send('Hello From Express and Typescirpt');
});
app.use('', user_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
