#!/bin/bash

echo "Limpando containers inativos..."

docker container prune -f

echo "Limpando imagens pendentes..."

docker image prune -f

echo "Limpeza concluída!" 
