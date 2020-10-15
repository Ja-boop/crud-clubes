const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const jsonEquipos = fs.readFileSync('./data/equipos.json', 'utf-8');
let equipos = JSON.parse(jsonEquipos);

router.get('/', (req, res) => {
    res.render('home', {
      layout: 'main',
      style: 'home.css',
      equipos,
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
