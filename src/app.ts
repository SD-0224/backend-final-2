import express from 'express';
import { syncModels } from './config/dbConfig';
import bodyParser from 'body-parser'
import * as db from './Models/index';
import { seedTables } from './Utils/generateFake';
import productRouter from "./Routers/productRouter"
import brandRouter from "./Routers/brandRouter"
import categoryRouter from "./Routers/categoryRouter"

const app = express();
const PORT = process.env.PORT || 3000;
const test = db.address;
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Define routes or other middleware here
app.use('/products', productRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)

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
seedTables();
