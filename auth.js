// =========================
// INSCRIPTION
// =========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Inscription réussie ! Vérifie ton e-mail.");
      window.location.href = "login.html";
    }
  });
}

// =========================
// CONNEXION
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "dashboard.html";
    }
  });
}

// =========================
// DÉCONNEXION
// =========================
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
           }
