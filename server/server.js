const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log('Connection failed', error));
db.once('open', () => console.log('Connected'));

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

app.get('/:id', async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400);
      throw new Error('Error');
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

app.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
    });
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
