export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY; 

  if (!orderid) return res.status(400).json({ error: "orderid gerekli" });

  try {
    // encodeURIComponent ile anahtarı "temiz" hale getiriyoruz
    const encodedKey = encodeURIComponent(steamKey);
    const time = Math.floor(Date.now() / 1000);
    
    // Steam'in istediği en temiz URL yapısı
    // URL'in tam olarak şu olduğundan emin ol:
    // Kodundaki URL kısmını tam olarak bu şekilde yap
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${encodedKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "DETAYLI HATA: " + error.message });
  }
}
