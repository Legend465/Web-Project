@echo off
echo ========================================
echo    Smart Tourist - Starting Services
echo ========================================
echo.

echo Installing requirements...
pip install -r requirements.txt

echo.
echo Starting TTS Server...
echo.
echo Open index.html in your browser now!
echo.

python tts_server.py
