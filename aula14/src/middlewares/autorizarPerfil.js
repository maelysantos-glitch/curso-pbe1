const jwt = require('jsonwebtoken');

function autorizarPerfil(perfisPermitidos) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
      }

      const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"

      if (!token) {
        return res.status(401).json({ mensagem: 'Token mal formatado.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const perfilUsuario = decoded.perfil; // ajuste conforme o campo do seu token

      if (!perfilUsuario) {
        return res.status(403).json({ mensagem: 'Token não contém perfil de usuário.' });
      }

      if (!perfisPermitidos.includes(perfilUsuario)) {
        return res.status(403).json({ mensagem: 'Acesso negado: perfil sem permissão.' });
      }

      req.usuario = decoded; // disponibiliza os dados do token para as próximas etapas
      next();
    } catch (erro) {
      if (erro.name === 'TokenExpiredError') {
        return res.status(401).json({ mensagem: 'Token expirado.' });
      }
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };
}

module.exports = autorizarPerfil;
