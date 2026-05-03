const axios = require('axios');

export default async function handler(req, res) {
  // REMPLACEZ ICI PAR VOTRE NOUVELLE CLÉ
  const PI_API_KEY = "VOTRE_NOUVELLE_CLE_ICI"; 

  if (req.method === 'POST') {
    const { paymentId, txid, action } = req.body;
    try {
      if (action === 'approve') {
        await axios.post(`https://minepi.com{paymentId}/approve`, {}, {
          headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        return res.status(200).json({ message: "Approuvé" });
      } 
      if (action === 'complete') {
        await axios.post(`https://minepi.com{paymentId}/complete`, { txid }, {
          headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        return res.status(200).json({ message: "Terminé" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Erreur Pi API" });
    }
  }
  res.status(405).send("Non autorisé");
}
