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
import { user} from "./user"
import { payment} from "./payment"

// Define associations

//category and brand
category.hasMany(product, { foreignKey: 'categoryID' })
brand.hasMany(product, { foreignKey: 'brandID' })

product.belongsTo(brand, { foreignKey: 'brandID' });
product.belongsTo(category, { foreignKey: 'categoryID' });
//Reviews 
product.hasMany(review, { foreignKey: 'productID' })
review.belongsTo(product, { foreignKey: 'productID' })
//Order
order.hasMany(orderItem, { foreignKey: 'orderID' });
orderItem.belongsTo(order, { foreignKey: 'orderID' });

orderItem.belongsTo(product, { foreignKey: 'productID' });
//address
user.hasMany(address, { foreignKey: 'userID' });
address.belongsTo(user, { foreignKey: 'userID' });
//cart
user.hasMany(cart, { foreignKey: 'userID' });
cart.belongsTo(user, { foreignKey: 'userID' });
cart.belongsTo(product, { foreignKey: 'productID' })
product.hasMany(cart, { foreignKey: 'productID' })
//Wishlist
user.hasMany(wishList, { foreignKey: 'userID' });
wishList.belongsTo(user, { foreignKey: 'userID' });
product.hasMany(wishList, { foreignKey: 'productID' });
wishList.belongsTo(product, { foreignKey: 'productID' });

//Payment
user.hasMany(payment, { foreignKey: 'userID' });
payment.belongsTo(user, { foreignKey: 'userID' });

payment.hasMany(order, { foreignKey: 'paymentID' });
order.belongsTo(payment, { foreignKey: 'paymentID' });
//Image
product.hasMany(images, { foreignKey: 'productID' });
images.belongsTo(product, { foreignKey: 'productID' });

//address
user.hasMany(address, { foreignKey: 'userID' })
address.belongsTo(user, { foreignKey: 'userID' })
order.belongsTo(address, { foreignKey: 'addressID' });
address.hasMany(order, { foreignKey: 'addressID' });


export { user, address, cart, wishList, payment,product, order, orderItem, review, images,  brand, category};
