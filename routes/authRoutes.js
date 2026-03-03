const express = require('express');
const router = express.Router();
const addCategoryController = require('../controllers/addCategoryController');
const addSubCategoryController = require('../controllers/addSubCategoryController');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const Category = require('../models/addCategory');
const SubCategory = require('../models/addSubCategory');

const auth = require('../middlewares/auth');

// Auth Routes
router.get('/login', (req, res) => res.render('pages/login'));
router.post('/login', authController.login);
router.get('/register', (req, res) => res.render('pages/register'));
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Protect all following routes
router.use(auth);

// Add Category
router.get('/addCategory', (req, res) => res.render('pages/addCategory'));
router.post('/addCategory', addCategoryController.addCategory);

// Add SubCategory
router.get('/addSubCategory', async (req, res) => {
    const categories = await Category.find();
    res.render('pages/addSubCategory', { categories });
});
router.post('/addSubCategory', addSubCategoryController.addSubCategory);

const upload = require('../middlewares/multerMiddlewares');

// Original Template Pages
router.get('/buttons', (req, res) => res.render('pages/ui-features/buttons'));
router.get('/dropdowns', (req, res) => res.render('pages/ui-features/dropdowns'));
router.get('/typography', (req, res) => res.render('pages/ui-features/typography'));
router.get('/basic-elements', (req, res) => res.render('pages/forms/basic_elements'));
router.get('/basic-table', (req, res) => res.render('pages/tables/basic-table'));
router.get('/chartjs', (req, res) => res.render('pages/charts/chartjs'));
router.get('/mdi-icons', (req, res) => res.render('pages/icons/mdi'));
router.get('/blank-page', (req, res) => res.render('pages/samples/blank-page'));
router.get('/error-404', (req, res) => res.render('pages/samples/error-404'));
router.get('/error-500', (req, res) => res.render('pages/samples/error-500'));

// Add Product
router.get('/addProduct', async (req, res) => {
    const categories = await Category.find();
    const subCategories = await SubCategory.find();
    res.render('pages/addProduct', { categories, subCategories });
});
router.post('/addProduct', upload, productController.addProduct);

// View Product
router.get('/viewProduct', productController.viewProducts);

module.exports = router;
