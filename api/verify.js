export default async function handler(req, res) {
  const { orderid, appid, startTime, type } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    // 1. Steam'den raporu çek
    const steamUrl = `https://partner.steam-api.com/ISteamMicroTxnSandbox/GetReport/v5/?key=${steamKey}&appid=${appid}&orderid=${orderid}&time=${startTime}&type=${type}`;
    const response = await fetch(steamUrl);
    const data = await response.json();
    const order = data.response?.params?.orders?.find(o => o.orderid === orderid);

    if (order) {
      // 2. Formspree'ye gönderim - User-Agent ekleyerek (Engeli aşmak için)
      const formResponse = await fetch('https://formspree.io/f/xpqyblvp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0' // Bazı servisler boş user-agent'ı reddeder
        },
        body: JSON.stringify({
          message: JSON.stringify(order),
          email: 'test@test.com'
        })
      });

      // Formspree cevabını logla
      const result = await formResponse.json();
      console.log("Formspree Yanıtı:", result);
    }

    return res.status(200).send(order ? order.status : "Init");

  } catch (error) {
    // Hatanın ne olduğunu direkt tarayıcıya yansıt ki sorunu bulalım
    return res.status(500).send("HATA: " + error.message);
  }
}
