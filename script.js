document.addEventListener('DOMContentLoaded', () => {
  let count = 0;
  const counter = document.getElementById('counter');
  const button = document.getElementById('magic');
  if(counter && button){
    button.addEventListener('click', () => {
      count++;
      counter.textContent = count;
    });
  }
});
