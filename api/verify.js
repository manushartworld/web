export default async function handler(req, res) {
  const { orderid, appid } = req.query; // time'ı sildik
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Sadece orderid ve appid ile dene
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}`;
    
    const response = await fetch(url);
    const data = await response.json(); 

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
