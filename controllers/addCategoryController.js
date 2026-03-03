const Category = require('../models/addCategory');

exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        await Category.create({ name: categoryName });
        req.flash('success', 'Category added successfully!');
        res.redirect('/addCategory');
    } catch (error) {
        req.flash('error', 'Error adding category: ' + error.message);
        res.redirect('/addCategory');
    }
};
