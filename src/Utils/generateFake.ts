import { sequelize } from "../config/dbConfig";
import { categoriesData } from "./categoryFake";
import { brandsData } from "./brandFake";
import { imagesData } from "./imageFake";
import { reviewData } from "./reviewFake";
import { productsData } from "./productFaker";
import { fakeCartData } from "./cartItemFake";
import * as db from "../Models/index";
import { userData } from "./userFake";
import { CartData } from "./cartFake";
async function seedTables() {
  try {
    // Assuming you have defined models and their associations

    // Sync all models with the database
    await sequelize.sync({ force: true }); // Note: Use force: true for development only

    // Seed categories
    await db.category.bulkCreate(categoriesData);

    // Seed brands
    await db.brand.bulkCreate(brandsData);

    // Seed images

    // Seed products
    await db.Product.bulkCreate(productsData);
    await db.images.bulkCreate(imagesData);

    // Seed reviews
    await db.review.bulkCreate(reviewData);

    //Seed users
    await db.User.bulkCreate(userData);

    //seed carts
    await db.Cart.bulkCreate(CartData);
    //Seed cartItems
    await db.CartItem.bulkCreate(fakeCartData);

    console.log("Tables seeded successfully.");
  } catch (error) {
    console.error("Error seeding tables:", error);
  }
}

export { seedTables };
