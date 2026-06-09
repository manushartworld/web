export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // time parametresini şimdiki zamanı alarak oluştur
    const time = Math.floor(Date.now() / 1000);
    
    // Steam'in istediği formatta URL
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.json(); // Artık JSON döneceğini biliyoruz

    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
