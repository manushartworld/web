export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY; 

  if (!orderid) return res.status(400).json({ error: "orderid gerekli" });

  try {
    // Steam'e istek at
    const response = await fetch(`https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}`);
    const data = await response.json();
    
    // Cevabı oyununa gönder
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
}
