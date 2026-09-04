const express = require('express');
const app = express();
const port = 3000;

app.get('/vw/info', (req, res) => {
  res.json({
    montadora: "Volkswagen",
    foco: "Veículos de Passeio e Comerciais Leves",
    sistema_telemetria: "Ativo",
    unidades_conectadas: 980
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: "online",
    servidor: "ativo",
    horario: new Date().toISOString()
  });
});

app.get('/scania/info', (req, res) => {
  res.json({
    montadora: "Scania",
    foco: "Caminhões e Ônibus",
    origem: "Suécia",
    fundacao: 1891
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
