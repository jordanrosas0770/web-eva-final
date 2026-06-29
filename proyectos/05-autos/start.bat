@echo off
REM Script para iniciar el proyecto completo en Windows

echo 🚀 Iniciando proyecto 05-Autos...
echo.

REM Iniciar servidor en nueva ventana
echo ▶️  Iniciando servidor API en puerto 3001...
start "Servidor API" cmd /k "cd server && npm run dev"

REM Esperar un poco
timeout /t 3 /nobreak

REM Iniciar cliente
echo ▶️  Iniciando cliente en puerto 5173...
cd client
npm run dev

echo.
echo ✅ Aplicación iniciada!
echo 📱 Frontend: http://localhost:5173
echo 🔌 Backend: http://localhost:3001
echo.
