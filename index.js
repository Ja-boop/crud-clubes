const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');

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

let rawdata = fs.readFileSync('./data/equipos.json');
let equiposJSON = JSON.parse(rawdata);

let nombreEquipos = equiposJSON.map((equipos) => {
  return equipos.name;
});

let paisEquipos = equiposJSON.map((equipos) => {
  return equipos.area.name;
});

let idEquipos = equiposJSON.map((equipos) => {
  return equipos.id;
});

app.get('/', (req, res) => {
    res.render('home', {
      layout: 'main',
      style: 'home.css',
      data: {
        cantidadEquipos: filenames.length,
        nombreEquipos,
        paisEquipos,
        idEquipos,
      },
    });
  });

app.get('/equipos/agregar', (req, res) => {
  res.render('agregar', {
    style: 'agregar.css',
    layout: 'main',

  });
});
  
  


  