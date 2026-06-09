export default async function handler(req, res) {
  const { orderid, appid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // 24 saatlik arama aralığı (Steam'in şartı)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'; 
    
    // Sandbox üzerinden sorgula
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${yesterday}&type=GAMESALES`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Eğer Steam listesi boş değilse siparişi ara
    const order = data.response?.params?.orders?.find(o => o.orderid === orderid);

    if (order) {
      // Unity'nin 'status' değişkeniyle eşleşen net cevap: "Succeeded", "Failed" veya "Init"
      return res.status(200).send(order.status); 
    } else {
      // Sipariş henüz Steam veritabanına düşmediyse "Init" döndür ki Unity beklemeye devam etsin
      return res.status(200).send("Init");
    }
    
  } catch (error) {
    // Bir hata olursa yine "Init" döndür ki Unity sorgulamaya devam etsin, hemen pes etmesin
    return res.status(200).send("Init");
  }
}
