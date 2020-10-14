const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
let equipos = JSON.parse(jsonEquipos);

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
    const { name, shortName, tla, area, url, address, phone, website, founded, email, clubColors, venue } = req.body;

    let nuevoEquipo = {
        id: uuidv4(),
        name,
        shortName,
        tla,
        area,
        url,
        address,
        phone,
        website,
        founded,
        email,
        clubColors,
        venue
    }

    equipos.push(nuevoEquipo);

    const jsonEquipos = JSON.stringify(equipos);
    fs.writeFileSync('./data/equipos.json', jsonEquipos, 'utf-8');

    res.redirect('/');
});

router.get('/equipos/:id/eliminar', (req, res) => {
    equipos = equipos.filter(equipo => equipo.id != req.params.id);
    const jsonEquipos = JSON.stringify(equipos);
    fs.writeFileSync('./data/equipos.json', jsonEquipos, 'utf-8');

    res.redirect('/');
});

module.exports = router;
