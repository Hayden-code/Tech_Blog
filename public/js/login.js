// Login function
const login = async (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginEmail").value.trim();

  if (email && password) {
    const submission = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (submission.ok) {
      document.location.replace("/");
    } else {
      alert(
        "Please enter a valid email and password. Otherwise use the Sign Up tab."
      );
    }
  }
};

// Sign Up function
const signUp = async (event) => {
  event.preventDefault();
  const username = document.getElementById("signUpUsername").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const password = document.getElementById("signUpEmail").value.trim();
  if (username && email && password) {
    const submission = await fetch("/api/users", {
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
