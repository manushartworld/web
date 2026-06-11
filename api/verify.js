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

    const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbzl5OjmX6xDyfuY_yQU8APS7KHObv7MTdmN8JzWu8Rxg3Zgy58EDpKNo9OcUMeryIjGGQ/exec';

  try {
    const sheetResponse = await fetch(googleSheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orderid: order.orderid, 
        status: order.status, 
        full: order 
      })
    });
    
    // Eğer Google'dan gelen cevap başarılı değilse loglara dök
    if (!sheetResponse.ok) {
       console.log("Sheet'e yazarken hata oldu, durum kodu:", sheetResponse.status);
    }
  } catch (err) {
    console.log("Sheet fetch hatası:", err);
  }

      
      return res.status(200).send(order.status); 
    } else {
      return res.status(200).send("Init");
    }
    
  } catch (error) {
    return res.status(200).send("Init");
  }
}
