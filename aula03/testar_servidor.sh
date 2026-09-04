#!/bin/bash

BASE_URL="http://localhost:3000"

ROTAS=("/status" "/scania/info" "/vw/info")

echo "=========================================="
echo " Iniciando testes do servidor: $BASE_URL"
echo "=========================================="
echo ""

for ROTA in "${ROTAS[@]}"; do
    HORARIO=$(date "+%Y-%m-%d %H:%M:%S")
    echo "----------------------------------------"
    echo "Teste: $ROTA"
    echo "Horário: $HORARIO"
    echo "----------------------------------------"

    RESPOSTA=$(curl -s -o /tmp/resposta_corpo.txt -w "%{http_code}" "$BASE_URL$ROTA")

    echo "Código HTTP: $RESPOSTA"
    echo "Corpo da resposta:"
    cat /tmp/resposta_corpo.txt
    echo ""
    echo ""
done

echo "=========================================="
echo " Testes finalizados."
echo "=========================================="

rm -f /tmp/resposta_corpo.txt
