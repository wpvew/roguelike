document.addEventListener('DOMContentLoaded', () => {
  let game = new Game();
  game.init();
})

const newGame = () => {
  document.querySelector('.service-window').remove()
  document.querySelector('.field').innerHTML = '';
  game = new Game();
  game.init();
}
