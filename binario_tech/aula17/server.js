const http = require('http');
const jwt = require('jsonwebtoken');

const SECRET = 'segredo-simulado-aula17';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/v1/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{"status":"ok"}');

  } else if (req.method === 'POST' && req.url === '/api/v1/auth/token-teste') {
    const token = jwt.sign(
      { role: 'teste', origem: 'simulado-aula17' },
      SECRET,
      { expiresIn: '5m' }
    );
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ token }));

  } else if (req.method === 'GET' && req.url === '/api/v1/simulado/status') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');

    try {
      jwt.verify(token, SECRET);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        usuario: { nome: 'Maely Santos', status: 'ativo' }
      }));
    } catch (err) {
      res.writeHead(401, {'Content-Type': 'application/json'});
      res.end('{"erro":"token inválido ou expirado"}');
    }

  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3023, () => console.log('Servidor rodando na porta 3023'));
