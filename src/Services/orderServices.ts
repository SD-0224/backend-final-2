import * as db from "../Models/index";


export const createOrder = async function createOrder(orderData: any, transaction?: any): Promise<any> {
    try {
      return await db.order.create(
        {
            ...orderData,
        },
        { transaction }
      );
    } catch (error) {
        console.log("error creating order", error);
  
      throw new Error('Error creating Order')
    }
  }
    const createOrderItems = async (data: any, orderID: number, transaction?: any) =>
        {
            try {
                return await db.orderItem.create(
                  {
                    orderID:orderID,
                    productID: data.productID,
                    userID: data.userID,
                    productQuantity: data.productQuantity,
                    productDiscount: data.productDiscount,
                    productPrice: data.productPrice,
                    subTotal:data.subTotal,
                    productTitle: data.productTitle,
                    productSubtitle: data.productSubtitle,                    
                  },
                  { transaction }
                )
              } catch (error) {
                console.log("error creating orderItem", error);
                throw new Error('Internal Server Error')
              }
        }
    



const orderServices = {
    createOrder,
    createOrderItems,

};

export default orderServices;