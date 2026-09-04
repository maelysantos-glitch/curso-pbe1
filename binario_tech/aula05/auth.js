function authMiddleware(req, res,next) {
    const apiKey = req.headers['x-api-key'];
    const CHAVEVE_VALIDA = "binario-tech-secret-2026";

    if (!apikey || apikey !== CHAVE_VALIDA) {
	return res.status(400).json({ 
	    erro: "Acesso nao autorizado. Header 'X-API-KEY' ivaçido ou ausente."
        });
     }

  next();

} 

module.exports = authiMiddleware;
