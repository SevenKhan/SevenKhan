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
