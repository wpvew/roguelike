class Draw {
  constructor() {
    this.status = ''
  }

  render(id) {
    const element = this.gameFormList.find(item => item.id === id);
    const item = document.querySelector(`.tile[x="${element.x}"][y="${element.y}"]`);
    item.innerHTML = '';
    item.classList.add(this.getClassName(element.name));

    if (element.name === 'dead') {
      item.className = 'tile'
      this.gameFormList = this.gameFormList.filter(item => item.id !== element.id);
    }

    if(['hero', 'enemy'].includes(element.name)) {
      const health = document.createElement('div');
      health.className = 'health';
      health.style.width = `${element.health}%`;
      item.append(health);
    }
  }

  getClassName(element) {
    switch (element) {
      case 'sword':
        return 'tileSW';
      case 'heal':
        return 'tileHP';
      case 'hero':
        return 'tileP';
      case 'enemy':
        return 'tileE';
      default:
        return 'tile';
    }
  }

  gameStop(titleText) {
    const enemies = this.gameFormList.filter(item => item.name === 'enemy')
    enemies.forEach(item => item.deleteInterval())
    this.hero = '';

    const endGameWindow = document.createElement('div');
    endGameWindow.classList.add('service-window');
    endGameWindow.style.position = 'absolute';
    endGameWindow.style.width = '100%';
    endGameWindow.style.height = '100%';
    endGameWindow.style.top = '0';
    endGameWindow.style.backdropFilter = 'blur(20px)';
    endGameWindow.style.zIndex = '100';
    endGameWindow.style.display = 'flex';
    endGameWindow.style.flexDirection = 'column';
    endGameWindow.style.alignItems = 'center';
    endGameWindow.style.justifyContent = 'center';

    const field = document.querySelector('.field');

    const title = document.createElement('h2');
    const button = document.createElement('button');
    title.innerText = titleText;
    button.innerText = 'New Game';

    endGameWindow.append(title)
    endGameWindow.append(button)

    field.append(endGameWindow);

    button.onclick = () => {
      newGame();
    }
  }

  gameOver() {
    this.gameStop('GameOver');
    this.status = 'lose'
  }

  gameWin() {
    this.gameStop('You Win!');
    this.status = 'win'
  }
}
