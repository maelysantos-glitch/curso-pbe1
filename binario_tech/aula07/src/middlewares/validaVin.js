const validaVin = (req, res, next) => {
    const { vin } = req.body;

    if (!vin) {
        return res.status(400).json({ erro: "Campo 'vin' é obrigatório." });
    }

    if (vin.length !== 12) {
        return res.status(400).json({ erro: "O campo 'vin' deve conter exatamente 12 caracteres." });
    }

    next();
};

module.exports = validaVin; 
