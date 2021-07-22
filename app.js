require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');

app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);

module.exports = app;
