import express from "express";
import { syncModels } from "./config/dbConfig";
import bodyParser from "body-parser";
import * as db from "./Models/index";
import { userRouter } from "./Routers/userRouter";
import { authRouter } from "./Routers/authRouter";
import { whishListRouter } from "./Routers/whishlistRouter";
import passport from "passport";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import { seedTables } from "./Utils/generateFake";
import cors from "cors";
import productRouter from "./Routers/productRouter";
import brandRouter from "./Routers/brandRouter";
import categoryRouter from "./Routers/categoryRouter";
import cartRouter from "./Routers/cartRouter";
import orderRouter from "./Routers/orderRouter";
import profileRouter from "./Routers/profileRouter";
import pino from "pino";
import { config } from "./config/pino";
const { collectDefaultMetrics, register } = require("prom-client");

const app = express();
const PORT = 3000;
const logger = pino({
  level: config.level || "info",
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
logger.info("Application started");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., direct requests)
      if (!origin) {
        callback(null, "*");
      } else {
        // Echo the origin back as the value for Access-Control-Allow-Origin
        callback(null, origin);
      }
    },
    credentials: true, // if you need to include credentials in requests
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use("/user", userRouter);
app.use("/auth", authRouter);
// Define routes or other middleware here
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);
app.use("/wishList", whishListRouter);
app.use("/profile", profileRouter);
app.use("/orders", orderRouter);
collectDefaultMetrics();
app.get("/metrics", (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(register.metrics());
});
// Sync models with the database
syncModels()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
//DO NOT UNCOMMENT UNLESS WE LOSE DATA!!!!!
//DONT UNCOMMENT I REPEAT!
// seedTables();
