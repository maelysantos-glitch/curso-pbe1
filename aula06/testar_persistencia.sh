#!/bin/bash

echo "======================================================================="
echo " AUDITORIA DE PERSISTENCIA EM DISCO - BINARIO TECH "
echo "======================================================================="

echo -e "\n[1] Cadastrando ocorrencia Scania..."
curl -s -X POST http://localhost:3000/api/v1/ocorrencias \
        -H "Content-Type: application/json" \
        -d '{"montadora":"Scania","placa":"SCA-988","descricao":"Superaquecimento de motor", "gravidade":"ALTA"}' | jq .

echo -e "\n[2] Cadastrando ocorrencia Mercedes-Benz..."
curl -s -X POST http://localhost:3000/api/v1/ocorrencias \
        -H "Content-Type: application/json" \
        -d '{"montadora": "Mercedes-Benz","placa":"MBB-1122","descricao":"Troca de pastilhas de freio", "gravidade":"BAIXA"}' | jq .

echo -e "\n[3] Lendo arquivo JSON direto do disco (cat ocorrencias.json)..."
        cat ocorrencias.json | jq  .
