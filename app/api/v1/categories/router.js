const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/categories', index);
router.post('/categories', create);
router.put('/categories/:id', update);
router.get('/categories/:id', find);
router.delete('/categories/:id', destroy);

module.exports = router;