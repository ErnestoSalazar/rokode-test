'use strict';

const   express = require('express'),
        router  = express.Router(),
        loginController = require('../controllers/loginController');


router.post('/', loginController.login);


module.exports = router;