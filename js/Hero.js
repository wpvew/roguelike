class Hero extends Character {
  constructor(map, gameFormList) {
    super(map, gameFormList)
    this.name = 'hero';
    this.damage = 25;
    this.target = 'enemy';
    this.controll();
  }

  attack() {
    super.attack(this);
    if(!this.gameFormList.filter(item => item.name === 'enemy').length) this.gameWin()
  }

  setDamage(value) {
    this.damage = this.damage + value;
    const heroIndex = this.gameFormList.map(item => item.id).indexOf(this.id);
    this.gameFormList[heroIndex].damage = this.damage;
  }

  setHealth(value) {
    super.setHealth(value);
    if(this.health <= 0) this.gameOver();
  }

  moveHero(stepX, stepY) {
    const hero = document.querySelector('.tileP');
    const nextCell = this.gameFormList.find(item => item.x === this.x + stepX && item.y === this.y + stepY);

    if(this.health > 0 && this.map[this.y + stepY] !== undefined && this.map[this.y + stepY][this.x + stepX] !== undefined &&
        this.map[this.y + stepY][this.x + stepX] !== 1 && nextCell?.name !== 'enemy') {

      const newHeroPosition = document.querySelector(`.tile[x="${nextCell?.x}"][y="${nextCell?.y}"]`);

      if(nextCell?.name === 'sword') {
        this.gameFormList = this.gameFormList.filter(item => item.id !== nextCell.id);
        newHeroPosition.classList.remove('tileSW');
        this.setDamage(nextCell.damage)
      }

      if(nextCell?.name === 'heal') {
        const health = nextCell.health + this.health;
        this.setHealth(health < 100 ? health : 100);
        this.gameFormList = this.gameFormList.filter(item => item.id !== nextCell.id);
        newHeroPosition.classList.remove('tileHP');
      }

      hero.classList.remove('tileP');
      hero.innerHTML = ''

      this.setPosition(stepX, stepY)
      this.render(this.id);
    }
  }

  controll() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      if(!this.status) {
        switch (e.code) {
          case 'KeyD':
            this.moveHero(1, 0);
            break;
          case 'KeyA':
            this.moveHero(-1, 0);
            break;
          case 'KeyW':
            this.moveHero(0, -1);
            break;
          case 'KeyS':
            this.moveHero(0, 1);
            break;
          case 'Space':
            this.attack(this)
            break;
        }
      }
    })
  }
}
