const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: 'foo'},
  { id: 2, name: 'bar'}
];

router.get('/items', (req, res) => res.json(items));

router.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({error:'not found'});
  res.json(item);
});

router.post('/items', (req, res) => {
  const {name} = req.body;
  const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = {id, name};
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if(!item) return res.status(404).json({error:'not found'});
  item.name = req.body.name || item.name;
  res.json(item);
});

router.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter(i => i.id !== id);
  res.status(before === items.length ? 404 : 204).end();
});

module.exports = router;
