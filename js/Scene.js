class Scene {
  constructor() {
    this.field = document.querySelector('.field');
    this.map = new Array(24).fill(1).map(() => new Array(40).fill(1));
    this.rooms = generateRandomNumber(11, 5);
    this.rowWays = generateRandomNumber(5, 3);
    this.columnWays = generateRandomNumber(5, 3);
    this.size = 25;
  }

  setWays() {
    for(let i = 0; i < this.columnWays; i++) {
      const row = generateRandomNumber(24, 0);
      const fill = Array(40).fill(0);
      this.map[row].splice(0, fill.length, ...fill);
    }
    for(let i = 0; i < this.rowWays; i++) {
      const column = generateRandomNumber(40, 0);
      const fill = Array(24).fill(0);
      for(let row = 0; row < fill.length; row++) {
       this.map[row][column] = 0;
      }
    }
  }

  setRooms() {
    for (let i = 0 ; i < this.rooms; i++) {
      const row = generateRandomNumber(9, 3);
      const column = generateRandomNumber(9, 3);
      const start = [Math.floor(Math.random() * (24 - row)), Math.floor(Math.random() * (40 - column))];

      if(!this.checkReachableRoom(start, row, column)) {
        i--;
        continue;
      }

      for (let j = 0; j < row; j++) {
        const fill = Array(column).fill(0);
        this.map[start[0] + j].splice(start[1], column, ...fill);
      }
    }
  }

  checkReachableRoom(start, row, column) {
    let isReachable = false;
    for (let n = start[0] - 1; n < start[0] + row + 1; n++) {
      if(n >= 0 && n === start[0] - 1 || n === start[0] + row) {
        for (let m = start[1]; m < start[1] + column; m++) {
          if(!this.map[n][m]) isReachable = true;
        }
      } else {
        if (n >= 0 && n < 23 && start[1] < 39 && start[1] > 0 ) {
          if(!this.map[n][start[1] - 1] || !this.map[n][start[1] + 1]) {
            isReachable = true;
          }
        }
      }
    }
    return isReachable;
  }

  init() {
    this.setWays();
    this.setRooms();
    for(let row = 0; row < 24; row++) {
      const cell = document.createElement('div');
      cell.style.height = `${this.size}px`;
      this.field.append(cell);
      for(let column = 0; column < 40; column++) {
        const tile = document.createElement('div');
        tile.setAttribute('x', column);
        tile.setAttribute('y', row);
        tile.className = 'tile';
        tile.style.left = `${column * this.size}px`;
        cell.append(tile);
        if(!this.map[row][column]) continue;
        tile.classList.add('tileW');
      }
    }
    return this.map;
  }
}
