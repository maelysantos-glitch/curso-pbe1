const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');
const validaVin = require('../middlewares/validaVin');

router.get('/', mercedesController.listarTelemetria);
router.post('/', validaVin, mercedesController.registrarTelemetria);

module.exports = router; 
