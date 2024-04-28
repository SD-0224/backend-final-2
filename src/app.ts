import express from 'express';
import { syncModels } from './config/dbConfig';
import bodyParser from 'body-parser'
import * as db from './Models/index';
import {userRouter} from './Routers/userRouter';
import {authRouter} from "./Routers/authRouter";
import {whishListRouter} from "./Routers/whishlistRouter";
import passport from 'passport';
import path from "path";
import session from 'express-session';
import dotenv from 'dotenv'; 
dotenv.config();
import { seedTables } from './Utils/generateFake';
import cors from "cors";
import productRouter from "./Routers/productRouter"
import brandRouter from "./Routers/brandRouter"
import categoryRouter from "./Routers/categoryRouter"
import cartRouter from './Routers/cartRouter';
import orderRouter from "./Routers/orderRouter";
import pino from 'pino';
import {config} from './config/pino';
const client = require('prom-client')
import {httpRequestDurationMicroseconds} from "../dist/Utils/metric";
const app = express();
const PORT = process.env.PORT || 3000;
 const logger = pino({
  level: config.level
  || 'info',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp:pino.stdTimeFunctions.isoTime,
 });
logger.info("Application started");

// Create a Registry which registers the metrics
const register = new client.Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'ecommerce-monitoring'
});

//Enable the collection for default metric
client.collectDefaultMetrics({register});




const test = db.address;
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const viewPath=path.join(__dirname,"../views")
// app.set('view engine', "ejs");
// app.set('views', path.join(__dirname, ''));
app.use(passport.initialize());
app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, '../src/views'));

app.use('/user', userRouter); 
app.use('/auth', authRouter);

// Sign up route for authRouter
authRouter.get('/', (req, res) => {
  res.render('signUp'); 
});


// Define routes or other middleware here
app.use('/products', productRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)
app.use("/cart",cartRouter);
app.use('/wishList', whishListRouter)
// app.use('/profile', profileRoutes )
app.use('/orders', orderRouter)


//Create array of routes 
const routeNames = {
  '/metrics': 'Metrics',
  '/products': 'Product',
  '/brands': 'Brand',
  '/categories': 'Category',
  '/cart': 'Cart',
  '/wishList': 'Wishlist',
  '/orders': 'Order',
};

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)
//GEt the metric of the app
app.get('/metrics', async (req, res) => {
  try {
    const route = req.originalUrl.split("?")[0];
    const routeName = getRouteName(route); 
    // Start timing the request
    const end = httpRequestDurationMicroseconds.startTimer({ route, route_name: routeName });
    const metrics = await register.metrics();
    // Stop timing the request
    end();
    res.set('Content-Type', register.contentType);
    res.send(metrics);
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send('Error generating metrics');
  }
});

function getRouteName(route) {
  const parts = route.split('/');
  return parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : 'Unknown';
}

// Sync models with the database
syncModels()
  .then(() => {
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
//DO NOT UNCOMMENT UNLESS WE LOSE DATA!!!!!
//DONT UNCOMMENT I REPEAT!
 seedTables();
