const SubCategory = require('../models/addSubCategory');
const Category = require('../models/addCategory');

exports.addSubCategory = async (req, res) => {
    try {
        const { subCategoryName, categoryId } = req.body;
        await SubCategory.create({ name: subCategoryName, categoryId });
        req.flash('success', 'Sub Category added successfully!');
        res.redirect('/addSubCategory');
    } catch (error) {
        req.flash('error', 'Error adding sub-category: ' + error.message);
        res.redirect('/addSubCategory');
    }
};
