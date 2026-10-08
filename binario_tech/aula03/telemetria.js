const express = require('express');
const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 3023;
=======
const PORT = 3023;
>>>>>>> fab881902295bb138f9bfd0d9525b8306b06067f

app.get('/api/v1/scania', (req, res) => {
  res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82 });
});

app.get('/api/v1/mercedes', (req, res) => {
  res.json({ montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78 });
});

app.get('/api/v1/vw', (req, res) => {
  res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.listen(PORT, () => {
  console.log(`[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`);
});
