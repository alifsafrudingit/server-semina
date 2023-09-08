const express = require('express');
const router = express();
const { createCMZOrganizer } = require('./controller');

router.post('/organizers', createCMZOrganizer);

module.exports = router;