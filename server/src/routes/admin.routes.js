const { Router } = require("express");
const { login, register } = require("../controllers/admin.controller");

const router = Router();

// auth
router.post("/login", login);
router.post('/register', register)



module.exports = router;
