const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = 'SELECT author, IsWriteOn, content, response FROM contact';
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT author, IsWriteOn, content, response FROM contact Where id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

router.post('/', async (req, res) => {
  const { title, genre, picture, artist } = req.body;
  const sql =
    'INSERT INTO contact (author, IsWriteOn, content, response) VALUES (?,?,?,?)';
  const sqlValues = [title, genre, picture, artist];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.send(500).send('error');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { author, IsWriteOn, content, response } = req.body;
  const sql =
    'UPDATE contact SET author=?, isWriteOn=?, content=?, reponse=? WHERE id=?';
  const sqlValues = [author, IsWriteOn, content, response, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contact Where id=?';
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
