require('dotenv').config();
const express = require('express');
const cors = require('cors');
const provaRoutes = require('./src/routes/provaRoutes'); 

const app = express();
const PORT = 3023;

app.use(cors());
app.use(express.json());

// Ativa as rotas da prova (/api/v1/auth)
app.use('/', provaRoutes);

app.listen(PORT, () => {
    console.log(`[Binário Tech] Servidor de Autenticação JWT Ativo na porta ${PORT}`);
});
