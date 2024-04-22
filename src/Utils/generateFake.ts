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
import slugify from "slugify";
async function seedTables() {
  try {
    // Assuming you have defined models and their associations
    // Seed categories
    await sequelize.sync({ force: true }); // Note: Use force: true for development only
    const categoryWithSLugs = categoriesData.map((categoriesData) => ({
      ...categoriesData,
      slug: slugify(categoriesData.name,{ lower: true }),
    }));
    await db.category.bulkCreate(categoryWithSLugs);
    // Seed brands
    const brandsWithSlugs = brandsData.map((brandData) => ({
      ...brandData,
      slug: slugify(brandData.name, { lower: true }),
    }));
    await db.brand.bulkCreate(brandsWithSlugs);
    // Seed images
    // Seed products
    const productsWithSlugs = productsData.map((productsData) => ({
      ...productsData,
      slug: slugify(productsData.title, { lower: true }),
    }));
    await db.Product.bulkCreate(productsWithSlugs);
    await db.images.bulkCreate(imagesData);
    await db.User.bulkCreate(userData);
    // Seed reviews
    await db.review.bulkCreate(reviewData);

    //Seed users
    await db.User.bulkCreate(userData);

    //seed carts
    await db.Cart.bulkCreate(CartData);
    //Seed cartItems
    await db.CartItem.bulkCreate(fakeCartData);

    console.log('Tables seeded successfully.');
  } catch (error) {
    console.error("Error seeding tables:", error);
  }
}

export { seedTables };
