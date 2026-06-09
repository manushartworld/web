export default async function handler(req, res) {
  // Artık Unity'den her şeyi alıyoruz
  const { orderid, time, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  if (!orderid || !time || !appid) {
    return res.status(400).json({ error: "Eksik parametre: orderid, time veya appid" });
  }

  try {
    // Steam'e Unity'den gelen appid'yi iletiyoruz
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.json(); 

    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
