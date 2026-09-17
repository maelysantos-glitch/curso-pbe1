#!/bin/bash
echo "=========================================================="
echo " AUDITORIA DE AUTENTICAÇÃO JWT - AULA 14 EXTENDIDA"
echo "=========================================================="

PORT=3023
URL_BASE="http://localhost:$PORT/api/v1/auth"

echo -e "\n Registrando novo Usuário Operador..."
curl -s -X POST $URL_BASE/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "operador@binariotech.com.br", "senha": "SenhaSegural23!", "perfil": "ADMIN" }' | jq .

echo -e "\n Realizando Login e obtendo JWT..."
LOGIN_RESP=$(curl -s -X POST $URL_BASE/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "operador@binariotech.com.br", "senha": "SenhaSegural23!" }')

echo $LOGIN_RESP | jq .

TOKEN=$(echo $LOGIN_RESP | jq -r '.token')

echo -e "\n Tentando acessar Rota Protegida SEM Token (Esperado HTTP 401)..."
curl -s $URL_BASE/perfil | jq .

echo -e "\n Acessando Rota Protegida COM Token JWT Válido (Esperado HTTP 200)..."
curl -s $URL_BASE/perfil \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n Validando Payload Interno do Token JWT Decodificado..."
curl -s $URL_BASE/perfil \
  -H "Authorization: Bearer $TOKEN" | jq .
