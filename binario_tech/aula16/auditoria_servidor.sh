#!/bin/bash
echo "==================--=================="
echo " AUDITORIA DE SERVIDOR - BINÁRIO TECH"
echo "====================================="

echo "Listando os processos de node.js ativos no servidor e enviando para o arquivo..."
ps aux | grep node >> processos.log

echo "Veja o Resultado da Lista:"
sleep 2
cat processos.log 
