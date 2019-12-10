//Enemies array
let enemiesArray = [];

class Enemies {
  constructor() {
    this.color = "red";
    this.img = new Image();
    this.width = 25;
    this.height = 25;
    this.x = Math.floor(Math.random() * (gameBoard.width - this.width) + this.width);
    this.y = 0;
    this.speedX = 1 + Math.random() * 6; //random speed X
    // this.speedY = 1 + Math.random() * 3; //random speed Y
    this.speedY = 2;
  }

  //Draw Enemy
  drawEnemies() {
    this.y += this.speedY;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //Sides of the enemy
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  crashWith() {
    return !((this.bottom() < bullet.top()) && (this.left() < bullet.right()) && (this.right() > bullet.left()));
}
}

// function checkGameOver() {
//   var crashed = enemiesArray.some(function(bullet) {
//     return .crashWith(bullet);
//   });

//   if (crashed) {
//     window.cancelAnimationFrame();
//   }
// }

// Creating Random Enemies
//Add new enemy to our enemies array after 4 seconds (our game is running 60 FPS because of request animation frame)
const addNewEnemiesToEnemiesArray = () => {
  if (frames % 60 === 0) {
    enemiesArray.push(new Enemies());
  }
};
// Loop the array and draw a new enemy for each array element
const createNewEnemies = () =>
  enemiesArray.forEach(element => element.drawEnemies());

