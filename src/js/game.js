console.log("If you are reading this message, we are all good brotha!");

//Setting our canvas game-board (800 x 500)
const gameBoard = document.getElementById("game-board");
const ctx = gameBoard.getContext("2d");
let frames = 0;

let background = new Image();
background.src = 'background2.png';
ctx.drawImage(background, 0, 0, gameBoard.width, gameBoard.height);

//Calling new Rick
const bigAlien = new Alien("blue");

//Animation
//1. Clear the canvas
const clearGameBoard = () => {
  ctx.drawImage(background, 0, 0, gameBoard.width, gameBoard.height);
}

// 2. Moving Alien and Bullets

//Turn Rick
let moveLeft = false;
let moveRight = false;
let moveBackward = false;

// Moving Alien by keyboard clicks
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: // up arrow
      bigAlien.speedY -= 15;
      break;
    case 40: // down arrow
      moveBackward = true;
      bigAlien.speedY += 15;
      break;
    case 37: // left arrow
      moveLeft = true;
      bigAlien.speedX -= 15;
      break;
    case 39: // right arrow
    moveRight = true;
      bigAlien.speedX += 15;
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
  moveLeft = false;
  moveRight = false;
  moveBackward = false;
  bigAlien.speedX = 0;
  bigAlien.speedY = 0;
};

//3. Scores
const gameScore = () => {
  let score = Math.floor(frames / 60);
  ctx.font = "20px serif";
  ctx.fillStyle = "#97ce4c";
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
  ctx.fillStyle = "#97ce4c";
  ctx.fillText(
    `Lifes: ${alienLifes}`,
    (gameBoard.width / 4) * 3.4,
    (gameBoard.height / 100) * 8
  );
  //Every time an enemy cross the max height, Spongebob lost one life
  enemiesArray.forEach((element, idx) => {
    if (element.y > gameBoard.height) {
      bigAlien.lifes -= 1;
      enemiesArray.splice(idx, 1);
    }
  });
};

const checkGameOver = () => {
  if (bigAlien.lifes < 1) {
    ctx.font = "60px Pixel";
    ctx.fillStyle = "plum";
    ctx.fillText("GAME OVER =(", gameBoard.width / 4, gameBoard.height / 2.5);
    ctx.font = "60px Pixel";
    ctx.fillStyle = "#97ce4c";
    ctx.fillText(`Your Survival Time is: ${gameScore()}s`, gameBoard.width / 3, gameBoard.height / 2);
    window.cancelAnimationFrame(requestId);
  }
};

let requestId = 0;
let pauseGame = false;

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
  enemyHitByBullet(enemiesArray, bulletsArray);
  alienHitByEnemy(enemiesArray);
  frames += 1;
  requestId = window.requestAnimationFrame(playTheGame);
  checkGameOver();;
};  

//Buttons click
window.onload = function () {
  document.getElementById("start-button").onclick = function (event) {
    window.requestAnimationFrame(playTheGame);
    event.target.disabled = true;
    // event.target.disabled = false;
  };
  document.getElementById("pause-button").onclick = function () {
    pauseGame = !pauseGame;
    console.log(pauseGame);
    if(!pauseGame){
      requestId = requestAnimationFrame(playTheGame);
    }else {
      cancelAnimationFrame(requestId);
    }
  }
  document.getElementById("restart-button").onclick = function () {
    location.reload();
  }
}