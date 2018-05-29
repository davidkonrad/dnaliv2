var express = require('express');
var log = require('./log.controller');
var router = express.Router();

router.post('/log', log.logExport);

module.exports = router;
