console.log("If you are reading this message, we are all good brotha!");

//Setting our canvas game-board (800 x 500)
const gameBoard = document.getElementById("game-board");
const ctx = gameBoard.getContext("2d");
let frames = 0;
  

//Calling new Alien
const bigAlien = new Alien("blue");

//Animation
//1. Clear the canvas
const clearGameBoard = () =>
  ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

// 2. Moving Alien and Bullets
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
    case 32: // spacebar
      addNewBulletsToBulletsArray();
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

//3. Scores
const gameScore = () => {
  let score = Math.floor(frames / 60);
  ctx.font = "20px serif";
  ctx.fillStyle = "green";
  ctx.fillText(
    `Survival time: ${score}s`,
    (gameBoard.width / 4) * 3.25,
    (gameBoard.height / 100) * 4
  );
  return score;
};

//4. Lifes
const updateAlienLife = () => {
  let alienLifes = bigAlien.lifes;
  ctx.font = "20px serif";
  ctx.fillStyle = "green";
  ctx.fillText(
    `Lifes: ${alienLifes}`,
    (gameBoard.width / 4) * 3.4,
    (gameBoard.height / 100) * 8
  );
  //Every time an enemy cross the max height, Spongebob lost one life
  enemiesArray.forEach(element => {
    if (element.y > gameBoard.height) {
      element.y = 0;
      element.x = gameBoard.width;
      element.speedY = 0;
      bigAlien.lifes -= 1;
    }
  });
};

const checkGameOver = () => {
  if (bigAlien.lifes < 1) {
    ctx.font = "60px Pixel";
    ctx.fillStyle = "#C73E1D";
    ctx.fillText("GAME OVER =(", gameBoard.width / 4, gameBoard.height / 2.5);
    ctx.font = "60px Pixel";
    ctx.fillStyle = "#72BF8C";
    ctx.fillText(`Your Survival Time is: ${gameScore()}s`, gameBoard.width / 3, gameBoard.height / 2);
    window.cancelAnimationFrame();
  }
};

//Big function to call the game process (clear, draw, update...)
const playTheGame = () => {
  console.log("updating...");
  clearGameBoard();
  bigAlien.drawAlien();
  bigAlien.alienNewPos();
  addNewEnemiesToEnemiesArray();
  createNewEnemies();
  createNewBullets();
  updateAlienLife();
  gameScore();
  enemyHit(enemiesArray, bulletsArray);
  checkGameOver();
  // checkGameOver2();
  frames += 1;
  window.requestAnimationFrame(playTheGame);
};  

playTheGame();
