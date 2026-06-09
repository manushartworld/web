export default async function handler(req, res) {
  const { orderid, appid, time } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Steam'e Unity'den gelen 0 değerini gönderiyoruz
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
    
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
