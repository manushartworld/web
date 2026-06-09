export default async function handler(req, res) {
  const { orderid, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Bugünün tarihini değil, işlemin daha garantili bulunması için 
    // işlemin gerçekleşmiş olabileceği makul bir başlangıç tarihi (RFC 3339)
    // Steam'in istediği format: YYYY-MM-DDTHH:MM:SSZ
    const today = new Date().toISOString().split('.')[0] + 'Z'; 
    
    // Steam GetReport v5 endpoint'i
    const url = `https://partner.steam-api.com/ISteamMicroTxn/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${today}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
