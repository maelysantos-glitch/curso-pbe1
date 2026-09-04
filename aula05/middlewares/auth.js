function authMiddleware(req, res, next) {
    const apiKey = req.header('X-API-KEY');
    const chaveEsperada = 'binario-tech-secret-2026';

    if (!apiKey || apiKey !== chaveEsperada) {
        return res.status(401).json({ erro: "Acesso nao autorizado. Header 'X-API-KEY' invalido ou ausente." });
    }

    next();
}

module.exports = authMiddleware; 


