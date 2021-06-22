// function to link front end (logout button ) to back end (controllers and session)

const fetchLogout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.getElementById("logoutConfirm").addEventListener("click", fetchLogout);
