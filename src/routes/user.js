const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  searchUsers,
  addNewUser,
  updateUserById,
  deleteUserById,
  filterUsers,
} = require('../controllers/user');
const { verifyUserHandler } = require('../helpers');

// get all users
router.get('/', (req, res) => {
  res.send(getAllUsers({ ...req._options }));
});

// search users
router.get('/search', (req, res) => {
  res.send(searchUsers({ ...req._options }));
});

// filter users
router.get('/filter', (req, res) => {
  res.send(filterUsers({ ...req._options }));
});

// get user by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { select } = req._options;

  res.send(getUserById({ id, select }));
});



// get products by userId
// * products are independent from users


// add new user
router.post('/add', (req, res) => {
  res.send(addNewUser({ ...req.body }));
});

// update user by id (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateUserById({ id, ...req.body }));
});

// update user by id (PATCH)
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateUserById({ id, ...req.body }));
});

// delete user by id
router.delete('/:id', (req, res) => {
  res.send(deleteUserById({ ...req.params }));
});

module.exports = router;
