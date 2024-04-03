// // Import Sequelize and models
// import { CartModel } from "./cart"
// import { WishlistModel } from "./wishlist"
// import { ReviewModel } from "./review"
// import { OrderModel } from "./order"
// import { AddressModel } from "./address"
// import { OrderItemModel } from "./orderitem"
// import { ProductModel } from "./product"
// import { ImageModel } from "./images"
// import { BrandModel } from "./brand"
// import { CategoryModel } from "./category"
// import { UserModel} from "./user"
// import { PaymentModel} from "./payment"

// // Define associations

// //Category and Brand
// CategoryModel.hasMany(ProductModel, { foreignKey: 'categoryID' })
// BrandModel.hasMany(ProductModel, { foreignKey: 'brandID' })

// ProductModel.belongsTo(BrandModel, { foreignKey: 'brandID' });
// ProductModel.belongsTo(CategoryModel, { foreignKey: 'categoryID' });
// //Reviews 
// ProductModel.hasMany(ReviewModel, { foreignKey: 'productID' })
// ReviewModel.belongsTo(ProductModel, { foreignKey: 'productID' })
// //Order
// OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderID' });
// OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderID' });

// OrderItemModel.belongsTo(ProductModel, { foreignKey: 'productID' });
// //Address
// UserModel.hasMany(AddressModel, { foreignKey: 'userID' });
// AddressModel.belongsTo(UserModel, { foreignKey: 'userID' });
// //Cart
// UserModel.hasMany(CartModel, { foreignKey: 'userID' });
// CartModel.belongsTo(UserModel, { foreignKey: 'userID' });
// CartModel.belongsTo(ProductModel, { foreignKey: 'productID' })
// ProductModel.hasMany(CartModel, { foreignKey: 'productID' })
// //Wishlist
// UserModel.hasMany(WishlistModel, { foreignKey: 'userID' });
// WishlistModel.belongsTo(UserModel, { foreignKey: 'userID' });
// ProductModel.hasMany(WishlistModel, { foreignKey: 'productID' });
// WishlistModel.belongsTo(ProductModel, { foreignKey: 'productID' });

// //Payment
// UserModel.hasMany(PaymentModel, { foreignKey: 'userID' });
// PaymentModel.belongsTo(UserModel, { foreignKey: 'userID' });

// PaymentModel.hasMany(OrderModel, { foreignKey: 'paymentID' });
// OrderModel.belongsTo(PaymentModel, { foreignKey: 'paymentID' });
// //Image
// ProductModel.hasMany(ImageModel, { foreignKey: 'productID' });
// ImageModel.belongsTo(ProductModel, { foreignKey: 'productID' });

// //Address
// UserModel.hasMany(AddressModel, { foreignKey: 'userID' })
// AddressModel.belongsTo(UserModel, { foreignKey: 'userID' })
// OrderModel.belongsTo(AddressModel, { foreignKey: 'addressID' });
// AddressModel.hasMany(OrderModel, { foreignKey: 'addressID' });
// // Export models
// export { UserModel, AddressModel, CartModel, WishlistModel, PaymentModel,ProductModel, OrderModel, OrderItemModel, ReviewModel, ImageModel,  BrandModel, CategoryModel};
