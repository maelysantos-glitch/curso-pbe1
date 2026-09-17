const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');

// Rotas atualizadas para bater exatamente com o script da Aula 14
router.post('/api/v1/auth/register', authController.registrarUsuario);
router.post('/api/v1/auth/login', authController.loginUsuario);
router.get('/api/v1/auth/perfil', autenticarToken, authController.obterPerfil);

module.exports = router;
