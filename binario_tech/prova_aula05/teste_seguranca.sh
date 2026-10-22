#!/bin/bash

LOG_FILE="audit_seguranca.log"

echo "===== Teste de Seguranca - $(date) =====" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

# 1. Três tentativas SEM chave de API
for i in {1..3}; do
  echo "--- Tentativa $i: SEM chave de API ---" >> "$LOG_FILE"
  curl -s -i -X POST http://localhost:3023/api/v1/motoristas \
    -H "Content-Type: application/json" \
    -d '{"nome": "Invasor", "cnh": "12345678901", "categoria": "B"}' >> "$LOG_FILE"
  echo -e "\n" >> "$LOG_FILE"
done

# 2. Uma tentativa COM chave de API válida
echo "--- Tentativa 4: COM chave de API valida ---" >> "$LOG_FILE"
curl -s -i -X POST http://localhost:3023/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: binario-tech-secret-2026" \
  -d '{"nome": "Motorista Valido", "cnh": "98765432100", "categoria": "B"}' >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

echo "===== Fim do teste =====" >> "$LOG_FILE"

echo "Teste concluido! Resultados salvos em $LOG_FILE" 
