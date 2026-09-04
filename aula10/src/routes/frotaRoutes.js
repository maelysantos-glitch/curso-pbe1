const express = require('express');
const router = express.Router();
const frotaController = require('../controllers/frotaController');

router.get('/', frotaController.listarTudo);
router.post('/veiculo', frotaController.cadastrarVeiculo);
router.post('/veiculos', frotaController.cadastrarVeiculo);

module.exports = router;
