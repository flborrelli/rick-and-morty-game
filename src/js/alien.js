//Main character (Alien)

let rickImg = new Image();

class Alien {
  constructor(color) {
    this.color = color;
    this.width = 100;
    this.height = 100;
    this.x = gameBoard.width / 2 - this.width / 2;
    this.y = gameBoard.height / 2 - this.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.lifes = 10;
  }

  //Draw Rick and change image depending on onkey
  drawAlien() {
    if (!moveLeft && !moveRight && !moveBackward){
      rickImg.src = 'rick.png';
    } 
    else if(moveLeft){
      rickImg.src = 'rick-left2.png';
    }
    else if(moveRight){
      rickImg.src = 'rick-right2.png';
    }
    else if(moveBackward){
      rickImg.src = 'rick-front2.png';
    }
    ctx.drawImage(rickImg, this.x, this.y, this.width, this.height);
  }

  //New position after keyboard clicks
  alienNewPos() {
    this.y += this.speedY;
    if (this.y < 0) {
      this.y = 1;
    }
    if (this.y > gameBoard.height - this.height) {
      this.y = gameBoard.height - this.height - 1;
    }
    this.x += this.speedX;
    if (this.x < 0) {
      this.x = 1;
    }
    if (this.x > gameBoard.width - this.width) {
      this.x = gameBoard.width - this.width - 1;
    }
  }

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

}

const alienHitByEnemy = (arr) => {
  for (let i = 0; i < arr.length; i += 1){
    if((arr[i].bottom() > bigAlien.top()) && (arr[i].left() < bigAlien.right()) && (arr[i].right() > bigAlien.left())){
      arr.splice(i, 1);
      bigAlien.lifes -= 2;
      ctx.font = "30px Pixel";
      ctx.fillStyle = "#C73E1D";
      // ctx.fillText("SPONGEBOB IN DANGER !!!! =(", gameBoard.width / 4, gameBoard.height / 2.5);
    }
  }
  }