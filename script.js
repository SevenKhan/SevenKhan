document.addEventListener('DOMContentLoaded', () => {
  // Sayaç
  let count = 0;
  const counter = document.getElementById('counter');
  const button = document.getElementById('magic');
  if(counter && button){
    button.addEventListener('click', () => {
      count++;
      counter.textContent = count;
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
