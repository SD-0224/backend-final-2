import { sequelize } from "../config/dbConfig";
import { categoriesData } from "./categoryFake";
import { brandsData } from "./brandFake";
import { imagesData } from "./imageFake";
import { reviewData } from "./reviewFake";
import { productsData } from "./productFaker";
import { fakeCartData } from "./cartItemFake";
import { userData } from "./userFake";
import * as db from "../Models/index";
import { CartData } from "./cartFake";

async function seedTables() {
  try {
    // Assuming you have defined models and their associations
    // Seed categories
    await sequelize.sync({ force: true }); // Note: Use force: true for development only

    await db.category.bulkCreate(categoriesData);
    // Seed brands
    await db.brand.bulkCreate(brandsData);
    // Seed images
    // Seed products
    await db.Product.bulkCreate(productsData);
    await db.images.bulkCreate(imagesData);
    await db.User.bulkCreate(userData);

    //Seed users
    await db.User.bulkCreate(userData);

    // Seed reviews
    await db.review.bulkCreate(reviewData);

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
