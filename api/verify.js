export default async function handler(req, res) {
  const { orderid } = req.query;
  const steamKey = process.env.STEAM_API_KEY;

  try {
    const time = Math.floor(Date.now() / 1000);
    const url = `https://partner.steamgames.com/ISteamMicroTxn/GetReport/v0002/?key=${steamKey}&appid=4686310&orderid=${orderid}&time=${time}`;
    
    const response = await fetch(url);
    const text = await response.text(); 

    // Steam ne dönüyorsa onu olduğu gibi ekrana basacağız
    res.status(response.status).send(`STEAM CEVABI: ${text}`);
    
  } catch (error) {
    res.status(500).send("KOD HATASI: " + error.message);
  }
}
