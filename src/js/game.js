console.log("If you are reading this message, we are all good brotha!")

//Setting our canvas game-board (800 x 500)
const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');
let frames = 0;

//Main character (Alien)
class Alien {
  constructor(color){
    this.color = color;
    this.img = new Image();
    this.width = 50;
    this.height = 50;
    this.x = (gameBoard.width / 2) - this.width / 2;
    this.y = (gameBoard.height / 2) - this.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.lifes = 10;
    this.score = Math.floor(frames / 60);
  }

  //Draw Alien
  drawAlien(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //New position after keyboard clicks
  alienNewPos() {
    this.y += this.speedY;
    if(this.y < 0) {
      this.y = 1;
    }
    if(this.y > gameBoard.height - this.height) {
      this.y = gameBoard.height - this.height - 1;
    }
    this.x += this.speedX;
    if(this.x < 0) {
      this.x = 1;
    }
    if(this.x > gameBoard.width - this.width) {
      this.x = gameBoard.width - this.width - 1;
    }
  }
}

//Enemies array
let enemiesArray = [];

class Enemies {
  constructor(){
    this.color = "red";
    this.img = new Image();
    this.width = 25;
    this.heigth = 25;
    this.x = Math.floor(Math.random() * gameBoard.width - this.width + 1);
    this.y = 0;
    this.speedX = 1 + Math.random() * 6; //random speed X
    // this.speedY = 1 + Math.random() * 3; //random speed Y
    this.speedY = 2;
  }

  //Draw Enemy
  drawEnemies(){
    this.y += this.speedY;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.heigth);
  }
}

//Animation
//1. Clear the canvas
const clearGameBoard = () => ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

//2. Creating Random Enemies
//Add new enemy to our enemies array after 4 seconds (our game is running 60 FPS because of request animation frame) 
const addNewEnemiesToEnemiesArray = () => {
  if(frames % 60 === 0){
    enemiesArray.push(new Enemies());
  }
};
// Loop the array and draw a new enemy for each array element
const createNewEnemies = () => enemiesArray.forEach(element => element.drawEnemies());

// 3. Moving Alien
// Moving Alien by keyboard clicks
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: // up arrow
      bigAlien.speedY -= 10;
      break;
    case 40: // down arrow
      bigAlien.speedY += 10;
      break;
    case 37: // left arrow
      bigAlien.speedX -= 10;
      break;
    case 39: // right arrow
      bigAlien.speedX += 10;
      break;
    default:
      console.log(`${e.key} is not a valid key!`);
  }
};
//Cut speed after the button was pressed
document.onkeyup = function(e) {
  bigAlien.speedX = 0;
  bigAlien.speedY = 0;
};

//4. Scores
const gameScore = () => {
  ctx.font = "20px serif";
  ctx.fillStyle = "green";
  ctx.fillText(`Survival time: ${bigAlien.score}s`, (gameBoard.width / 4) * 3.25, (gameBoard.height / 100) * 4);
};

//5. Lifes
const updateAlienLife = () => {
  let alienLifes = bigAlien.lifes;
  ctx.font = "20px serif";
  ctx.fillStyle = "green";
  ctx.fillText(`Lifes: ${alienLifes}`, (gameBoard.width / 4) * 3.4, (gameBoard.height / 100) * 8);
  //Every time an enemy cross the max height, Spongebob lost one life
  enemiesArray.forEach(element => {
    if(element.y > gameBoard.height){
      element.y = 0;
      element.x = gameBoard.width;
      element.speedY = 0;
      bigAlien.lifes -= 1;
    }
  })
}

//6. Game Over
const checkGameOver = () => {
  if(bigAlien.lifes < 9){
    ctx.font = '60px Pixel';
    ctx.fillStyle = '#C73E1D';
    ctx.fillText('GAME OVER =(', gameBoard.width/4, gameBoard.height/2.5);
    ctx.font = '60px Pixel';
    ctx.fillStyle = '#72BF8C';
    ctx.fillText(`Your Survival Time is: ${bigAlien.score}s`, gameBoard.width/6, gameBoard.height/2);
    // alert('GAME OVER =(');
    window.cancelAnimationFrame();
  }
}


//Calling new Alien
const bigAlien = new Alien("blue");

//Big function to call the game process (clear, draw, update...)
const playTheGame = () => {
  console.log('updating...');
  clearGameBoard();
  bigAlien.drawAlien();
  bigAlien.alienNewPos();
  addNewEnemiesToEnemiesArray();
  createNewEnemies();
  updateAlienLife();
  gameScore();
  checkGameOver();
  frames += 1;
  window.requestAnimationFrame(playTheGame);
}

playTheGame();