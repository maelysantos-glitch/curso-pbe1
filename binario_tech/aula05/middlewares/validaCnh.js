function validaCnh(req, res, next) {
    const { cnh } = req.body;

    if (!cnh) {
        return res.status(400).json({ erro: "O campo 'cnh' e obrigatorio." });
    }

    const cnhRegex = /^[0-9]{11}$/;

    if (!cnhRegex.test(cnh)) {
        return res.status(400).json({ erro: "A CNH deve conter exatamente 11 digitos numericos." });
    }

    next();
}

module.exports = validaCnh; 
