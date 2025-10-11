document.addEventListener('DOMContentLoaded', () => {
  // Sayaç
  let count = 0;
  const counter = document.getElementById('counter');
  const button = document.getElementById('magic');
  const message = document.getElementById('message');

  if(counter && button){
    button.addEventListener('click', () => {
      count++;
      counter.textContent = count;

      // Sayaç animasyonu
      counter.style.transition = 'transform 0.2s';
      counter.style.transform = 'scale(1.5)';
      setTimeout(() => { counter.style.transform = 'scale(1)'; }, 200);

      // Renkli mesajlar
      if(message){
        if(count % 5 === 0){
          message.textContent = `Tebrikler! Sayaç ${count} oldu 🎉`;
          message.style.color = 'green';
        } else if(count % 3 === 0){
          message.textContent = `Devam et! Sayı: ${count}`;
          message.style.color = 'blue';
        } else {
          message.textContent = '';
        }
      }
    });
  }

  // Saat
  const clock = document.getElementById('clock');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `Saat: ${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
});

// Baloncuk animasyonu
button.addEventListener('click', (e) => {
  for(let i=0; i<5; i++){
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${e.clientX + (Math.random()*40-20)}px`;
    bubble.style.top = `${e.clientY + (Math.random()*40-20)}px`;
    document.body.appendChild(bubble);
    setTimeout(() => {
      bubble.remove();
    }, 1000);
  }
});

// Fare hareketine duyarlı animasyon
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10px ila +10px
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector('main').style.transform = `translate(${x}px, ${y}px)`;
});

// Mini oyun: kutuyu yakala
const gameBox = document.getElementById('game-box');
const scoreDisplay = document.getElementById('score');
let score = 0;

gameBox.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;

  // Kutuyu rastgele yeni pozisyona taşı
  const x = Math.random() * (window.innerWidth - 60); // kutu genişliği 50px
  const y = Math.random() * (window.innerHeight - 60);
  gameBox.style.left = `${x}px`;
  gameBox.style.top = `${y}px`;
});

// Gelişmiş oyun: renk, efekt ve zorluk
let gameSpeed = 1000; // başlangıçta 1 saniyede bir hareket
const colors = ['#ff7e5f','#feb47b','#6a11cb','#2575fc','#43cea2','#f64f59'];

function moveBox() {
  const x = Math.random() * (window.innerWidth - 60);
  const y = Math.random() * (window.innerHeight - 60);
  gameBox.style.left = `${x}px`;
  gameBox.style.top = `${y}px`;
  gameBox.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random()*colors.length)]}, ${colors[Math.floor(Math.random()*colors.length)]})`;
}

gameBox.addEventListener('click', (e) => {
  score++;
  scoreDisplay.textContent = score;

  // Patlama efekti
  const explosion = document.createElement('div');
  explosion.className = 'explosion';
  explosion.style.left = `${e.clientX - 15}px`;
  explosion.style.top = `${e.clientY - 15}px`;
  document.body.appendChild(explosion);
  setTimeout(() => explosion.remove(), 500);

  // Zorluk: puan arttıkça hızlan
  if (score % 5 === 0 && gameSpeed > 200) {
    gameSpeed -= 100;
  }

  moveBox();
});

// Otomatik hareket (her saniye)
setInterval(moveBox, gameSpeed);

// Skor kaydetme ve yeniden başlatma sistemi
const highscoreDisplay = document.getElementById('highscore');
const restartBtn = document.getElementById('restart-btn');

// LocalStorage'dan yüksek skoru al
let highscore = localStorage.getItem('highscore') || 0;
highscoreDisplay.textContent = highscore;

// Skor kontrolü
function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem('highscore', highscore);
    highscoreDisplay.textContent = highscore;
  }
}

// Oyun sonunda veya tıklama sonrası skor kontrolü
gameBox.addEventListener('click', () => {
  updateHighscore();
});

// Yeniden başlat
restartBtn.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  gameSpeed = 1000;
  moveBox();
});

// 🔊 Ses efektleri
const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_4c9f17469f.mp3');
const victorySound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_ebf7fa0b9b.mp3');

gameBox.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {}); // sessiz modda hata engeli

  // Eğer skor rekoru geçerse zafer sesi
  if (score > highscore) {
    victorySound.play().catch(() => {});
  }
});

// 🎵 Arka plan müziği ve menü
const startMenu = document.getElementById('start-menu');
const startBtn = document.getElementById('start-btn');
const musicToggle = document.getElementById('music-toggle');

const bgMusic = new Audio('https://cdn.pixabay.com/audio/2022/03/23/audio_3b8e71031e.mp3');
bgMusic.loop = true; // sürekli çalsın

let musicPlaying = false;

startBtn.addEventListener('click', () => {
  startMenu.style.display = 'none';
  moveBox();
  if (!musicPlaying) {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
  }
});

musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
  }
});

// 🕹️ Oyunu başlatma düzeltmesi
function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameSpeed = 1000;
  moveBox();

  // Sürekli hareket başlat
  clearInterval(window.moveInterval);
  window.moveInterval = setInterval(moveBox, gameSpeed);
}

// 🎮 "Oyunu Başlat" butonuna bağlayalım
startBtn.addEventListener('click', () => {
  startMenu.style.display = 'none';
  startGame();

  if (!musicPlaying) {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
  }
});

// ⚙️ Level sistemi değişkenleri
let level = 1;
const levelDisplay = document.getElementById('levelDisplay');

// 🎯 Level kontrol fonksiyonu
function checkLevelUp() {
  const previousLevel = level;
  if (score >= 10 && score < 20) level = 2;
  else if (score >= 20 && score < 30) level = 3;
  else if (score >= 30 && score < 50) level = 4;
  else if (score >= 50) level = 5;

  if (level !== previousLevel) {
    levelDisplay.textContent = `Level: ${level}`;
    levelDisplay.classList.add('level-up');
    setTimeout(() => levelDisplay.classList.remove('level-up'), 800);
    changeBackgroundColor();
  }
}

// 🌈 Arka plan rengini Level'a göre değiştir
function changeBackgroundColor() {
  const colors = ["#007bff", "#28a745", "#ff9800", "#e91e63", "#9c27b0"];
  document.body.style.background = colors[level - 1] || "#007bff";
}

// 🎮 Kutuya tıklanınca Level kontrolü ekle
box.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
  checkLevelUp();
});

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

  // Altın & Borsa (örnek sabit veriler, sonra gerçek API ekleyeceğiz)
  document.getElementById('gold').textContent = "2.450 ₺ (örnek)";
  document.getElementById('bist').textContent = "9.750 (örnek)";
}

// ⏱️ Her 1 dakikada bir güncelle
fetchMarketData();
setInterval(fetchMarketData, 60000);
