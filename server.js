const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const Product = require('./models/productModel');
const db = require('./db/db');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Database
db();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Sessions & Flash
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.message = req.flash();
  res.locals.user = req.session.user || null;
  next();
});

const auth = require('./middlewares/auth');

// Routes
app.use('/', authRoutes);

// Dashboard / Category / Product routes will be added similarly
app.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId').populate('subCategoryId');
    res.render('index', { products });
  } catch (error) {
    res.render('index', { products: [] });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
