const express = require('express');
const cors = require('cors');
const frotaRoutes = require('./src/routes/frotaRoutes');
const tratarErros = require('./src/middlewares/tratarErros');

const app = express();

app.use(cors());
app.use(express.json());

// Rota configurada exatamente com a URL que o script exige
app.use('/api/v1/frota', frotaRoutes);

// Middleware para rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada no servidor.' });
});

// Middleware centralizado de tratamento de erros
app.use(tratarErros);

app.listen(3000, () => {
  console.log('[Binário Tech] Servidor da Aula 10 Ativo na porta 3000');
});
