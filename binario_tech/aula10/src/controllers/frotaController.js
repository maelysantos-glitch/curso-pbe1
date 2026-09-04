const db = require('../database/connection');

const frotaController = {
  listarTudo: async (req, res, next) => {
    try {
      const dados = await db('veiculos')
        .leftJoin('telemetria', 'veiculos.id', '=', 'telemetria.veiculos_id')
        .select(
          'veiculos.id as veiculos_id',
          'veiculos.placa',
          'veiculos.montadora',
          'telemetria.velocidade',
          'telemetria.temperatura_motor'
        );

      res.status(200).json(dados);
    } catch (erro) {
      next(erro);
    }
  },

  cadastrarVeiculo: async (req, res, next) => {
    try {
      const { placa, montadora } = req.body;

      if (!placa || !montadora) {
        return res.status(400).json({ erro: "Campos 'placa' e 'montadora' são obrigatórios." });
      }

      // Verificação explícita de duplicidade no banco
      const veiculoExistente = await db('veiculos').where({ placa }).first();
      if (veiculoExistente) {
        return res.status(409).json({ erro: "Placa já cadastrada no sistema." });
      }

      const [id] = await db('veiculos').insert({ placa, montadora });
      return res.status(201).json({ id, placa, montadora });
    } catch (erro) {
      // Captura constraint de chave única do SQLite
      if (erro.code === 'SQLITE_CONSTRAINT' || erro.message.includes('UNIQUE')) {
        return res.status(409).json({ erro: "Placa já cadastrada no sistema." });
      }
      next(erro);
    }
  }
};

module.exports = frotaController;
