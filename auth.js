// =====================================
// INSCRIPTION
// =====================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value; // <--- AJOUTER CETTE LIGNE

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    role: role // <--- AJOUTER CE BLOC OPTIONS
                }
            }
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Inscription réussie ! Vérifiez vos e-mails.");
            window.location.href = "login.html";
        }
    });
}

