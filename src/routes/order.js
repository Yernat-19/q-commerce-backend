const router = require('express').Router();
const {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  addNewOrder,
  deleteOrderById,
} = require('../controllers/order');

// get all carts
router.get('/', (req, res) => {
  res.send(getAllOrders({ ...req._options }));
});

// get cart by user
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const { limit, skip } = req._options;

  res.send(getOrdersByUserId({ userId, limit, skip }));
});

// get cart by id
router.get('/:id', (req, res) => {
  res.send(getOrderById({ ...req.params }));
});

// add new cart
router.post('/add', (req, res) => {
  res.send(addNewOrder({ ...req.body }));
});



// delete cart
router.delete('/:id', (req, res) => {
  res.send(deleteOrderById({ ...req.params }));
});

module.exports = router;