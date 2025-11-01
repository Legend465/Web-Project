document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();
  if (email && pass) window.location.href = "index.html";
  else alert("⚠️ من فضلك أدخل البريد وكلمة المرور.");
});

document.getElementById("signupBtn")?.addEventListener("click", () => {
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPassword").value.trim();
  if (email && pass) window.location.href = "login.html";
  else alert("⚠️ أكمل البيانات لإنشاء الحساب.");
});