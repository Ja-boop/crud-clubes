const { Router } = require('express');
const router = Router();
const fs = require('fs');

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

router.get('/', (req, res) => {
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

router.get('/equipos/agregar', (req, res) => {
  res.render('agregar', {
    style: 'agregar.css',
    layout: 'main',

  });
});

module.exports = router;
