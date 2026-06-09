export default async function handler(req, res) {
  const { orderid, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  if (!orderid || !appid) {
    return res.status(400).send("HATA: Eksik parametre (orderid veya appid)");
  }

  try {
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}`;
    
    const response = await fetch(url);
    
    // Gelen cevabı önce metin olarak oku
    const text = await response.text();
    
    // Eğer cevap başarılıysa (200) bunu JSON olarak döndür
    if (response.ok) {
        return res.status(200).send(text);
    } else {
        // Hata varsa, Steam'in hata metnini olduğu gibi döndür
        return res.status(response.status).send("STEAM HATA: " + text);
    }
    
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
