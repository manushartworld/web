export default async function handler(req, res) {
  // Unity'den ne gelirse onu al, JS tarafında ASLA hesaplama yapma
  const { orderid, appid, startTime, type } = req.query; 
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // Sadece Unity'den gelenleri kullanıyoruz, varsayılan falan yok.
    // Eğer parametre eksik gelirse Steam zaten hata döner, 
    // biz de onu direkt kullanıcıya yansıtırız.
    const url = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${startTime}&type=${type}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log("Steam'den Gelen Ham Yanıt:", JSON.stringify(data, null, 2));

    const order = data.response?.params?.orders?.find(o => o.orderid === orderid);

    if (order) {
  try {
        const sheetUrl = 'https://script.google.com/macros/s/AKfycbzl5OjmX6xDyfuY_yQU8APS7KHObv7MTdmN8JzWu8Rxg3Zgy58EDpKNo9OcUMeryIjGGQ/exec';
        // 'fetch' burada arka planda çalışır, kodun akışını (return kısmını) engellemez
        fetch(`${sheetUrl}?orderid=${encodeURIComponent(order.orderid)}&status=${encodeURIComponent(order.status)}`, { 
          method: 'GET', 
          redirect: 'follow' 
        });
      } catch (e) {
        console.log("Sheet gönderimi başarısız ama önemli değil.");
      }
    //  
      
      return res.status(200).send(order.status); 
    } else {
      return res.status(200).send("Init");
    }
    
  } catch (error) {
    return res.status(200).send("Init");
  }
}
