// Vérifier si le panier contient des articles avant de continuer
let cart = JSON.parse(localStorage.getItem('gbw_cart')) || [];

if (cart.length === 0) {
    alert("Votre panier est vide. Vous allez être redirigé vers la boutique.");
    window.location.href = "products.html";
}

// Écouter la soumission du formulaire de livraison
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Récupérer les informations saisies par le client
        const clientName = document.getElementById("clientName").value;
        const clientPhone = document.getElementById("clientPhone").value;
        const clientAddress = document.getElementById("clientAddress").value;
        const deliveryCity = document.getElementById("deliveryCity").value;

        // 2. Récupérer l'utilisateur connecté (Acheteur)
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        const buyerId = user ? user.id : null; 
        
        // Si l'utilisateur n'est pas connecté, Supabase utilisera les politiques publiques de RLS si configurées, 
        // ou vous pouvez bloquer ici selon votre choix. Dans tous les cas, on stocke les coordonnées.

        try {
            // 3. Boucler sur chaque article du panier pour insérer les commandes individuellement
            // (Nécessaire car la table orders cible 1 produit et 1 fournisseur précis par ligne)
            for (const item of cart) {
                
                // Récupération des informations du produit pour lier au fournisseur
                // Nous faisons une micro-requête pour connaître le fournisseur lié à ce produit
                const { data: productData, error: prodError } = await supabase
                    .from('products')
                    .select('supplier_id')
                    .eq('id', item.id)
                    .single();

                if (prodError || !productData) {
                    throw new Error(`Impossible de trouver le fournisseur pour l'article ${item.name}`);
                }

                const totalItemAmount = item.price * item.quantity;
                const uniqueConfirmationCode = "GBW-" + Math.floor(100000 + Math.random() * 900000);

                const { error: orderError } = await supabase
                    .from('orders')
                    .insert([
                        {
                            buyer_id: buyerId, // L'ID de l'utilisateur connecté (Optionnel/Obligatoire selon vos règles RLS)
                            supplier_id: productData.supplier_id, // Lié automatiquement grâce au produit
                            product_id: item.id, // ID unique de l'iPhone ou autre article
                            quantity: item.quantity,
                            total_amount: totalItemAmount,
                            status: 'en_attente',
                            confirmation_code: uniqueConfirmationCode
                        }
                    ]);

                if (orderError) throw orderError;
            }

            // 4. Succès : vider le panier local et informer le client
            localStorage.removeItem('gbw_cart');
            alert("Commande passée avec succès ! Les fournisseurs vont préparer vos colis.");
            window.location.href = "dashboard.html";

        } catch (error) {
            alert("Erreur lors de l'enregistrement de la commande : " + error.message);
            console.error(error);
        }
    });
}

