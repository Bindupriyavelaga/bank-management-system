// routes/account.js
const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');

// Define routes
router.post('/create', AccountController.createAccount);
router.post('/deposit', AccountController.depositMoney);
router.post('/withdraw', AccountController.withdrawMoney);
router.get('/:id', AccountController.getAccountDetails);

module.exports = router;
