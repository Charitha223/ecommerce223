const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8085;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce1'
});

db.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        return;
    }
    console.log('Database connected successfully');
});

// Routes
app.get('/get-products', (req, res) => {
    const getQuery = 'SELECT * FROM products';
    db.query(getQuery, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Error in fetching data' });
            return;
        }
        res.json(result);
    });
});

app.post('/add-product', (req, res) => {
    const { product_name, description, mep, img, category } = req.body;
    const insertQuery = 'INSERT INTO products (product_name, description, mep, img, category) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [product_name, description, mep, img, category], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        res.json({ message: 'Product inserted successfully' });
    });
});

// Start server
app.listen(8085)