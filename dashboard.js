<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Global Business World</title>

    <link rel="stylesheet" href="css/style.css">

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>

<nav>
    <a href="index.html">Accueil</a>
    <a href="products.html">Produits</a>
    <a href="#" onclick="logout()">Déconnexion</a>
</nav>

<div class="container">
    <h1>Bienvenue sur votre tableau de bord</h1>

    <div class="card">
        <h2>Informations du compte</h2>

        <p><strong>Email :</strong> <span id="userEmail">Chargement...</span></p>
    </div>
</div>

<script src="supabase.js"></script>
<script src="auth.js"></script>

<script>
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userEmail").textContent = user.email;
}

checkUser();
</script>

</body>
</html>
