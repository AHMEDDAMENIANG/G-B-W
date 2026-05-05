export default async function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ message: "Approuvé" });
  }
  res.status(405).send("Méthode non autorisée");
}
