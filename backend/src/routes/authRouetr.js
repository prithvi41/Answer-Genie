const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/all', authController.getAll);
router.post('/submit-form', authController.submitForm);

module.exports = router;