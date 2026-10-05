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























-------------------------------------------------------------------------------
# Atividade | Aula 03 - CLI: curl, httpie, jq e gerenciamento de pacotes

Dia:04/10/2026

# Ambiente

- Google Cloud Shell
- curl
- httpie
- jq
- Node.js / npm

------

#Exercício 1 - GET com curl e jq

# Objetivo do exercício 

Efetuar uma requisição GET para a rota `/api/v1/scania` via cURL e usar o
`jq` para exibir somente a chave `modelo`. 

# Comando que eu utilizei

```bash
curl -s http://localhost:3000/api/v1/scania | jq '.modelo'
```

# Explicação de Cada parte 

| Parte | Função |
|---|---|
| `curl -s` | faz a requisição GET de forma silenciosa (sem barra de progresso) |
| `jq '.modelo'` | filtra o JSON de resposta e exibe apenas o campo `modelo` |


# Exercício 2 - Requisição com httpie e salvamento em arquivo

# Objetivo do exercício

Fazer uma requisição para a rota `/api/v1/mercedes` utilizando a ferramenta
`httpie` e salvar o resultado no arquivo `mercedes.json`.

# Comandos em q eu utilizei: 

```bash
http GET localhost:3000/api/v1/mercedes > mercedes.json
```
# Explicação

| Parte | Função |
|---|---|
| `http GET ...` | faz a requisição GET usando o httpie |
| `> mercedes.json` | redireciona a saída do comando para o arquivo |

----------------------------

# Exercício 3 - Leitura e filtro com jq

# Objetivo do exercício 

Utilizar o `jq` para ler o arquivo `mercedes.json` e filtrar apenas o valor
do campo `status`.

# Comando utilizado

```bash
jq '.status' mercedes.json
```

------------------------------

# Exercício 4 - Nova rota na aplicação

# Objetivo do exercício 

Editar o arquivo `telemetria.js` e adicionar uma nova rota `/api/v1/volvo`
retornando os dados do modelo `FH 540`. Reiniciar a aplicação e testar a
rota.

# O que foi feito

1. Abri o arquivo `telemetria.js`.
2. Adicionei a rota `/api/v1/volvo`, retornando um JSON com o modelo `FH 540`.
3. Reiniciei a aplicação (via PM2 ou `node telemetria.js`).
4. Testei a rota nova com curl.

# Trecho adicionado em `telemetria.js`

```js
app.get('/api/v1/volvo', (req, res) => {
  res.json({ modelo: "FH 540", status: "ativo" });
});
```
# Como testar?

```bash
pm2 restart telemetria
curl -s http://localhost:3000/api/v1/volvo
```

--------------------------------------------

# Exercício 5 - Script "start" no package.json

# Objetivo do exercício 

Configurar o arquivo `package.json` adicionando um script `"start": "node telemetria.js"`.
Testar a execução usando `npm start`.

Configurar o arquivo `package.json` adicionando um script `"start": "node telemetria.js"`.
Testar a execução usando `npm start`.

# Trecho adicionado em `package.json`

```json
"scripts": {
  "start": "node telemetria.js"
}
```

# Como testar

```bash
npm start
```
-------------------------------------------------------------

# Exercício 6 - Redirecionar resultado de auditoria para log

# Objetivo

Criar um comando que direcione o resultado da auditoria do script
`testar_telemetria.sh` para um arquivo de log chamado `relatorio.log`.

Código feito:

#!/bin/bash
echo "======================================="
echo "Auditoria De Telemetria - Binario Tech "
echo " Data/Hora: $(date)"
echo "======================================="

echo -e "\n[1] Testando Rota Scania..."
curl -s http://localhost:3001/api/v1/scania|jq .

echo -e "\n[2] Testando Rota Mercedes-Benz..."
curl -s http://localhost:3001/api/v1/mercedes|jq .

echo -e "\n[3] Testando Rota Volkswagen..."
curl -s http://localhost:3001/api/v1/vw | jq . 

echo -e "\n----------------------------------"
echo "Auditoria Finalizada com Sucesso!"

# Comando utilizado

```bash
./testar_telemetria.sh > relatorio.log
```
# Explicação

| Parte | Função |
|---|---|
| `./testar_telemetria.sh` | executa o script de auditoria |
| `> relatorio.log` | redireciona toda a saída do script para o arquivo de log |

---
# Exercício 7 - Filtrar múltiplos campos em uma única chamada jq

# Objetivo

Filtrar a resposta da rota `/api/v1/vw` para exibir apenas os campos
`montadora` e `status` em uma única chamada `jq`.


# Comando utilizado

```bash
curl -s http://localhost:3000/api/v1/vw | jq '{montadora, status}'
```
# Explicação

| Parte | Função |
|---|---|
| `jq '{montadora, status}'` | monta um novo objeto JSON contendo apenas os campos `montadora` e `status` |

------------------------------------------

# Exercício 8 - Localizar e encerrar processo Node.js

# Objetivo da atividade

Localizar o PID do processo Node.js em execução no terminal usando
`ps aux | grep node` e encerrá-lo com o comando `kill -9 <PID>`.

# Comandos utilizados

```bash
ps aux | grep node
kill -9 <PID>
```

# Explicação

| Parte | Função |
|---|---|
| `ps aux` | lista todos os processos em execução, com detalhes |
| `grep node` | filtra a lista, mostrando só os processos relacionados ao Node.js |
| `kill -9 <PID>` | encerra o processo imediatamente, usando o PID identificado |

-----------------------------------------------------

# Comandos Git utilizados

```bash
git add .
git commit -m "Adiciona atividade aula03 (curl, httpie, jq)"
git push origin main
``` 














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




