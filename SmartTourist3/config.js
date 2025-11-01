const GEMINI_API_KEY = "AIzaSyDVpo_WbM0-oTYFv-1eHmJzEouVey7sqqE"; 

async function askGemini(prompt) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("❌ خطأ في الاستجابة من Gemini:", data);
      return "عذرًا، لم أتمكن من فهم سؤالك يا سيدي الفرعون 👑";
    }

  } catch (error) {
    console.error("❌ خطأ في الاتصال بـ Gemini:", error);
    return "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
  }
}
