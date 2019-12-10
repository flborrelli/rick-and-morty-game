//Main character (Alien)
class Alien {
  constructor(color) {
    this.color = color;
    this.img = new Image();
    this.width = 50;
    this.height = 50;
    this.x = gameBoard.width / 2 - this.width / 2;
    this.y = gameBoard.height / 2 - this.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.lifes = 10;
  }

  //Draw Alien
  drawAlien() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
}


//BULETS

//Bullets array
let bulletsArray = [];
class Bullets {
  constructor(){
    this.color = "black";
    this.img = new Image();
    this.width = 10;
    this.height = 10;
    this.x = bigAlien.x + bigAlien.width/2 - 5;
    this.y = bigAlien.y;
    this.speedX = 0;
    this.speedY = 0;
  }
  drawBullets() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  //Bullet new position after shooting (spacebar keyboard click)
  bulletNewPos() {
    //If bullet is shooted, move it according to its speed
    if(this.speedY > 0){
      this.y -= this.speedY;
    }
      }
  
  //Sides of the bullet
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
};

const addNewBulletsToBulletsArray = () => {
  let bullets = new Bullets();
  bulletsArray.push(bullets);
  bulletsArray[bulletsArray.length - 1].speedY = 10;
};

const enemyHit = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i += 1){
    for (let j = 0; j < arr2.length; j += 1){
      if((arr1[i].bottom() < arr2[j].top()) && (arr1[i].left() < arr2[j].right()) && (arr1[i].right() > arr2[j].left())){
        console.log("acertou");
    }
  }
  }
}

//Loop the array and draw a new bullets for each array element
const createNewBullets = () => {
  bulletsArray.forEach(element => {
    element.drawBullets()
    element.bulletNewPos();
  });
}