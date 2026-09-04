const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

//Função Auxiliar: Ler Arquivos JSON
async function lerOcorrencias() {
   try  {
        const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
        return JSON.parse(dados); 
   } catch (erro) {
     //Se o arquivo não existir, retorna array vazio e cria o arquivo 
     await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
     return [];
   }
}

//Função Auxiliar: Salvar no Arquivo JSON
async function salvarOcorrencias(ocorrencias) {
   await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

//Rota 1
app.get('/api/v1/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await lerOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (erro) {
        res.status(500).json({  erro: "Erro ao ler base de Dados em disco."});
    }
});

//Rota 1.1 - Filtrar por montadora
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();

        const filtradas = ocorrencias.filter(
            (o) => o.montadora.toLowerCase() === nome.toLowerCase()
        );

        res.status(200).json(filtradas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao ler base de Dados em disco." });
    }
});

//Rota 2 
app.post('/api/v1/ocorrencias', async (req, res) => {
    try {
        const { montadora, placa, descricao, gravidade } = req.body;

        if (!montadora || !placa || !descricao) {
            return res.status(400).json({ erro: "Montadora, placa e descriçâo sâo obrigatorias." });
        }

        const ocorrencias = await lerOcorrencias();
        const novasOcorrencias = { 
           id: Date.now(),
           montadora,
           placa,
           descricao, 
           gravidade: gravidade || "MEDIA",
           data_registro: new Date().toISOString()
        };

        ocorrencias.push(novasOcorrencias);
        await salvarOcorrencias(ocorrencias);

        res.status(201).json(novasOcorrencias);
      } catch (erro) {
          res.status(500).json({ erro: "Erro ao salvar ocorrência em disco."});
      }
});

//Rota 3 - Deletar ocorrência por ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ocorrencias = await lerOcorrencias();

        const existe = ocorrencias.some((o) => String(o.id) === String(id));

        if (!existe) {
            return res.status(404).json({ erro: "Ocorrência não encontrada." });
        }

        const ocorrenciasRestantes = ocorrencias.filter(
            (o) => String(o.id) !== String(id)
        );

        await salvarOcorrencias(ocorrenciasRestantes);

        res.status(200).json({ mensagem: "Ocorrência removida com sucesso." });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover ocorrência do disco." });
    }
});

app.listen(PORT, () => {
    console.log(`[Binàrio Tech] API de ocorrencias ativa na porta ${PORT}`);
});
