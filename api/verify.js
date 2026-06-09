export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // 1. ADIM: URL'den &time=${time} kısmını tamamen çıkardık.
    // Eğer Steam hata verirse, aşağıda 2. adımda vereceğim düzeltmeyi yap.
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}`;
    
    const response = await fetch(url);
    const data = await response.json(); 

    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
}
