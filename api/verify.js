export default async function handler(req, res) {
  const { orderid, appid } = req.query; // Time'ı çıkardık
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Steam'in GetReport metodunu time olmadan zorluyoruz. 
    // Bazı durumlarda "time" parametresi "GetReport" için opsiyoneldir.
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=${appid}&orderid=${orderid}`;
    
    const response = await fetch(url);
    const data = await response.text();
    
    return res.status(response.status).send(data);
    
  } catch (error) {
    return res.status(500).send("SUNUCU HATASI: " + error.message);
  }
}
