"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const config_1 = __importDefault(require("./db/config"));
dotenv_1.default.config();
(0, config_1.default)();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/auth', auth_1.default);
app.use('', user_1.default);
app.use((err, req, res, next) => {
    if (res.headersSent) {
        console.error('Headers already sent:', err);
        return next(err);
    }
    console.error('Unhandled error:', err);
    res
        .status(err.status || 500)
        .json({ message: err.message || 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Server start http://localhost:${port}`);
});
