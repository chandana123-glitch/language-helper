function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "❌ Invalid login. Try admin / 1234.";
  }
}

function checkLogin() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}