const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

app.use(userRoutes);
app.use(bookRoutes);

app.listen(PORT);