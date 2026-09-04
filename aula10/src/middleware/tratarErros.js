function tratarErros(err, req, res, next) {
    console.error(`[ERRO LOG]: ${err.message}`);

    if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ erro: "Conflito de dados: Registro já existe com este valor único (ex: placa: )." });
    }

    if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
        return res.status(400).json({ erro: "Erro de relacionamento: O registro pai fornecido não existe." });
    }

    // EXERCÍCIO 2 - JSON inválido
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            erro: "JSON inválido. Verifique a sintaxe dos dados enviados."
        });
    }

    return res.status(500).json({ erro: "Erro interno no servidor da Binario Tech." });
}

module.exports = tratarErros; 
