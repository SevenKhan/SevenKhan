let count = 0;
const counter = document.getElementById('counter');
document.getElementById('magic').addEventListener('click', () => {
  count++;
  counter.textContent = count;
});
