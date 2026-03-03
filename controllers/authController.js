const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        req.flash('success', 'Registration successful! Please login.');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'Error in registration: ' + error.message);
        res.redirect('/register');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            req.session.user = user;
            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
    } catch (error) {
        req.flash('error', 'Login error: ' + error.message);
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
