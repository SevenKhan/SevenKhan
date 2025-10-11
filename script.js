
// 💰 Canlı fiyat verilerini çek
async function fetchMarketData() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=TRY,EUR');
    const data = await res.json();

    const usdTry = data.rates.TRY.toFixed(2);
    const eurTry = (data.rates.TRY / data.rates.EUR).toFixed(2);

    document.getElementById('usd').textContent = `${usdTry} ₺`;
    document.getElementById('eur').textContent = `${eurTry} ₺`;
  } catch (e) {
    console.error('Kur verisi alınamadı', e);
  }

  // Altın & Borsa (örnek sabit veriler)
  document.getElementById('gold').textContent = "2.450 ₺ (örnek)";
  document.getElementById('bist').textContent = "9.750 (örnek)";
}

// ⏱️ Her 1 dakikada bir güncelle
fetchMarketData();
setInterval(fetchMarketData, 60000);
