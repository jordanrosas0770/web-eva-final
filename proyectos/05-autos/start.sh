#!/bin/bash
# Script para iniciar el proyecto completo

echo "🚀 Iniciando proyecto 05-Autos..."

# Iniciar servidor en background
echo "▶️  Iniciando servidor API..."
cd server
npm run dev &
SERVER_PID=$!

# Esperar a que el servidor esté listo
sleep 3

# Iniciar cliente
echo "▶️  Iniciando cliente React..."
cd ../client
npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Aplicación iniciada!"
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend: http://localhost:3001"
echo ""
echo "Presiona Ctrl+C para detener"

# Esperar por señal de terminación
wait
