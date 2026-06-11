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

    //
    const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbzl5OjmX6xDyfuY_yQU8APS7KHObv7MTdmN8JzWu8Rxg3Zgy58EDpKNo9OcUMeryIjGGQ/exec';

  // Parametreleri URL'e ekliyoruz
  const url = `${googleSheetUrl}?orderid=${encodeURIComponent(order.orderid)}&status=${encodeURIComponent(order.status)}`;

  try {
    // Sadece GET isteği atıyoruz, Google'a gidip satırı eklemesini söylüyoruz
    await fetch(url);
    console.log("Sheet'e veri gönderildi!");
  } catch (err) {
    console.error("Sheet'e gönderirken hata oluştu:", err);
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
