export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    const time = Math.floor(Date.now() / 1000);
    const url = `https://api.steampowered.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const text = await response.text(); // Steam'den gelen her şeyi metin olarak al

    // Steam'den gelen HTML'i veya veriyi olduğu gibi browser'a bas
    res.setHeader('Content-Type', 'text/plain'); 
    return res.status(200).send(text);
    
  } catch (error) {
    return res.status(500).send("HATA: " + error.message);
  }
}
