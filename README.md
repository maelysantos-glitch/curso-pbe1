Histórico de Atualizações
10/09/2026: Alteração da porta padrão da aplicação de 3000 para 3023.

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




