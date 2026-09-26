#!/bin/bash
echo "Analisando as últimas 15 linhas do access.log..."
echo "Requisições com status 200 OK:"
echo "--------------------------------"

tail -n 15 /var/log/nginx/access.log | grep '" 200 '

echo "--------------------------------"
echo "Análise concluída." 
