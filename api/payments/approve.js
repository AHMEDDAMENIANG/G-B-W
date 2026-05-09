export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { paymentId } = req.body;
  const API_KEY = process.env.PI_API_KEY; // Votre clé secrète Pi

  try {
    // Appel à l'API Pi pour approuver
    const response = await fetch(`https://minepi.com{paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${API_KEY}` }
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

