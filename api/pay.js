const axios = require('axios');

export default async function handler(req, res) {
  const PI_API_KEY = process.env.PI_API_KEY; 

  if (req.method === 'POST') {
    const { paymentId, txid, action } = req.body;
    
    try {
      // 1. Étape d'approbation
      if (action === 'approve') {
        await axios.post(`https://minepi.com{paymentId}/approve`, {}, {
          headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        return res.status(200).json({ message: "Approuvé" });
      } 
      
      // 2. Étape de finalisation
      if (action === 'complete') {
        await axios.post(`https://minepi.com{paymentId}/complete`, { txid }, {
          headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        return res.status(200).json({ message: "Terminé" });
      }
    } catch (error) {
      console.error("Erreur API Pi:", error.response ? error.response.data : error.message);
      return res.status(500).json({ error: "Erreur lors de la communication avec Pi Network" });
    }
  }
  res.status(405).send("Méthode non autorisée");
}

