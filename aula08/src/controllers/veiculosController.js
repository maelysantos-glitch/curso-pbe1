const veiculosController = {
  listarTodos: async (req, res) => {
    try {
      const veiculos = await db('veiculos').select('*');
      res.status(200).json(veiculos);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao cnsultar bando de dados." });
    }
  },

  criar: async (req, res) => {
    try {
      const { placa, montadora, modelo } = req.body;

      if (!placa || !montadora || !modelo) {
        return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios." });
      }

      const [id] = await db('veiculos').insert({
        placa,
        montadora,
        modelo
      });

      const novoVeiculo = await db('veiculos').where('id', id).first();
      res.status(201).json(novoVeiculo);
    } catch (erro) {
      if (erro.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ erro: "Ja existe um veiculo cadastrado com essa placa" });
      }
      res.status(500).json({ erro: "Erro ao inserir veiculo no banco de dados." });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const veiculo = await db('veiculos').where({ id }).first();

      if (!veiculo) {
        return res.status(404).json({ erro: "Veiculo nao encontrado." });
      }

      res.status(200).json(veiculo);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar banco de dados." });
    }
  },

  atualizarStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ erro: "Campo 'status' e obrigatorio." });
      }

      const veiculo = await db('veiculos').where({ id }).first();

      if (!veiculo) {
        return res.status(404).json({ erro: "Veiculo nao encontrado." });
      }

      await db('veiculos').where({ id }).update({ status });
      const veiculoAtualizado = await db('veiculos').where({ id }).first();

      res.status(200).json(veiculoAtualizado);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao atualizar status do veiculo." });
    }
  }
};


