export default async function handler(req, res) {
  const { orderid, appid, time } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Sandbox domain'ini kullanıyoruz
    //const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}`;
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
