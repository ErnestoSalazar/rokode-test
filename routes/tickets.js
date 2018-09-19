'use strict';

const   express = require('express'),
        router  = express.Router(),
        accessTicketsController = require('../controllers/accessTicketsController');

router.post('/', accessTicketsController.postAccessTicket);

module.exports = router;