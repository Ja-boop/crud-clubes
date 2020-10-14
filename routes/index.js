const { Router } = require('express');
const router = Router();
const fs = require('fs');

let rawdata = fs.readFileSync('./data/equipos.json');
let equiposJSON = JSON.parse(rawdata);

let nombreEquipos = equiposJSON.map((equipos) => {
  return equipos.name;
});

let paisEquipos = equiposJSON.map((equipos) => {
  return equipos.area;
});

let idEquipos = equiposJSON.map((equipos) => {
  return equipos.id;
});

const jsonEquipos = fs.readFileSync('./data/equipos.json', 'utf-8');
const equipos = JSON.parse(jsonEquipos);

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

router.post('/equipos/agregar', (req, res) => {
    equipos.push(req.body);

    const jsonEquipos = JSON.stringify(equipos);
    fs.writeFileSync('./data/equipos.json', jsonEquipos, 'utf-8');

    res.send('Recibido!');
});

module.exports = router;
