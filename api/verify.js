export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY; 

  if (!orderid) return res.status(400).json({ error: "orderid eksik" });

  try {
    // Steam'e soruyoruz: "Bu arkadaş gerçekten ödeme yaptı mı?"
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Steam'den gelen cevabı direkt oyununa yolluyoruz
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
}
