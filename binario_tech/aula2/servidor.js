const express = require('express'); 
const app = express();
const PORT = 3023;

app.use(express.json());

//Rota de status BINARIO TECH
app.get('/status', (req, res) => {
    res.json({
	    servidor: "Binario Tech Core",
	    status: "OPERACIONAL",
	    montadoras_atendidas: ["Scania", "Mercedes", "VW"],
	    uptime_segundos: process.uptime()
    });
});

// Rota de Informação da Montadora Scania 
app.get('/scania/info', (req, res) => {  
    res.json({ 
	montadora: "Scania",
	foco: "Caminhoes Pesados e Ônibus",
	sistema_telemetria: "Ativo",
	unidades_conectadas: 1420
    });
});

// Rota da API v1 - Scania
app.get("/api/v1/scania", (req, res) => {
    res.json({
        modelo: "Scania R450",
        montadora: "Scania",
        categoria: "Caminhão Pesado"
    });
});

// Rota da API v1 - Mercedes
app.get("/api/v1/mercedes", (req, res) => {
    res.json({
        modelo: "Mercedes-Benz Actros",
        montadora: "Mercedes-Benz",
        categoria: "Caminhão Pesado"
    });
});

app.listen(PORT, () => { 
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
}); 


