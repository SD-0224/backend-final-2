// Import Sequelize and models
import { cart } from "./cart"
import { wishList } from "./wishlist"
import { review } from "./review"
import { order } from "./order"
import { address } from "./address"
import { orderItem } from "./orderitem"
import { product } from "./product"
import { images } from "./images"
import { brand } from "./brand"
import { category } from "./category"
import { User} from "./user"
import { payment} from "./payment"
import { cartItem } from "./cartItem"

// Define associations

//category and brand
category.hasMany(product, { foreignKey: 'categoryID' })
brand.hasMany(product, { foreignKey: 'brandID' })

product.belongsTo(brand, { foreignKey: 'brandID' });
product.belongsTo(category, { foreignKey: 'categoryID' });
//Reviews 
product.hasMany(review, { foreignKey: 'productID' })
review.belongsTo(product, { foreignKey: 'productID' })
User.hasMany(review, { foreignKey: 'userID' })
review.belongsTo(User, { foreignKey: 'userID' })
//Order
order.hasMany(orderItem, { foreignKey: 'orderID' });
orderItem.belongsTo(order, { foreignKey: 'orderID' });

orderItem.belongsTo(product, { foreignKey: 'productID' });
//address
User.hasMany(address, { foreignKey: 'userID' });
address.belongsTo(User, { foreignKey: 'userID' });
//cartItem
cartItem.hasMany(cart, { foreignKey: 'cartID' });
cart.belongsTo(cartItem, { foreignKey: 'cartID' });
cart.belongsTo(product, { foreignKey: 'productID' })
product.hasMany(cart, { foreignKey: 'productID' })
//cart
User.hasMany(cart, { foreignKey: 'userID' });
cart.belongsTo(User, { foreignKey: 'userID' });

//Wishlist
User.hasMany(wishList, { foreignKey: 'userID' });
wishList.belongsTo(User, { foreignKey: 'userID' });
product.hasMany(wishList, { foreignKey: 'productID' });
wishList.belongsTo(product, { foreignKey: 'productID' });

//Payment
User.hasMany(payment, { foreignKey: 'userID' });
payment.belongsTo(User, { foreignKey: 'userID' });

payment.hasMany(order, { foreignKey: 'paymentID' });
order.belongsTo(payment, { foreignKey: 'paymentID' });
//Image
product.hasMany(images, { foreignKey: 'productID' });
images.belongsTo(product, { foreignKey: 'productID' });

//address
User.hasMany(address, { foreignKey: 'userID' })
address.belongsTo(User, { foreignKey: 'userID' })
order.belongsTo(address, { foreignKey: 'addressID' });
address.hasMany(order, { foreignKey: 'addressID' });


export { User, address, cart, wishList, payment,product, order, orderItem, review, images,  brand, category};
