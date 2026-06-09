export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  if (!orderid) return res.status(400).json({ error: "orderid gerekli" });

  try {
    const time = Math.floor(Date.now() / 1000);
    
    // Steam'in bazen parametreleri URL'de değil, POST body'sinde istediğini unutma
    // Ama önce şu en temiz GET URL'ini deneyelim
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    
    // Eğer yanıt JSON değilse (HTML ise), hata veriyoruz
    const text = await response.text();
    
    try {
        const data = JSON.parse(text);
        res.status(200).json(data);
    } catch (e) {
        // Hata buradaysa: Steam sana HTML döndürdü
        res.status(500).json({ error: "Steam HTML döndürdü (Yetkisiz veya Hatalı İstek)", raw: text });
    }
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası", message: error.message });
  }
}
