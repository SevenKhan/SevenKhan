
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

// 📊 Fiyat Grafiği (örnek veriler)
const ctx = document.getElementById('priceChart').getContext('2d');

const priceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['6 Gün Önce','5 Gün Önce','4 Gün Önce','3 Gün Önce','2 Gün Önce','Dün','Bugün'],
        datasets: [
          {
            label: 'Dolar (₺)',
            data: [27.5, 27.8, 27.3, 27.6, 27.9, 28.0, 28.2],
            borderColor: '#00ffcc',
            backgroundColor: 'rgba(0,255,204,0.2)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Gram Altın (₺)',
            data: [2450, 2460, 2445, 2455, 2465, 2470, 2475],
            borderColor: '#ffd700',
            backgroundColor: 'rgba(255,215,0,0.2)',
            fill: true,
            tension: 0.3
          }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: '#fff' }
            }
        },
        scales: {
            y: {
                ticks: { color: '#fff' },
                beginAtZero: false
            },
            x: {
                ticks: { color: '#fff' }
            }
        }
    }
});

// 💖 Bağış adreslerini tıklayınca kopyala
document.getElementById('solana-address').addEventListener('click', () => {
  navigator.clipboard.writeText('5s1ZvjxCrrwd6JoF3wPEaSRpnNYMwSUqhYTF6YjMFKkz');
  alert('Solana adresi kopyalandı!');
});

document.getElementById('ethereum-address').addEventListener('click', () => {
  navigator.clipboard.writeText('0xb3669c541415a20E4Aa56ef13E76d02Fd9faa64E');
  alert('Ethereum adresi kopyalandı!');
});
