// Login function
const login = async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email && password) {
    const body = JSON.stringify({ email, password });
    const submission = await fetch("/api/user/login", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });
    if (submission.ok) {
      document.location.replace("/");
    } else {
      alert(submission.statusText);
    }
  }
};

// Sign Up function
const signUp = async (event) => {
  event.preventDefault();
  const username = document.getElementById("signUpUsername").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const password = document.getElementById("signUpPassword").value.trim();
  if (username && email && password) {
    const submission = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (submission.ok) {
      alert(`Profile created! Welcome, ${username}!`);
      document.location.replace("/");
    } else {
      alert(submission.statusText);
    }
  }
};

// Creating submit button events to append functions to.
document.getElementById("loginForm").addEventListener("submit", login);
document.getElementById("signUpForm").addEventListener("submit", signUp);
