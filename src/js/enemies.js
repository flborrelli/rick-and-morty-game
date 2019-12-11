//Enemies array
let enemiesArray = [];
let enemiesImg = new Image();

class Enemies {
  constructor() {
    this.color = "red";
    this.width = 70;
    this.height = 70;
    this.x = Math.floor(Math.random() * (gameBoard.width - this.width));
    this.y = 0;
    this.speedY = 1+ Math.floor(Math.random() * 6); //random speed Y
    // this.speedY = 6;
  }

  //Draw Enemy
  drawEnemies() {
    this.y += this.speedY;
    enemiesImg.src = 'pocket-morty.png';
    ctx.drawImage(enemiesImg, this.x, this.y, this.width, this.height);
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

// Creating Random Enemies
//Add new enemy to our enemies array after 4 seconds (our game is running 60 FPS because of request animation frame)
const addNewEnemiesToEnemiesArray = () => {
  if (frames % 120 === 0) {
    enemiesArray.push(new Enemies());
  }
};
// Loop the array and draw a new enemy for each array element
const createNewEnemies = () =>
  enemiesArray.forEach(element => element.drawEnemies());

