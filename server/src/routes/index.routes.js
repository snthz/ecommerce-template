const {Router} = require('express');
const passport = require('passport');

const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');

const router = Router();


router.use('/auth', authRoutes);
router.use("/admin", adminRoutes);

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);


module.exports = router;