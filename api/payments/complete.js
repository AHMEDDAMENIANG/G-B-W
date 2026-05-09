export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { paymentId, txid } = req.body;
  const API_KEY = process.env.PI_API_KEY;

  try {
    const response = await fetch(`https://minepi.com{paymentId}/complete`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ txid })
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

