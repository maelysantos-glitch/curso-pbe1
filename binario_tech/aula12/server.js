const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/binario_tech')
  .then(() => console.log('[Binário Tech] Conexão NoSQL ativa!'))
  .catch(err => console.error('[ERRO MONGODB]:', err.message));

// Schemas
const itemPecaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  custoUnitario: { 
    type: Number, 
    required: true,
    min: [0, 'O custo unitário não pode ser negativo.'] 
  },
  quantidade: { type: Number, default: 1 }
});

const ManutencaoSchema = new mongoose.Schema({
  placa: String,
  descricao: String,
  pecasSubstituidas: [itemPecaSchema]
});

const Manutencao = mongoose.models.Manutencao || mongoose.model('Manutencao', ManutencaoSchema);

// Rotas anteriores (GET, POST)
app.get('/api/v1/manutencoes', async (req, res) => {
  const { placa } = req.query;
  const manutencoes = await Manutencao.find({ placa: { $regex: placa || '', $options: 'i' } });
  return res.status(200).json(manutencoes);
});

app.post('/api/v1/manutencoes', async (req, res) => {
  const nova = await Manutencao.create(req.body);
  return res.status(201).json(nova);
});

// EXERCÍCIO 4: Rota DELETE por ID
app.delete('/api/v1/manutencoes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const manutencaoDeletada = await Manutencao.findByIdAndDelete(id);

    if (!manutencaoDeletada) {
      return res.status(404).json({ error: "Manutenção não encontrada." });
    }

    return res.status(200).json({ message: "Manutenção removida com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar manutenção", detalhe: error.message });
  }
});

app.listen(3000, () => {
  console.log('[Binário Tech] Servidor NoSQL Aula 12 ativo na porta 3000');
});
