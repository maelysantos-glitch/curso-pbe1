const express = require('express');
const router = express.Router();

let manutencoes = [
    { id: 1, caminhaoId: 1, descricao: "Troca de oleo e filtros", orcamento: 450.00, status: "concluida" },
    { id: 2, caminhaoId: 2, descricao: "Revisao dos freios", orcamento: 800.00, status: "pendente" }
];

//GET /api/v1/manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

//POST /api/v1/manutencoes (com validacao inline)
router.post('/', (req, res) => {
    const { caminhaoId, descricao, orcamento, status } = req.body;

    if (!caminhaoId || !descricao || !orcamento) {
        return res.status(400).json({ erro: "campos 'caminhaoId', 'descricao' e 'orcamento' sao obrigatorios." });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        caminhaoId,
        descricao,
        orcamento,
        status: status || "pendente"
    };

    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});

module.exports = router;
