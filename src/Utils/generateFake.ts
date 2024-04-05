import { sequelize } from "../config/dbConfig";
import { categoriesData } from "./categoryFake";
import { brandsData } from "./brandFake";
import { imagesData } from "./imageFake";
import { reviewData } from "./reviewFake";
import { productsData } from "./productFaker";
import * as db from "../Models/index";
async function seedTables(
) {
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
    await db.product.bulkCreate(productsData);
    await db.images.bulkCreate(imagesData);

    // Seed reviews
    await db.review.bulkCreate(reviewData);
  
    console.log('Tables seeded successfully.');
  } catch (error) {
    console.error('Error seeding tables:', error);
  }
}

export { seedTables };
