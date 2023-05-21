class Character extends Draw {
  constructor(map, gameFormList) {
    super();
    this.id = generateRandomString();
    this.map = map;
    this.gameFormList = gameFormList;
    this.health = 100;
    this.x = 0;
    this.y = 0;
  }

  init() {
    this.x = generateRandomNumber(40, 0)
    this.y = generateRandomNumber(24, 0)

    while(this.map[this.y][this.x] === 1 || this.gameFormList.some(item => item.x === this.x && item.y === this.y)) {
      this.x = generateRandomNumber(40, 0)
      this.y = generateRandomNumber(24, 0)
    }
    return this;
  }

  attack(aggressor) {
    const [target] = this.getTargetAttack(aggressor);
    if(target) {
      const healthValue = target.health;
      const healthAfterAttack = healthValue - aggressor.damage;

      if(healthAfterAttack <= 0) target.name = 'dead';

      target.setHealth(healthAfterAttack);
      this.render(target.id);
    }
  }

  getTargetAttack(aggressor) {
    const vision = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];

    return vision.map((visionCell) => {
      const targetY = aggressor.y + visionCell[0];
      const targetX = aggressor.x + visionCell[1];
      const target = this.gameFormList.find(item => item.x === targetX && item.y === targetY);
      const isTarget = aggressor.target === target?.name;

      if(this.map[targetY] !== undefined && this.map[targetY][targetX] !== undefined && isTarget) {
        return target
      }
    }).filter(item => !!item)
  }

  setPosition(stepX, stepY) {
    this.x += stepX;
    this.y += stepY;
  }

  setHealth(value) {
    this.health = value;
  }
}
