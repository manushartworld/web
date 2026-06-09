export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  if (!steamKey) {
    return res.status(500).json({ error: "API KEY YOK! Vercel ayarlarını kontrol et." });
  }

  try {
    const time = Math.floor(Date.now() / 1000);
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.text(); // json() yerine text() yap ki hata mesajını görelim
    
    // Eğer yanıt başarılı değilse (403, 404, 500 gibi)
    if (!response.ok) {
        return res.status(response.status).json({ error: "Steam Hatası", details: data });
    }

    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Kod Hatası", message: error.message });
  }
}
