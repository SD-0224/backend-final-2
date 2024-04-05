import express from 'express';
import { sequelize, syncModels } from './config/dbConfig';
import bodyParser from 'body-parser'
import { product } from './Models/product';
import { brand } from './Models/brand';
import {address} from './Models/address';
import { user } from './Models/user';
import { wishList } from './Models/wishlist';
import { review } from './Models/review';
import { category } from './Models/category';
import { images } from './Models/images';
import { payment } from './Models/payment';
import { order } from './Models/order';
import { cart } from './Models/cart';
import { orderItem } from './Models/orderitem';
import * as db from './Models/index';


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
//DO NOT UNCOMMENT UNLESS WE LOSE DATA!!!!!
//DONT UNCOMMENT I REPEAT!
// seedTables();
