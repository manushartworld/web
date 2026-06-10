export default async function handler(req, res) {
  // Unity'den gelen tüm parametreleri alıyoruz
  const { orderid, appid, startTime, type } = req.query; 
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Unity'den gelmezse varsayılan değerleri atıyoruz
    const timeParam = startTime || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'; 
    const transactionType = type || "GAMESALES"; 
    
    // Artık her şey modüler
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${timeParam}&type=${transactionType}`;
    
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
