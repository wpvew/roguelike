class Enemy extends Character {
  constructor(map, gameFormList) {
    super(map, gameFormList);
    this.name = 'enemy';
    this.damage = 20;
    this.target = 'hero';
    this.moveDirectionX = !!(Math.round(Math.random()) * 2)
    this.moveY = !this.moveDirectionX ? Math.round(Math.random()) * 2 - 1 : 0;
    this.moveX = this.moveDirectionX ? Math.round(Math.random()) * 2 - 1 : 0;
    this.moveSpeed = 600;
    this.attackSpeed = 400;

    this.moveInterval = setInterval(() => {
      this.moveEnemy();
    }, this.moveSpeed);
    this.attackInterval = setInterval(() => {
      this.attack(this);
    }, this.attackSpeed);
  }

  deleteInterval() {
    clearInterval(this.moveInterval);
    clearInterval(this.attackInterval);
  }

  moveEnemy() {
    if(this.name === 'dead' || !this.gameFormList.length){
      this.deleteInterval()
      return
    }
    const enemyDOM = document.querySelector(`[x="${this.x}"][y="${this.y}"]`);

    const nextCell = this.gameFormList.find(item => item.x === this.x + this.moveX && item.y === this.y + this.moveY);

    if (this.map[this.y + this.moveY] !== undefined && this.map[this.y + this.moveY][this.x + this.moveX] !== undefined) {
      if (this.map[this.y + this.moveY][this.x + this.moveX] !== 1 && !['enemy', 'hero'].includes(nextCell?.name)) {
        enemyDOM.classList.remove('tileE');
        enemyDOM.innerHTML = '';

        this.setPosition(this.moveX, this.moveY)
        this.render(this.id);
      } else if (nextCell?.name !== 'hero') {
        this.moveX = -this.moveX;
        this.moveY = -this.moveY;

        if(this.moveY && this.map[this.y + this.moveY] !== undefined && this.map[this.y + 1][this.x] && this.map[this.y - 1][this.x]) {
          this.moveX = 1;
          this.moveY = 0;
        }
        if(this.moveX && this.map[this.y + this.moveY] !== undefined && this.map[this.y][this.x + 1] && this.map[this.y][this.x - 1]) {
          this.moveX = 0;
          this.moveY = 1;
        }
      }
    } else {
      this.moveX = -this.moveX;
      this.moveY = -this.moveY;
    }
  }
}
