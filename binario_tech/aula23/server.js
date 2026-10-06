require('dotenv').config();
const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

app.use(express.json());

const client = createClient({ url: REDIS_URL });

client.on('error', (err) => console.error('[Erro Redis]', err));

async function init() {
  await client.connect();
  console.log('[Binário Tech] Conectado ao servidor Redis com sucesso!');
}

init();

// Rota com contador de acessos via Redis
app.get('/api/v1/visitas', async (req, res) => {
  try {
    const visitas = await client.incr('contador_visitas');
    res.json({
      status: 'SUCESSO',
      mensagem: 'Contador atualizado no Redis com sucesso!',
      totalVisitas: visitas,
      instanciaHost: require('os').hostname(),
      timestamp: new Date()
    });
  } catch (error) {
    console.error('[Erro]', error);
    res.status(500).json({ status: 'ERRO', mensagem: 'Falha ao acessar o Redis' });
  }
});

// Rota para zerar o contador de visitas
app.delete("/api/v1/visitas/reset", async (req, res) => {
  try {
    const removidas = await client.del("contador_visitas");
    res.json({
      status: "SUCESSO",
      mensagem: "Contador de visitas resetado no Redis!",
      chavesRemovidas: removidas,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("[Erro]", error);
    res.status(500).json({ status: "ERRO", mensagem: "Falha ao resetar o contador" });
  }
});

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor rodando na porta ${PORT}`);
});
