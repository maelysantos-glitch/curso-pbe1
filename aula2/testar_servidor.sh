#!/bin/bash

BASE_URL="http://localhost:3000"

echo "===== Iniciando testes do servidor ====="
echo ""

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota /status"
curl -s "$BASE_URL/status" | jq
echo ""

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota /scania/info"
curl -s "$BASE_URL/scania/info" | jq
echo ""

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota /vw/info"
curl -s "$BASE_URL/vw/info" | jq
echo ""

echo "===== Testes finalizados =====" 
