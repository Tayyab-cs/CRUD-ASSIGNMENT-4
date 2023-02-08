const express = require('express')
const router = express.Router();

const controller = require('../controllers/userController');

// Adding user To a Database
router.post('/', controller.createUser);

router.patch('/update/:id', controller.updateUserData); 

module.exports = router;