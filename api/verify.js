export default async function handler(req, res) {
  const { orderid, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // 24 saat öncesinin tarihini al (Daha geniş bir arama için)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'; 

    //const url = `https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${yesterday}&type=GAMESALES`;
    // KESİN ÇÖZÜM: ISteamMicroTxnSandbox kullandık ve v5 sürümü ile birleştirdik
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${yesterday}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
