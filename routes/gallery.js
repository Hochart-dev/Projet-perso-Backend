const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql =
    'SELECT collection, name, artist, about, description, size, number, price, url FROM gallery';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT collection, name, artist, about, description, size, number, price, url From gallery Where id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const {
    collection,
    name,
    artist,
    about,
    description,
    size,
    number,
    price,
    url,
  } = req.body;
  const sql =
    'INSERT INTO gallery (collection, name, artist, about, description, size, number, price, url) VALUES (?,?,?,?,?,?,?,?,?)';
  const sqlValues = [
    collection,
    name,
    artist,
    about,
    description,
    size,
    number,
    price,
    url,
  ];
  try {
    const [results] = await db.query(sql, sqlValues);
    return res.status(201).json(results);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).send('this pictures already exist');
    }
    return res.status(400).send("Bleh, didn't understand it");
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    collection,
    name,
    artist,
    about,
    description,
    size,
    number,
    price,
    url,
  } = req.body;
  const sql =
    'UPDATE gallery SET collection=?, name=?, artist=?, about=?, description=?, size=?, number=?, price=?, url=? WHERE id=?';
  const sqlValues = [
    collection,
    name,
    artist,
    about,
    description,
    size,
    number,
    price,
    url,
    id,
  ];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM gallery Where id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
