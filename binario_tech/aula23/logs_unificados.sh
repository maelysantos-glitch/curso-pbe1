#!/bin/bash
# Monitora em tempo real os logs combinados da API e do Redis

# Garante que o script rode na pasta onde está o docker-compose.yml
cd "$(dirname "$0")" || exit 1

echo "[Binário Tech] Monitorando logs de app e redis (Ctrl+C para sair)..."
docker compose logs -f --tail=20
# aula23 - ajuste final
