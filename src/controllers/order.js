const { verifyUserHandler } = require('../helpers');
const APIError = require('../utils/error');
const utils = require('../utils/util');
const {
  dataInMemory: frozenData,
  trueTypeOf,
  isNumber,
  limitArray,
  updateData,
} = require('../utils/util');

const controller = {};

// get carts
controller.getAllOrders = ({ limit, skip }) => {
  let [...orders] = frozenData.orders;
  const total = orders.length;

  if (skip > 0) {
    orders = orders.slice(skip);
  }

  orders = limitArray(orders, limit);

  const result = { orders, total, skip, limit: orders.length };

  return result;
};

// get carts by user id
controller.getOrdersByUserId = ({ userId, limit, skip }) => {
  verifyUserHandler(userId);

  let orders = frozenData.orders.find(o => o.userId.toString() === userId);
  const total = 1;

  // if (skip > 0) {
  //   carts = carts.slice(skip);
  // }

  // carts = limitArray(carts, limit);

  const result = { orders, total, skip, limit: orders.length };

  return result;
};

// get cart by id
controller.getOrderById = ({ id }) => {
  const orderFrozen = frozenData.orders.find(c => c.id.toString() === id);

  if (!orderFrozen) {
    throw new APIError(`Cart with id '${id}' not found`, 404);
  }

  return orderFrozen;
};

// add new cart
controller.addNewOrder = ({ userId, products = [] }) => {
  verifyUserHandler(userId);

  if (trueTypeOf(products) !== 'array') {
    throw new APIError(
      `products must be array of objects, containing product id and quantity`,
      400,
    );
  }

  // if (!products.length) {
  //   throw new APIError(`products can not be empty`, 400);
  // }

  const productIds = [];
  const productQty = [];

  // extract product id and quantity
  products.forEach(p => {
    productIds.push(+(p.id || 0));
    productQty.push(+(p.quantity || 1));
  });

  // get all possible products by ids
  const [...productsByIds] = frozenData.products.filter(p => {
    return productIds.includes(p.id);
  });

  // set variables to count the totals of cart by products
  let total = 0;
  let discountedTotal = 0;
  let totalQuantity = 0;

  // get products in the relevant schema
  const someProducts = productsByIds.map((p, idx) => {
    // get quantity of the product
    const quantity = productQty[idx];

    // total price (price * quantity)
    const priceWithQty = p.price * quantity;

    // apply discount on the product if applicable
    const discountedPrice = Math.round(
      priceWithQty * ((100 - p.discountPercentage) / 100),
    );

    // update cart variables
    total += priceWithQty;
    discountedTotal += discountedPrice;
    totalQuantity += quantity;

    // set product with correct schema
    return {
      id: p.id,
      title: p.title,
      price: p.price,
      quantity,
      total: priceWithQty,
      discountPercentage: p.discountPercentage,
      discountedPrice,
    };
  });
  const createdAt = new Date()
  const deliveryDate = utils.addDays(createdAt, utils.getRandomInt(10))
  // prepare cart
  const order = {
    id: frozenData.orders.length + 1,
    products: someProducts,
    total,
    userId: +userId, // converting userId to number
    totalProducts: someProducts.length,
    totalQuantity,
    createdAt,
    deliveryDate
  };
  frozenData.orders.push(cart)
  utils.updateData('orders', frozenData.orders)
  return order;
};


// delete cart by id
controller.deleteOrderById = ({ id }) => {
  frozenData.orders.filter(o => o.id.toString() === id);
  utils.updateData('orders', frozenData.orders)

  return id;
};

module.exports = controller;