export default async function handler(req, res) {
  const { orderid, appid } = req.query; // time'ı URL'den aldık, gerek yok.
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // 2026 yılındayız, başlangıç zamanı olarak oyunun başlangıcını veya bugünü ver
    const time = "2026-01-01T00:00:00Z"; 
    
    // Steam'in istediği type=GAMESALES (oyun içi satışlar için) parametresini de ekledik
    const url = `https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
