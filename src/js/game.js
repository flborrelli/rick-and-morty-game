console.log("If you are reading this message, we are all good brotha!");

//Setting our canvas game-board (800 x 500)
const gameBoard = document.getElementById("game-board");
const ctx = gameBoard.getContext("2d");
let frames = 0;
let requestId = 0;
let pauseGame = false;
const themeSong = new Audio('theme.mp3');
const hitMorty = new Audio('tiny-rick.wav');
const shoot = new Audio('shot.mp3');
const portal = new Audio('portal.mp3');

let background = new Image();
background.src = 'background2.png';
ctx.drawImage(background, 0, 0, gameBoard.width, gameBoard.height);

const pauseNow = () => {
  pauseGame = !pauseGame;
    if(!pauseGame){
      requestId = requestAnimationFrame(playTheGame);
    }else {
      ctx.font = '200px Ricks';
      ctx.fillStyle = 'lightseagreen';
      ctx.fillText('PAUSE', (gameBoard.width / 2) - 200, gameBoard.height / 2);
      cancelAnimationFrame(requestId);
      themeSong.pause();
    }
}

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
      shoot.play();
      addNewBulletsToBulletsArray();
      break;
    case 80: //P button
      pauseNow();
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
  ctx.font = "20px Ricks";
  ctx.fillStyle = "#97ce4c";
  ctx.fillText(
    `Survival time: ${score}s`,
    (gameBoard.width / 4) * 3.20,
    (gameBoard.height / 100) * 4.5
  );
    return score;
  };

//4. Lifes
const updateAlienLife = () => {
  let alienLifes = bigAlien.lifes;
  ctx.font = "20px Ricks";
  ctx.fillStyle = "#97ce4c";
  ctx.fillText(
    `Lifes: ${alienLifes}`,
    (gameBoard.width / 4) * 3.4,
    (gameBoard.height / 100) * 10
  );
  //Every time an enemy cross the max height, Spongebob lost one life
  enemiesArray.forEach((element, idx) => {
    if (element.y > gameBoard.height) {
      portal.play();
      bigAlien.lifes -= 1;
      enemiesArray.splice(idx, 1);
    }
  });
};

const checkGameOver = () => {
  if (bigAlien.lifes < 1) {
    ctx.font = "150px Ricks";
    ctx.fillStyle = "plum";
    ctx.fillText("GAME OVER", (gameBoard.width / 2) - 300, gameBoard.height / 2);
    ctx.font = "60px Ricks";
    ctx.fillStyle = "palegreen";
    ctx.fillText(`You survived: ${gameScore()}s`, (gameBoard.width / 2) - 60, gameBoard.height - 180);
    window.cancelAnimationFrame(requestId);
    themeSong.pause();
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
  enemyHitByBullet(enemiesArray, bulletsArray);
  alienHitByEnemy(enemiesArray);
  themeSong.play();
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
    pauseNow();
  }
  document.getElementById("restart-button").onclick = function () {
    location.reload();
  }
}