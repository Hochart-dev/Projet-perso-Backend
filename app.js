require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { frontendUrl, adminUrl } = require('./conf');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: { frontendUrl, adminUrl } }));
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');
const loginRoutes = require('./routes/auth');

app.use('/contact', contactRoutes);
app.use('/gallery', galleryRoutes);
app.use('/auth', loginRoutes);

module.exports = app;
