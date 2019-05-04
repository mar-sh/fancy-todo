const express = require('express');

const controller = require('../controllers/entry');
const middleware = require('../middlewares/auth');

const router = express.Router();

const {
  loginMethod,
  userAuthentication,
} = middleware;

const {
  testMWare,
  postRegister,
  postLogin,
} = controller;

router.post('/register', postRegister);
router.post('/login', loginMethod, postLogin);
router.get('/test', userAuthentication, testMWare);

module.exports = router;