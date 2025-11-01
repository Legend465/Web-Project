const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const pharaohImage = document.getElementById("pharaohImage");
const chatContainer = document.querySelector("main");

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  if (text.includes("رمسيس")) {
    chatContainer.classList.add("shift-left");
    showPharaoh("assets/ramses.png");
  } else if (text.includes("تحتمس")) {
    chatContainer.classList.add("shift-left");
    showPharaoh("assets/thutmose.png");
  }

  // جلب الرد من Gemini
  const reply = await askGemini(text);

  // كتابة الرد تدريجياً مع الصوت
  await typeMessage(reply);
  
  hidePharaoh();
});

// دالة إضافة الرسائل
function addMessage(content, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.textContent = content;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// دالة النطق والانتظار حتى ينتهي الكلام (معدلة لسرعة 1.4)
function speakAndWait(text) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 1.4; // تم التسريع هنا
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
        console.error('SpeechSynthesis Utterance Error:', event);
        resolve(); 
    };

    speechSynthesis.speak(utterance);
  });
}


// كتابة النص تدريجياً مع النطق كل جملة
async function typeMessage(text) {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot");
  messagesContainer.appendChild(msg);

  let partial = "";
  let lastSpokenIndex = 0; 

  for (let i = 0; i < text.length; i++) {
    partial += text[i];
    
    // تحويل تنسيق الماركداون (*) إلى HTML (<strong>) لعرض الخط الغامق
    const formattedPartial = partial
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // استخدام innerHTML لعرض وسوم HTML
    msg.innerHTML = formattedPartial; 
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // لما يوصل لجملة كاملة يتكلم
    if ([".", "؟", "!", "،"].includes(text[i])) {
      const sentenceToSpeak = text.substring(lastSpokenIndex, i + 1).trim();

      speechSynthesis.cancel(); 

      await speakAndWait(sentenceToSpeak); 

      lastSpokenIndex = i + 1; 
    }

    await new Promise(res => setTimeout(res, 15)); // تم التسريع هنا (15 مللي ثانية)
  }
  
  // التأكد من نطق آخر جزء
  if (lastSpokenIndex < text.length) {
    const finalPartToSpeak = text.substring(lastSpokenIndex).trim();
    if (finalPartToSpeak) {
        speechSynthesis.cancel();
        await speakAndWait(finalPartToSpeak); 
    }
  }

  setTimeout(() => {
    chatContainer.classList.remove("shift-left");
  }, 2500);
}

// عرض صورة الفرعون
function showPharaoh(imgPath) {
  pharaohImage.src = imgPath;
  pharaohImage.classList.add("visible");
}

// إخفاء الصورة
function hidePharaoh() {
  setTimeout(() => {
    pharaohImage.classList.remove("visible");
  }, 4000);
}