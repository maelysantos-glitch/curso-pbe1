const express = require('express');
const cors = require('cors');
const telemetriaRoutes = require('./src/routes/telemetriaroutes');

const app = express();
const PORT = 3023;

app.use(cors());
app.use(express.json());
app.use('/api/v1/telemetria', telemetriaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada na Binario Tech." });
});

app.listen(PORT, () => {
  console.log(`[Binario Tech] Servidor rodando na porta ${PORT}`);
});  
