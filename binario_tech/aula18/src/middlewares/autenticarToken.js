const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'seu_segredo_super_seguro';

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }

    const token = partes[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuarioLogado = decoded;
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = autenticarToken;
