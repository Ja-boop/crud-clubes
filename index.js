const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './uploads/imagenes'  });
const exphbs = require('express-handlebars');
const { json } = require('express');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/uploads`));
app.use(express.static('public'));

filenames = fs.readdirSync('./data/equipos');

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
  
  

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
  