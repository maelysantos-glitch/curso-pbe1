Histórico de Atualizações
10/09/2026: Alteração da porta padrão da aplicação de 3000 para 3023.


# Atividade | Aula 01 - PBE1 (Binário Tech)

Programação Back-end 1 - Consultoria Binário Tech.

## Ambiente

- Google Cloud Shell
- Editor de texto nano
- Linux (comandos básicos)

-------------------

# Exercício 1 - Criar arquivo dev.json com nano

# Objetivo

Criar um arquivo chamado `dev.json` usando o editor de texto `nano` e
inserir uma estrutura básica em JSON com informações pessoais.

# O que foi feito

1. Abri o editor nano para criar o arquivo:
```bash
   nano dev.json
```

2. Digitei a estrutura JSON com os dados pedidos.
3. Salvei o arquivo com `Ctrl+O`, `Enter`, e saí do editor com `Ctrl+X`.

# Conteúdo do `dev.json`

```json
{
  "nome": "Seu Nome Completo",
  "cargo": "Desenvolvedor Jr",
  "montadora_favorita": "Scania",
  "status": "Ativo"
}
```

---------------------------------------------

# Exercício 2 - Visualizar o conteúdo do arquivo

# Objetivo

Visualizar o conteúdo do arquivo criado diretamente no terminal.

# Comando utilizado

```bash
cat dev.json
```

# Explicação

| Parte | Função |
|---|---|
| `cat dev.json` | exibe o conteúdo completo do arquivo no terminal |

---------------------------------------------

 Exercício 3 - Contar o número de linhas do arquivo

# Objetivo

Contar o número de linhas do arquivo usando um comando do Linux.

# Comando utilizado

```bash
wc -l dev.json
```

#Explicação

| Parte | Função |
|---|---|
| `wc -l` | conta o número de linhas do arquivo informado |

---
# Comandos Git utilizados

```bash
git add dev.json
git commit -m "Adiciona atividade aula01 (dev.json)"
git push origin main
```
------------------------------------

#AULA 03 - PROVA 

1. CRIAR O PROJETO
Entre no diretório do projeto:
cd ~/binario_tech
Crie a pasta da prova:
mkdir -p prova_aula03
cd prova_aula03
Confira o diretório:
pwd

3. CONFIGURAR O NODE.JS
Inicialize o projeto:
npm init -y
Instale o Express:
npm install express
Instale jq e httpie:
sudo apt-get update
sudo apt-get install -y jq httpie
Confira as instalações:
jq --version
http --version

5. CRIAR O SERVIDOR
Crie:
nano telemetria.js
telemetria.js — arquivo completo

const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/v1/scania", (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "R450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

app.get("/api/v1/mercedes", (req, res) => {
    res.json({
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "OK",
        conexao: true,
        velocidade_media: 78
    });
});

app.get("/api/v1/vw", (req, res) => {
    res.json({
        montadora: "Volkswagen",
        modelo: "Delivery",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de telemetria rodando na porta ${PORT}`);
});
Salve:
CTRL + O
ENTER
CTRL + X
4. EXECUTAR O SERVIDOR
Execute em segundo plano:
node telemetria.js &
A aplicação utiliza a porta:
3023
5. TESTAR AS ROTAS EXISTENTES
Scania
curl -s http://localhost:3023/api/v1/scania | jq .
Deve retornar:
{
  "montadora": "Scania",
  "modelo": "R450",
  "status": "OK",
  "conexao": true,
  "velocidade_media": 82
}
Mercedes-Benz
curl -s http://localhost:3023/api/v1/mercedes | jq .
Deve retornar:
{
  "montadora": "Mercedes-Benz",
  "modelo": "Actros",
  "status": "OK",
  "conexao": true,
  "velocidade_media": 78
}
Volkswagen
curl -s http://localhost:3023/api/v1/vw | jq .
Deve retornar:
{
  "montadora": "Volkswagen",
  "modelo": "Delivery",
  "status": "ALERTA",
  "conexao": false,
  "velocidade_media": 0
}
6. ADICIONAR A ROTA VOLVO
A prova exige uma quarta rota:
/api/v1/volvo
Dados da Volvo:
montadora: Volvo
modelo: FH 540
status: ALERTA
conexao: false
velocidade_media: 0
Antes de reiniciar, encerre o servidor atual:
ps aux | grep node
Encontre o PID de:
node telemetria.js
Encerre:
kill -9 PID
Agora edite:
nano telemetria.js
telemetria.js — arquivo completo atualizado
const express = require("express");

const app = express();
const PORT = 3023;

app.use(express.json());

app.get("/api/v1/scania", (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "R450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

app.get("/api/v1/mercedes", (req, res) => {
    res.json({
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "OK",
        conexao: true,
        velocidade_media: 78
    });
});

app.get("/api/v1/vw", (req, res) => {
    res.json({
        montadora: "Volkswagen",
        modelo: "Delivery",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.get("/api/v1/volvo", (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de telemetria rodando na porta ${PORT}`);
});

Salve o arquivo.
Inicie novamente:
node telemetria.js &
Teste a nova rota:
curl -s http://localhost:3023/api/v1/volvo | jq .

7. TESTAR HTTPie E CRIAR mercedes.json
Faça uma requisição para Mercedes usando HTTPie:
http GET http://localhost:3001/api/v1/mercedes > mercedes.json
Confira:
cat mercedes.json
Visualize formatado:
cat mercedes.json | jq .
O arquivo mercedes.json deve conter os dados da rota Mercedes.

8. USAR jq PARA FILTRAR OS DADOS 
Scania — somente modelo
curl -s http://localhost:3023/api/v1/scania | jq '.modelo'
Resultado:
"R450"
Mercedes — somente status
jq '.status' mercedes.json
Resultado:
"OK"
Volkswagen — somente montadora e status
curl -s http://localhost:3023/api/v1/vw | jq '{montadora, status}'
Resultado:
{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}
10. CRIAR O SCRIPT DE TELEMETRIA
Crie:
nano testar_telemetria.sh
testar_telemetria.sh — arquivo completo
#!/bin/bash

echo "========================================="
echo "  AUDITORIA DE TELEMETRIA - BINARIO TECH "
echo "  Data/Hora: $(date)"
echo "========================================="

echo -e "\n[1] Testando Rota Scania..."
curl -s http://localhost:3023/api/v1/scania | jq .

echo -e "\n[2] Testando Rota Mercedes-Benz..."
curl -s http://localhost:3023/api/v1/mercedes | jq .

echo -e "\n[3] Testando Rota Volkswagen..."
curl -s http://localhost:3023/api/v1/vw | jq .

echo -e "\n[4] Testando Rota Volvo..."
curl -s http://localhost:3023/api/v1/volvo | jq .

echo -e "\n-----------------------------------------"
echo "Auditoria finalizada com sucesso!"
Dê permissão:
chmod +x testar_telemetria.sh
Confira:
ls -l testar_telemetria.sh
Execute:
./testar_telemetria.sh
10. CRIAR O relatorio.log
Salve toda a saída do script:
./testar_telemetria.sh > relatorio.log
Confira o conteúdo:
cat relatorio.log
Confira o arquivo:
ls -l relatorio.log
O relatorio.log deve conter a execução das quatro rotas.
11. CONFIGURAR O package.json
Abra:
nano package.json
O arquivo precisa possuir o script:
"start": "node telemetria.js"
O package.json completo deverá manter as informações geradas pelo npm e ficar semelhante a:
{
  "name": "prova_aula03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node telemetria.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
Se o npm instalou outra versão do Express, mantenha a versão que já estiver no seu arquivo.
O importante é possuir:
"start": "node telemetria.js"
12. TESTAR npm start
Se o servidor estiver rodando, localize:
ps aux | grep node
Encerre:
kill -9 PID
Execute:
npm start
Deve aparecer:
Servidor de telemetria rodando na porta 3001
Para parar:
CTRL + C
13. IDENTIFICAR E ENCERRAR O PROCESSO
Execute:
node telemetria.js &
Procure o processo:
ps aux | grep node
Localize:
node telemetria.js
Pegue o PID e execute:
kill -9 PID
Confirme:
ps aux | grep node
14. CONFERIR OS ARQUIVOS
Execute:
ls -la
A pasta deverá possuir os principais arquivos:
mercedes.json
package.json
package-lock.json
relatorio.log
telemetria.js
testar_telemetria.sh
15. GIT
Confira o status:
git status
Confira a branch:
git branch
A prova deve ser entregue na:
main
Adicione os arquivos:
git add telemetria.js mercedes.json testar_telemetria.sh relatorio.log package.json package-lock.json
Confira:
git status
Faça o commit:
git commit -m "prova pratica aula 03"
Atualize o repositório:
git pull origin main
Envie para o GitHub:
git push origin main
16. O QUE PRECISA ESTAR PRONTO
API
A aplicação deve possuir:
GET /api/v1/scania
GET /api/v1/mercedes
GET /api/v1/vw
GET /api/v1/volvo
Porta:
3023
Arquivos
Você precisa ter:
prova_aula03/
├── telemetria.js
├── testar_telemetria.sh
├── mercedes.json
├── relatorio.log
├── package.json
└── package-lock.json
Comandos que precisam funcionar
curl -s http://localhost:3023/api/v1/scania | jq '.modelo'
http GET http://localhost:3023/api/v1/mercedes > mercedes.json
jq '.status' mercedes.json
curl -s http://localhost:3023/api/v1/vw | jq '{montadora, status}'
curl -s http://localhost:3023/api/v1/volvo | jq .
./testar_telemetria.sh
./testar_telemetria.sh > relatorio.log
npm start
ps aux | grep node
kill -9 PID
git push origin main


------------------------------------------------------------


Dia 24/09/2026
Aula 19:

# Exercício 1 - Limite de memória com PM2

Curso PBE1 (Binário Tech).

# objetivo

Configurar o PM2 para limitar o uso máximo de memória do processo
`api-telemetria` a 100MB. Se o processo ultrapassar esse limite, o PM2
reinicia o processo automaticamente.

#Ambiente
. Google Cloud Shell
. Node.js
. PM2

1 - instalei o PM2 
```bash
npm install -g pm2
```
2 - Iniciei a aplicação com o nome `api-telemetria` e o limite de memória:
```bash
   pm2 start app.js --name api-telemetria --max-memory-restart 100M
```
3 - Confirmei que o processo está rodando:
```bash
   pm2 list
```
4 - Verifiquei que o limite foi aplicado:
```bash
   pm2 show api-telemetria
```
No resultado, o campo `max memory restart` aparece com o valor 100M.
5 - Versionei o projeto com Git e enviei para o repositório.

## Explicação do comando

| Parte | Função |
|---|---|
| `pm2 start app.js` | inicia a aplicação com o PM2 |
| `--name api-telemetria` | dá o nome `api-telemetria` ao processo |
| `--max-memory-restart 100M` | reinicia o processo se a memória passar de 100MB |

O PM2 verifica o consumo de memória periodicamente (em intervalos de cerca de
30 segundos), então o reinício não acontece no instante exato em que o limite é
ultrapassado.

## Alternativa: arquivo ecosystem

```js
module.exports = {
 apps: [{
   name: "api-telemetria",
   script: "app.js",
   max_memory_restart: "100M"
   }]
};
```
e ser iniciada com:

```bash
pm2 start ecosystem.config.js
```
# Como Verificar?
```bash
pm2 list                  # status do processo
pm2 show api-telemetria   # detalhes, incluindo o limite de memória
pm2 monit                 # monitoramento de CPU e memória em tempo real
```
#Comandos Git utilizados

```bash
git init
git add .
git commit -m "Configura PM2 com limite de memória de 100MB"
git remote add origin <url-do-repositorio>
git push -u origin main
```
# Exercício 2 - Arquivo de ecossistema do PM2

# Objetivo

Criar o arquivo `ecosystem.config.js` para a aplicação `aula19`, definindo
variáveis de ambiente diferentes para Desenvolvimento e Produção, para que a
aplicação possa ser iniciada em cada ambiente sem precisar alterar o código.

# O que foi feito

1. Criei o arquivo `ecosystem.config.js` na raiz do projeto da `aula19`.
2. Dentro dele, defini o processo da aplicação (nome e script principal).
3. Criei o bloco `env_development` com as variáveis usadas em desenvolvimento.
4. Criei o bloco `env_production` com as variáveis usadas em produção.
5. Testei o início da aplicação em cada ambiente usando a flag `--env`.
6. Conferi com `pm2 show aula19` se as variáveis corretas foram carregadas.
7. Versionei o arquivo com Git e enviei para o repositório.

### Conteúdo do `ecosystem.config.js`

```js
module.exports = {
  apps: [{
    name: "aula19",
    script: "app.js",

    env_development: {
      NODE_ENV: "development",
      PORT: 3000
    },

    env_production: {
      NODE_ENV: "production",
      PORT: 3023
    }
  }]
};
```
 Explicação do arquivo

| Parte | Função |
|---|---|
| `name` | nome do processo no PM2 |
| `script` | arquivo principal da aplicação |
| `env_development` | variáveis carregadas ao iniciar com `--env development` |
| `env_production` | variáveis carregadas ao iniciar com `--env production` |
| `NODE_ENV` | indica ao Node.js/framework em qual ambiente a aplicação está rodando |
| `PORT` | porta usada pela aplicação em cada ambiente |

# Como executar cada comando 

```bash
#ambiente de desenvolvimento
pm2 start ecosystem.config.js --env development

# ambiente de produção
pm2 start ecosystem.config.js --env production
```

### Como verificar

```bash
pm2 show aula19
```

No resultado, o bloco de variáveis de ambiente (`env`) mostra os valores do
ambiente escolhido ao iniciar o processo.

# Comandos Git utilizados

```bash
git add ecosystem.config.js
git commit -m "Adiciona ecosystem.config.js com env de dev e produção (exercício 2)"
git push
```
# Exercício 3 - Persistência da lista de processos do PM2

# Objetivo

Escrever um comando em Bash que salve a lista de processos ativos do PM2,
para que eles sejam reiniciados automaticamente caso o sistema operacional
seja reiniciado.

# O que foi feito

1. Com os processos já rodando no PM2 (`pm2 list`), executei o comando de
   salvamento da lista atual.
2. O PM2 gravou o estado dos processos em um arquivo de dump (`dump.pm2`),
   usado para restaurar a lista depois de um reinício.
3. Configurei o PM2 para iniciar junto com o sistema operacional, gerando o
   script de inicialização com `pm2 startup`.
4. Testei reiniciando o serviço/sistema e conferi que os processos voltaram
   a rodar.
# Comandos que foram utilizados 
```bash
pm2 save
```
#Explicação do comando
 | Parte | Função | 
 |---|---|
 | `pm2 save`| salva a lista atual de processos ativos do PM2 em um arquivo de dump, para restauração futura |

 # Comando complementar (inicialização automática no boot)

O `pm2 save` sozinho só salva a lista. Para que o PM2 volte a rodar
automaticamente depois que o sistema operacional reiniciar, também é
necessário registrar o PM2 como serviço do sistema:

```bash
pm2 startup
```

Esse comando gera outro comando (com `sudo`) que precisa ser executado uma
vez para configurar o serviço. Depois disso, o `pm2 save` garante que a
lista salva seja restaurada a cada boot.

# Como verificar

```bash
pm2 list          # confirma os processos ativos antes de salvar
pm2 save          # salva a lista
pm2 resurrect     # restaura manualmente a lista salva (simula o efeito do boot)
```
# Comandos Git utilizados

```bash
git add .
git commit -m "Adiciona comando de persistência do PM2 (exercício 3)"
git push
```
# Exercício 4 - Commit e push das alterações para o GitHub

# objetivo 

Realizar o commit e o push das alterações da `aula19` para a branch `main`
do GitHub, garantindo que o versionamento no repositório remoto fique
correto e atualizado.
# O que foi feito

1. Conferi o status do repositório para ver quais arquivos foram alterados.
2. Adicionei os arquivos modificados à área de staging.
3. Criei o commit com uma mensagem descrevendo as alterações.
4. Confirmei que estava na branch `main`.
5. Enviei o commit para o repositório remoto no GitHub com `git push`.
6. Verifiquei no GitHub se as alterações apareceram corretamente.

# O que foi feito??

1. Conferi o status do repositório para ver quais arquivos foram alterados.
2. Adicionei os arquivos modificados à área de staging.
3. Criei o commit com uma mensagem descrevendo as alterações.
4. Confirmei que estava na branch `main`.
5. Enviei o commit para o repositório remoto no GitHub com `git push`.
6. Verifiquei no GitHub se as alterações apareceram corretamente.

# Comandos utilizados
```bash
git status                              # verifica o que foi alterado
git add .                               # adiciona todas as alterações
git commit -m "Atualiza aula19"         # cria o commit
git branch                              # confirma que está na branch main
git push origin main                    # envia para o GitHub
```
# Explicação dos comandos

| Comando | Função |
|---|---|
| `git status` | mostra arquivos modificados, novos ou não versionados |
| `git add .` | move as alterações para a área de staging (prontas para commit) |
| `git commit -m "..."` | grava as alterações no histórico local, com uma mensagem explicando o que mudou |
| `git branch` | lista as branches e mostra em qual está posicionado (marcada com `*`) |
| `git push origin main` | envia os commits locais para a branch `main` no repositório remoto (`origin`) |

# Como verificar

```bash
git log --oneline -5      # confere os últimos commits locais
git status                # confirma que não sobrou nada pendente ("nothing to commit")
```
No GitHub, é só abrir o repositório e conferir se o commit aparece na lista
de commits da branch `main`, com a mensagem e o horário corretos.

# Comandos Git utilizados

```bash
git add .
git commit -m "Finaliza alterações da aula19 (exercício 4)"
git push origin main
```

Aula 04 – API de Frotas (Rotas RESTful)
Binário Tech · Curso PBE1
A avaliação é composta pelos exercícios práticos de Arquitetura HTTP e rotas RESTful (GET, POST, PATCH, PUT, DELETE). Em todos os arquivos e comandos a porta é 3023.
Passo 1 – Preparar a pasta e instalar o Express
Entre na pasta da aula e crie o package.json (no nano: Ctrl+O, Enter para salvar e Ctrl+X para sair):
cd ~/curso-pbe1/binario_tech/Aula04
nano package.json
Conteúdo do package.json:
{
  "name": "aula04",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
Depois instale as dependências:
npm install
Passo 2 – Criar o arquivo frota_api.js
nano frota_api.js
Conteúdo do frota_api.js:
const express = require('express');
const app = express();
const PORT = 3023;

app.use(express.json());

let veiculos = [
  { id: 1, placa: "ABC-1234", montadora: "Scania", modelo: "R450", status: "DISPONIVEL" },
  { id: 2, placa: "XYZ-9876", montadora: "Mercedes-Benz", modelo: "Actros", status: "EM_ROTA" }
];

// GET - lista veiculos (aceita filtro ?status=)
app.get('/api/v1/veiculos', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtrados = veiculos.filter(v => v.status.toUpperCase() === status.toUpperCase());
    return res.status(200).json(filtrados);
  }
  res.status(200).json(veiculos);
});

// GET - busca um veiculo pelo id
app.get('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find(v => v.id === id);
  if (!veiculo) {
    return res.status(404).json({ erro: "veiculo nao encontrado na base de dados." });
  }
  res.status(200).json(veiculo);
});

// POST - cadastra um novo veiculo
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo } = req.body;
  if (!placa || !montadora || !modelo) {
    return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios." });
  }
  const novoVeiculo = {
    id: veiculos.length + 1,
    placa,
    montadora,
    modelo,
    status: "DISPONIVEL"
  };
  veiculos.push(novoVeiculo);
  res.status(201).json(novoVeiculo);
});

// PATCH - atualiza somente o status
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const veiculo = veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }
  if (!status) {
    return res.status(400).json({ erro: "O campo 'status' e obrigatorio." });
  }

  veiculo.status = status.toUpperCase();
  res.status(200).json({ mensagem: "Status atualizado com sucesso!", veiculo });
});

// DELETE - remove um veiculo
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex(v => v.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }
  veiculos.splice(index, 1);
  res.status(200).json({ mensagem: `Veiculo ID ${id} removido com sucesso.` });
});

// (a rota PUT sera adicionada aqui na atividade 7, antes do app.listen)

app.listen(PORT, () => {
  console.log(`[Binario Tech] API de frotas rodando em http://localhost:${PORT}`);
});
Passo 3 – Subir o servidor
node frota_api.js
Deixe esse terminal aberto com o servidor rodando. Os comandos curl devem ser executados em outro terminal (botão + do Cloud Shell). Quando alterar o frota_api.js, pare o servidor com Ctrl+C e suba de novo.
Passo 4 – Criar o script teste_crud.sh
nano teste_crud.sh
Conteúdo do teste_crud.sh:
#!/bin/bash

BASE_URL="http://localhost:3023/api/v1/veiculos"
LOG_FILE="crud_result.log"

echo "===== Execucao iniciada em $(date) =====" > "$LOG_FILE"

log() {
  echo "$1" | tee -a "$LOG_FILE"
}

log ""
log "----- Passo 1: Cadastrando veiculo 1 (Volvo FH 540) -----"
RESPOSTA_1=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa": "KLL-9090", "montadora": "Volvo", "modelo": "FH 540"}')

BODY_1=$(echo "$RESPOSTA_1" | sed '$d')
STATUS_1=$(echo "$RESPOSTA_1" | tail -n1 | cut -d':' -f2)
ID_1=$(echo "$BODY_1" | jq -r '.id')

log "Status HTTP: $STATUS_1"
log "Resposta: $BODY_1"
log "ID do veiculo 1: $ID_1"

log ""
log "----- Passo 2: Cadastrando veiculo 2 (Scania R450) -----"
RESPOSTA_2=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa": "SCN-2025", "montadora": "Scania", "modelo": "R450"}')

BODY_2=$(echo "$RESPOSTA_2" | sed '$d')
STATUS_2=$(echo "$RESPOSTA_2" | tail -n1 | cut -d':' -f2)
ID_2=$(echo "$BODY_2" | jq -r '.id')

log "Status HTTP: $STATUS_2"
log "Resposta: $BODY_2"
log "ID do veiculo 2: $ID_2"

log ""
log "----- Passo 3: Atualizando status do veiculo 1 (ID $ID_1) para EM_ROTA -----"
RESPOSTA_3=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PATCH "$BASE_URL/$ID_1/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}')

BODY_3=$(echo "$RESPOSTA_3" | sed '$d')
STATUS_3=$(echo "$RESPOSTA_3" | tail -n1 | cut -d':' -f2)

log "Status HTTP: $STATUS_3"
log "Resposta: $BODY_3"

log ""
log "----- Passo 4: Deletando veiculo 2 (ID $ID_2) -----"
RESPOSTA_4=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X DELETE "$BASE_URL/$ID_2")

BODY_4=$(echo "$RESPOSTA_4" | sed '$d')
STATUS_4=$(echo "$RESPOSTA_4" | tail -n1 | cut -d':' -f2)

log "Status HTTP: $STATUS_4"
log "Resposta: $BODY_4"

log ""
log "===== Execucao finalizada em $(date) ====="
log ""
log "Resumo:"
log "  Veiculo 1 (ID $ID_1) - cadastrado e atualizado para EM_ROTA"
log "  Veiculo 2 (ID $ID_2) - cadastrado e deletado"

echo ""
echo "Script finalizado. Log completo salvo em: $LOG_FILE"
Dê permissão de execução e rode:
chmod +x teste_crud.sh
./teste_crud.sh
Atividades
Atividade 1 – Buscar o veículo de ID 1
curl -s http://localhost:3023/api/v1/veiculos/1 | jq
Atividade 2 – Cadastrar um veículo (POST)
curl -i -X POST http://localhost:3023/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa": "KLL-9090", "montadora": "Volvo", "modelo": "FH 540"}'
Atividade 3 – Cadastrar outro veículo (POST)
curl -i -X POST http://localhost:3023/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa": "ABC1D23", "montadora": "Volvo", "modelo": "FH 540"}'
Atividade 4 – Filtrar por status
curl -s "http://localhost:3023/api/v1/veiculos?status=DISPONIVEL" | jq
Atividade 5 – Buscar o veículo 3 e listar todos
curl -s http://localhost:3023/api/v1/veiculos/3 | jq
curl -s http://localhost:3023/api/v1/veiculos | jq
Atividade 6 – PATCH e DELETE
Atualizar o status (PATCH):
curl -i -X PATCH http://localhost:3023/api/v1/veiculos/3/status \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'
Remover o veículo (DELETE). Rode o PATCH primeiro, porque depois do DELETE o ID 3 deixa de existir:
curl -i -X DELETE http://localhost:3023/api/v1/veiculos/3
Conferir o resultado:
curl -s http://localhost:3023/api/v1/veiculos/3 | jq
Se o ID 3 já tiver sido apagado, liste os que existem com curl -s http://localhost:3023/api/v1/veiculos | jq e use um deles, ou cadastre um novo com o POST da atividade 3.
Atividade 7 – Nova rota PUT
Adicione a rota PUT no frota_api.js, antes do app.listen(...). Ela substitui todos os dados de um veículo de uma só vez:
app.put('/api/v1/veiculos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const veiculo = veiculos.find(v => v.id == id);

  if (!veiculo) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ erro: "Campos 'placa', 'montadora', 'modelo' e 'status' sao obrigatorios." });
  }

  veiculo.placa = placa;
  veiculo.montadora = montadora;
  veiculo.modelo = modelo;
  veiculo.status = status.toUpperCase();

  res.status(200).json(veiculo);
});
Reinicie o servidor (Ctrl+C e node frota_api.js) e teste:
curl -i -X PUT http://localhost:3023/api/v1/veiculos/3 \
  -H "Content-Type: application/json" \
  -d '{"placa": "NEW-0001", "montadora": "Volvo", "modelo": "FH 460", "status": "DISPONIVEL"}'
Atividade 8 – Rodar o teste_crud.sh
Use o teste_crud.sh do Passo 4 (já com a porta 3023) e execute:
./teste_crud.sh
O servidor guarda os dados só em memória: para voltar ao estado inicial, pare e suba o frota_api.js de novo. 

