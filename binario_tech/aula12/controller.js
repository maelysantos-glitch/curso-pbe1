const mongoose = require('mongoose');

// Modelo de exemplo (caso já tenha o model em outro arquivo, importe-o aqui)
const Manutencao = mongoose.models.Manutencao || mongoose.model('Manutencao', new mongoose.Schema({
  placa: String,
  descricao: String,
  data: Date
}));

// EXERCÍCIO 1: Busca por placa com $regex case-insensitive
const buscarManutencoesPorPlaca = async (req, res) => {
  try {
    const { placa } = req.query;

    if (!placa) {
      return res.status(400).json({ error: "O parâmetro 'placa' é obrigatório." });
    }

    // $regex realiza a busca parcial; $options: 'i' torna case-insensitive
    const manutencoes = await Manutencao.find({
      placa: { $regex: placa, $options: 'i' }
    });

    return res.status(200).json(manutencoes);
  } catch (error) {
    return res.status(500).json({ error: "Erro na busca", detalhe: error.message });
  }
};

module.exports = { buscarManutencoesPorPlaca };
