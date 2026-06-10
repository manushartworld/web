export default async function handler(req, res) {
  const { orderid, appid, startTime } = req.query; // Unity'den gelen zamanı direkt al
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Unity'den gelen zamanı kullan (Eğer yoksa varsayılan 24 saat öncesi)
    const timeParam = startTime || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'; 
    
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${timeParam}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.json();

    const order = data.response?.params?.orders?.find(o => o.orderid === orderid);

    if (order) {
      return res.status(200).send(order.status); 
    } else {
      return res.status(200).send("Init");
    }
    
  } catch (error) {
    return res.status(200).send("Init");
  }
}
