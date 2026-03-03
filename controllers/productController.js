const Product = require('../models/productModel');
const Category = require('../models/addCategory');
const SubCategory = require('../models/addSubCategory');

exports.addProduct = async (req, res) => {
    try {
        const { title, description, price, stock, categoryId, subCategoryId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        await Product.create({ title, description, price, stock, image, categoryId, subCategoryId });
        req.flash('success', 'Product added successfully!');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'Error adding product: ' + error.message);
        res.redirect('/addProduct');
    }
};

exports.viewProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId').populate('subCategoryId');
        res.render('pages/viewProduct', { products });
    } catch (error) {
        req.flash('error', 'Error viewing products: ' + error.message);
        res.redirect('/');
    }
};
