export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY; 

  if (!orderid) return res.status(400).json({ error: "orderid gerekli" });

  try {
    // Şimdiki zamanı saniye cinsinden al (Unix Timestamp)
    const time = Math.floor(Date.now() / 1000);
    
    // URL'e &time=${time} parametresini ekledik
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    if (!response.ok) {
        throw new Error(`Steam API yanıt vermedi: ${text}`);
    }

    res.status(200).json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: "DETAYLI HATA: " + error.message });
  }
}
