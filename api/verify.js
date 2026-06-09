export default async function handler(req, res) {
  // Bu mesajı ekranda görüyorsan, kesinlikle doğru dosyayı düzenliyorsun demektir
  return res.status(200).send("DOSYA YOLU DOGRU - YENI KOD AKTIF");
}
