export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  if (!orderid) return res.status(400).json({ error: "orderid eksik" });

  try {
    const time = Math.floor(Date.now() / 1000);
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const text = await response.text(); // JSON değil, text olarak alıyoruz

    if (response.ok) {
        // Başarılıysa parse et
        res.status(200).json(JSON.parse(text));
    } else {
        // Hata varsa HTML'in tamamını olduğu gibi döndür
        res.status(response.status).send(text);
    }
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
