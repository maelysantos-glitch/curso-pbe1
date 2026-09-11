#!/bin/bash

# URL base da API (ajuste conforme necessário)
BASE_URL="http://localhost:3023"

# Faz a requisição GET e captura apenas o HTTP status code
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/v1/health")

# Grava o status code no arquivo de log, com data/hora
echo "$(date '+%Y-%m-%d %H:%M:%S') - Status: $HTTP_STATUS" >> health_check.log

echo "Health check concluído. Status: $HTTP_STATUS" 
