export default async function handler(req, res) {
  const { orderid, appid, time } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  // Eksik parametre varsa Steam'e gitmeden hata ver
  if (!orderid || !appid || !time) {
    return res.status(400).send("HATA: Eksik parametre gonderildi!");
  }

  try {
    // Steam'e gönderilecek URL
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    // Steam'in cevabını direkt Unity'ye ilet
    return res.status(response.status).send(data);
    
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
