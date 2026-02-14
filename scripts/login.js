import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful");
      signupForm.reset();
    })
    .catch((error) => {
      alert(error.message);
    });
});
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful");
      // later you can redirect
    })
    .catch((error) => {
      alert(error.message);
    });
});

console.log("Login script loaded");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

// Regex patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
loginBtn.addEventListener("click", (e) => {
    if (!emailPattern.test(emailInput.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordPattern.test(passwordInput.value)) {
        alert("Password must be at least 8+ characters long and include uppercase, lowercase letters, and a number.");
        return;
    }
    alert("Login successful! (dummy)");
});

// Utility
function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("small");
    error.className = "error-text";
    input.after(error);
  }
  error.textContent = message;
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-text")) {
    error.textContent = "";
  }
}
emailInput.addEventListener("input", () => {
  if (!emailPattern.test(emailInput.value)) {
    showError(emailInput, "Enter a valid email address");
  } else {
    clearError(emailInput);
  }
});
passwordInput.addEventListener("input", () => {
  if (!passwordPattern.test(passwordInput.value)) {
    showError(
      passwordInput,
      "Password must be 8+ chars, include A-Z, a-z & number"
    );
  } else {
    clearError(passwordInput);
  }
});
loginBtn.addEventListener("click", (e) => {
  let valid = true;

  if (!emailPattern.test(emailInput.value)) {
    showError(emailInput, "Invalid email");
    valid = false;
  }

  if (!passwordPattern.test(passwordInput.value)) {
    showError(passwordInput, "Weak password");
    valid = false;
  }

  if (!valid) {
    e.preventDefault(); // stop submit
  }
});


const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

showLogin.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});
