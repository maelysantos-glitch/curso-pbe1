#!/bin/bash

URL="http://localhost:3000/api/v1/motoristas"
LOG_FILE="audit_seguranca.log"
API_KEY_VALIDA="binario-tech-secret-2026" 

echo "===== Teste de Seguranca - $(date) =====" > "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Tentativa 1: SEM chave de API ---" >> "$LOG_FILE"
curl -s -i "$URL" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Tentativa 2: SEM chave de API ---" >> "$LOG_FILE"
curl -s -i "$URL" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Tentativa 3: SEM chave de API ---" >> "$LOG_FILE"
curl -s -i "$URL" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Tentativa 4: COM chave de API valida ---" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: $API_KEY_VALIDA" "$URL" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "===== Fim do teste =====" >> "$LOG_FILE"

echo "Teste concluido! Resultados salvos em $LOG_FILE" 
