#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/telemetria"
LOG_FILE="auditoria.log"

# Zera o log a cada nova execução, com um cabeçalho
echo "=====================================================" > "$LOG_FILE"
echo " AUDITORIA COMPLETA - BINÁRIO TECH" >> "$LOG_FILE"
echo " Executado em: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "=====================================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "Iniciando auditoria completa das rotas..."

# --- Rota Scania ---
echo "[1] Consultando Telemetria Scania..." | tee -a "$LOG_FILE"
curl -s "$BASE_URL/scania" | jq . >> "$LOG_FILE" 2>&1
echo "" >> "$LOG_FILE"

# --- Rota Mercedes ---
echo "[2] Consultando Telemetria Mercedes-Benz..." | tee -a "$LOG_FILE"
curl -s "$BASE_URL/mercedes" | jq . >> "$LOG_FILE" 2>&1
echo "" >> "$LOG_FILE"

# --- Rota inexistente (Volvo) - teste do 404 ---
echo "[3] Testando Endpoint Inexistente (Volvo)..." | tee -a "$LOG_FILE"
curl -s "$BASE_URL/volvo" | jq . >> "$LOG_FILE" 2>&1
echo "" >> "$LOG_FILE"

echo "=====================================================" >> "$LOG_FILE"
echo " AUDITORIA FINALIZADA" >> "$LOG_FILE"
echo "=====================================================" >> "$LOG_FILE"

echo "Auditoria concluída! Resultados salvos em $LOG_FILE" 
