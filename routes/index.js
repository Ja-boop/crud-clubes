const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  const jsonEquipos = fs.readFileSync('./data/equipos.json', 'utf-8');
  let equipos = JSON.parse(jsonEquipos);
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

    let jsonEquipos = fs.readFileSync('./data/equipos.json', 'utf-8');
    let equipos = JSON.parse(jsonEquipos);

    equipos.push(nuevoEquipo);
    
    jsonEquipos = JSON.stringify(equipos);
    fs.writeFileSync('./data/equipos.json', jsonEquipos, 'utf-8');

    res.redirect('/');
});

router.get('/equipos/:id/eliminar', (req, res) => {
    let jsonEquipos = fs.readFileSync('./data/equipos.json', 'utf-8');
    let equipos = JSON.parse(jsonEquipos);

    equipos = equipos.filter(equipo => equipo.id != req.params.id); 
    // El metodo filter me permite recorrer un array. Le voy a pedir que agregue los equipos que no coincidan con el ID
    // Va quitar el que cumple con el ID

    jsonEquipos = JSON.stringify(equipos);
    fs.writeFileSync('./data/equipos.json', jsonEquipos, 'utf-8');

    res.redirect('/');
});

module.exports = router;
