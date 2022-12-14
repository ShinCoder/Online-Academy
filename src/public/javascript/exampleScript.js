document.querySelector('h1').addEventListener('mouseover', () => {
  document.querySelector('h2').style.color = 'blue';
});
document.querySelector('h1').addEventListener('mouseleave', () => {
  document.querySelector('h2').style.color = 'black';
});
