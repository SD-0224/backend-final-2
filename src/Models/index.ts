// Import Sequelize and models
import { Cart } from "./cart"
import { wishList } from "./wishlist"
import { review } from "./review"
import { order } from "./order"
import { address } from "./address"
import { orderItem } from "./orderitem"
import { Product } from "./product"
import { images } from "./images"
import { brand } from "./brand"
import { category } from "./category"
import { User} from "./user"
import { payment} from "./payment"
import { CartItem } from "./cartItem"

// Define associations

//category and brand
category.hasMany(Product, { foreignKey: 'categoryID' })
brand.hasMany(Product, { foreignKey: 'brandID' })

Product.belongsTo(brand, { foreignKey: 'brandID' });
Product.belongsTo(category, { foreignKey: 'categoryID' });
//Reviews 
Product.hasMany(review, { foreignKey: 'productID' })
review.belongsTo(Product, { foreignKey: 'productID' })
//Order
order.hasMany(orderItem, { foreignKey: 'orderID' });
orderItem.belongsTo(order, { foreignKey: 'orderID' });

orderItem.belongsTo(Product, { foreignKey: 'productID' });
//address
User.hasMany(address, { foreignKey: 'userID' });
address.belongsTo(User, { foreignKey: 'userID' });
//cartItem
CartItem.hasMany(Cart, { foreignKey: 'cartID' });
CartItem.belongsTo(Product,{foreignKey: 'productID'})
Cart.belongsTo(CartItem, { foreignKey: 'cartID' });
Cart.belongsTo(Product, { foreignKey: 'productID' })
Product.hasMany(Cart, { foreignKey: 'productID' })
Product.hasMany(CartItem, { foreignKey: 'productID' });
//cart
User.hasMany(Cart, { foreignKey: 'userID' });
Cart.belongsTo(User, { foreignKey: 'userID' });

//Wishlist
User.hasMany(wishList, { foreignKey: 'userID' });
wishList.belongsTo(User, { foreignKey: 'userID' });
Product.hasMany(wishList, { foreignKey: 'productID' });
wishList.belongsTo(Product, { foreignKey: 'productID' });

//Payment
User.hasMany(payment, { foreignKey: 'userID' });
payment.belongsTo(User, { foreignKey: 'userID' });

payment.hasMany(order, { foreignKey: 'paymentID' });
order.belongsTo(payment, { foreignKey: 'paymentID' });
//Image
Product.hasMany(images, { foreignKey: 'productID' });
images.belongsTo(Product, { foreignKey: 'productID' });

//address
User.hasMany(address, { foreignKey: 'userID' })
address.belongsTo(User, { foreignKey: 'userID' })
order.belongsTo(address, { foreignKey: 'addressID' });
address.hasMany(order, { foreignKey: 'addressID' });


export { User, address, Cart, wishList,CartItem, payment,Product, order, orderItem, review, images,  brand, category};
