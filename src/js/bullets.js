//BULETS
let pickle = new Image();

//Bullets array
let bulletsArray = [];

class Bullets {
  constructor(){
    this.color = "ligthgreen";
    this.img = new Image();
    this.width = 25;
    this.height = 50;
    this.x = bigAlien.x + bigAlien.width/2 - this.width/2;
    this.y = bigAlien.y;
    this.speedX = 0;
    this.speedY = 5;
  }
  drawBullets() {
    pickle.src = 'pickle2.png';
    ctx.drawImage(pickle, this.x, this.y, this.width, this.height);
  }
  //Bullet new position after shooting (spacebar keyboard click)
  bulletNewPos() {
    //If bullet is shooted, move it according to its speed
    if(this.speedY > 0){
      this.y -= this.speedY;
    }
      }
  
  //Remove Bullets that reached canvas's top
  removeBullets(idx, arr) {
    if(this.y < 0){
      arr.splice(idx, 1);
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
};

//Remove enemies and bullets after collision
const enemyHitByBullet = (arr1, arr2) => {
  for (let i = 0; i < arr2.length; i += 1){
    for (let j = 0; j < arr1.length; j += 1){
      // console.log('Enemies Array:', i, arr1.length);
      if((arr1[j].bottom() > arr2[i].top()) && (arr1[j].left() < arr2[i].right()) && (arr1[j].right() > arr2[i].left())){
        // console.log("acertou");
        arr1.splice(j, 1);
        arr2.splice(i, 1);
    }
  }
  }
}

//Loop the array and draw a new bullets for each array element
const createNewBullets = () => {
  bulletsArray.forEach((element, idx) => {
    element.drawBullets()
    element.bulletNewPos();
    element.removeBullets(idx, bulletsArray);
  });
}