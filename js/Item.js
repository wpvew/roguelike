class Item {
  constructor(map, gameFormList) {
    this.id = generateRandomString();
    this.x = 0;
    this.y = 0;
    this.map = map;
    this.gameFormList = gameFormList;
  }

  init() {
    this.x = generateRandomNumber(40, 0);
    this.y = generateRandomNumber(24, 0);

    while(this.map[this.y][this.x] === 1 || this.gameFormList.some(item => item.x === this.x && item.y === this.y)) {
      this.x = generateRandomNumber(40, 0);
      this.y = generateRandomNumber(24, 0);
    }
    return this
  }
}
