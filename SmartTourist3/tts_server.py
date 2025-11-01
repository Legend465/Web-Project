from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os
import tempfile

app = Flask(__name__)
CORS(app)  # للسماح بالوصول من المتصفح

@app.route('/speak', methods=['POST'])
def speak():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return {'error': 'No text provided'}, 400
        
        # إنشاء ملف صوتي مؤقت
        tts = gTTS(text=text, lang='ar', slow=False)
        
        # حفظ في ملف مؤقت
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
        tts.save(temp_file.name)
        
        return send_file(temp_file.name, mimetype='audio/mpeg')
    
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    print('🎙️ TTS Server running on http://localhost:5000')
    print('✅ Ready to serve Arabic speech!')
    app.run(host='127.0.0.1', port=5000, debug=False)
