const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: './uploads/imagenes'  });
const exphbs = require('express-handlebars');
const { json } = require('express');

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PUERTO = 8080;
app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);

// Middleware
app.use(express.urlencoded({extended: false}));
filenames = fs.readdirSync('./data/equipos');

// Routes
app.use(require('./routes/index.js'));

// Static
app.use(express.static(`${__dirname}/uploads`));
app.use(express.static(`${__dirname}/public`));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('404 Not found');
});
  