const Router = require('express').Router;
const Controller = require('../controllers/auth');

const router = new Router();

router.post(`/sign-up`, Controller.signUp);
router.post(`/sign-in`, Controller.signIn);
router.post(`/sign-out`, Controller.signOut);

router.get(`/refresh-token`, Controller.getRefreshToken);
router.get(`/check`, Controller.check);

module.exports = router;
