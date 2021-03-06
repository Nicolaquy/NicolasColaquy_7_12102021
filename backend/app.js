const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const helmet = require('helmet'); 
const db = require('./db');
const app = express();
const path = require('path');

app.use(helmet()); 
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true})); 
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
module.exports= app;
