import express from 'express';
import { sequelize, syncModels } from './config/dbConfig';
import bodyParser from 'body-parser'
import { product } from './models/product';
import { brand } from './models/brand';
import {address} from './models/address';
import { user } from './models/user';
import { wishList } from './models/wishlist';
import { review } from './models/review';
import { category } from './models/category';
import { images } from './models/images';
import { payment } from './models/payment';
import { order } from './models/order';
import { cart } from './models/cart';
import { orderItem } from './models/orderitem';
import * as db from './models/index';


const app = express();
const PORT = process.env.PORT || 3000;
const test = db.address;
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Define routes or other middleware here
// app.use('/products', productRoutes)
// app.use('/cart', cartRoutes )
// app.use('/wishList', wishListRoutes)
// app.use('/profile', profileRoutes )
// app.use('/orders', orderRoutes)
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
