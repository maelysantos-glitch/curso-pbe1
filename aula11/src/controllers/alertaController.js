const Alerta = require('../models/Alerta');

const alertaController = {
  criarAlerta: async (req, res) => {
    try {
      const { equipamentoId, nivelSeveridade, temperaturaMedia, metadados, tags } = req.body;

      const novoAlerta = await Alerta.create({
        equipamentoId,
        nivelSeveridade,
        temperaturaMedia,
        metadados,
        tags
      });

      res.status(201).json(novoAlerta);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao salvar alerta MongoDB", detalhe: erro.message });
    }
  },

  listarAlertas: async (req, res) => {
    try {
      const alertas = await Alerta.find().sort({ registradoEm: -1 });
      res.status(200).json(alertas);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar coleção no MongoDB" });
    }
  },

  buscarPorSeveridade: async (req, res) => {
    try {
      const { nivel } = req.params;

      const alertas = await Alerta.find({ nivelSeveridade: nivel });

      if (alertas.length === 0) {
        return res.status(404).json({
          mensagem: `Nenhum alerta encontrado com severidade '${nivel}'.`
        });
      }

      res.status(200).json(alertas);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar alertas por severidade no MongoDB" });
    }
  }

};

module.exports = alertaController;
