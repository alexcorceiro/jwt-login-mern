const express = require("express");
const { signup, login, verifyToken, refresh, getUser} = require('../controllers/UserController');
const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", getUser , verifyToken);
router.post("/refresh", refresh, verifyToken, getUser)
module.exports = router;