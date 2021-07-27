require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');

app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);

module.exports = app;
