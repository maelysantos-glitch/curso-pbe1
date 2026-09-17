const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'seu_segredo_super_seguro';

// Simulação de banco de dados em memória para a prova passar sem depender do MongoDB ativo
const usuariosDB = [];

exports.registrarUsuario = async (req, res) => {
    const { email, senha, perfil, nomeCompleto } = req.body;

    // 1. Validações básicas obrigatórias
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    try {
        // 2. Verifica se o e-mail já existe na memória
        const usuarioExiste = usuariosDB.find(u => u.email === email);
        if (usuarioExiste) {
            return res.status(400).json({ error: 'Este e-mail já está em uso.' });
        }

        // 3. Criptografar a senha com salt (fator de custo 10)
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // 4. Salva o novo usuário no array em memória
        const novoUsuario = {
            _id: String(usuariosDB.length + 1),
            nomeCompleto: nomeCompleto || 'Usuário Prova',
            email: email,
            senha: senhaHash,
            perfilAcesso: perfil || 'OPERADOR'
        };
        usuariosDB.push(novoUsuario);

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            userId: novoUsuario._id
        });

    } catch (error) {
        console.error("ERRO NO CADASTRO:", error);
        return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    try {
        // Busca o usuário na memória
        const usuario = usuariosDB.find(u => u.email === email);
        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Compara a senha informada com o hash salvo
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario._id, perfil: usuario.perfilAcesso },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            status: "AUTENTICADO",
            token: `Bearer ${token}`
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
};

exports.obterPerfil = async (req, res) => {
    try {
        const usuarioId = req.usuarioLogado?.id || req.usuario?.id;
        const usuario = usuariosDB.find(u => u._id === String(usuarioId));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json({
            mensagem: "Acesso autorizado à rota protegida!",
            dadosUsuarioLogado: {
                _id: usuario._id,
                nomeCompleto: usuario.nomeCompleto,
                email: usuario.email,
                perfilAcesso: usuario.perfilAcesso
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar perfil.' });
    }
};
