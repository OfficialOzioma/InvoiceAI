import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import "./src/database/index.js"; // Initialize Sutando ORM
import routes from "./src/routes/index.js";
import { checkAuth } from "./src/middleware/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'invoice-ai-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, 
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(checkAuth);

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
