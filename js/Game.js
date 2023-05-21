class Game extends Draw {
  constructor() {
    super();
    this.config = new Config();
    this.gameFormList = [];
    this.map = new Scene().init();
    this.hero = new Hero(this.map, this.gameFormList).init();
    this.gameFormList.push(this.hero);
  }

  init() {
    for(let i = 0; i < this.config.heals; i++) {
      this.gameFormList.push(new Heal(this.map, this.gameFormList).init());
    }
    for(let i = 0; i < this.config.swords; i++) {
      this.gameFormList.push(new Sword(this.map, this.gameFormList).init());
    }
    for(let i = 0; i < this.config.enemies; i++) {
      this.gameFormList.push(new Enemy(this.map, this.gameFormList).init())
    }

    for(let i = 0; i < this.gameFormList.length; i++) {
      this.render(this.gameFormList[i].id)
    }
  }
}
