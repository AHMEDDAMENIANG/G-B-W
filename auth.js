// =====================================
// INSCRIPTION
// =====================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value; // Récupère 'client' ou 'supplier'

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    role: role // Enregistre le rôle dans les métadonnées de l'utilisateur
                }
            }
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Inscription réussie ! Vérifiez vos e-mails pour valider votre compte.");
            window.location.href = "login.html";
        }
    });
}

// =====================================
// CONNEXION
// =====================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
        } else {
            window.location.href = "dashboard.html";
        }
    });
}

// =====================================
// DÉCONNEXION
// =====================================
async function logout(event) {
    if (event) event.preventDefault(); // Empêche le lien HTML de recharger la page
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        alert("Erreur lors de la déconnexion : " + error.message);
    } else {
        window.location.href = "login.html";
    }
}
