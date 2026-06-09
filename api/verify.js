export default async function handler(req, res) {
  const { orderid, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // BUGÜNÜN DEĞİL, 24 SAAT ÖNCESİNİN TARİHİNİ ALIYORUZ
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'; 
    
    // time parametresini 24 saat öncesine çektik
    const url = `https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${yesterday}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
