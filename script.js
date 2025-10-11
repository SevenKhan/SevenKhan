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
