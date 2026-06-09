export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    const time = Math.floor(Date.now() / 1000);
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const text = await response.text();

    // Eğer Steam hata kodu döndürdüyse (403, 401, 500 vb.)
    if (!response.ok) {
        return res.status(response.status).send(`STEAM HATA SAYFASI: ${text}`);
    }

    // Eğer başarılıysa (200 OK)
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
