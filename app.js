const express = require('express');
const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const fs = require('fs');

// Middleware ที่เพิ่มเข้ามาเพื่อให้ Express รับข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', './views'); // Set the views directory

app.use(morgan('dev')); // Use Morgan for logging HTTP requests

// Serve static files from the 'asset' directory
app.use(express.static(path.join(__dirname, '/asset/')));

// Use the defined routes
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
