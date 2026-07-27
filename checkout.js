// Vérifier si le panier contient des articles avant de continuer
let cart = JSON.parse(localStorage.getItem('gbw_cart')) || [];

if (cart.length === 0) {
    alert("Votre panier est vide. Vous allez être redirigé vers la boutique.");
    window.location.href = "products.html";
}

// Fonction pour calculer le montant total du panier
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Écouter la soumission du formulaire de livraison
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Récupérer les informations saisies par le client dans le HTML
        const clientName = document.getElementById("clientName").value;
        const clientPhone = document.getElementById("clientPhone").value;
        const clientAddress = document.getElementById("clientAddress").value;
        const deliveryCity = document.getElementById("deliveryCity").value;

        // 2. Récupérer l'utilisateur actuellement connecté (facultatif mais recommandé)
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user ? user.id : null;

        const totalAmount = getCartTotal();

        // 3. Insérer la commande principale dans la table 'orders' de Supabase
        // Nous enregistrons les articles directement au format JSON dans la colonne 'items'
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    client_name: clientName,
                    client_phone: clientPhone,
                    delivery_address: clientAddress + " (" + deliveryCity + ")",
                    total_price: totalAmount,
                    status: 'En attente', // Statut initial de la Phase 5
                    items: cart, // Contenu complet du panier
                    user_id: userId
                }
            ])
            .select();

        if (orderError) {
            alert("Erreur lors de l'enregistrement de la commande : " + orderError.message);
            return;
        }

        // 4. Succès : vider le panier local et informer le client
        localStorage.removeItem('gbw_cart');
        alert("🎉 Commande passée avec succès ! Le fournisseur va préparer votre colis.");
        
        // Redirection vers le tableau de bord pour suivre ses commandes
        window.location.href = "dashboard.html";
    });
}

