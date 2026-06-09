export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY; 

  if (!orderid) return res.status(400).json({ error: "orderid gerekli" });

  try {
    // Kodundaki URL kısmını bununla değiştir
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}`;
    
    const response = await fetch(url);
    
    // Steam'den gelen yanıtı metin olarak alıp hatayı yakalayalım
    const text = await response.text();
    
    // Eğer başarılı değilse hata fırlat
    if (!response.ok) {
        throw new Error(`Steam API yanıt vermedi: ${text}`);
    }

    res.status(200).json(JSON.parse(text));
  } catch (error) {
    // BURASI ÖNEMLİ: Hatanın ne olduğunu direkt tarayıcıya yansıtıyoruz!
    res.status(500).json({ error: "DETAYLI HATA: " + error.message });
  }
}
