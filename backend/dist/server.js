"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const complaintRoutes_1 = __importDefault(require("./routes/complaintRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:3000", credentials: true }));
app.get("/", (req, res) => {
    res.send(`Server is running at ${process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : `http://localhost:${PORT}`}`);
});
//* Endpoints API
app.use("/api/complaints", complaintRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
//* Error handler
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server up and running at ${process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : `http://localhost:${PORT}`}`);
});
