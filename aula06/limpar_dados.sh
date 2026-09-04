#!/bin/bash

echo "=========================================="
echo " LIMPEZA DE AMBIENTE - BINARIO TECH "
echo "=========================================="

echo -e "\n[1] Encerrando processo Node.js da API..."
if pgrep -f "node ocorrencias_api.js" > /dev/null; then
    pkill -9 -f "node ocorrencias_api.js"
    echo "Processo encerrado com sucesso."
else
    echo "Nenhum processo da API estava rodando."
fi

echo -e "\n[2] Removendo arquivo ocorrencias.json..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "Arquivo ocorrencias.json removido com sucesso."
else
    echo "Arquivo ocorrencias.json não encontrado (já estava limpo)."
fi

echo -e "\n[3] Ambiente resetado. Pronto para novos testes."
