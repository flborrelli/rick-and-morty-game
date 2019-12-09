// //Setting our canvas game-board (500 x 800)
// const gameBoard = document.getElementById('game-board');
// const ctx = gameBoard.getContext('2d');

// // //Main character (Alien)

// class Alien {
//   constructor(color){
//     this.color = color;
//     this.img = new Image();
//     this.width = 50;
//     this.height = 50;
//     this.x = (gameBoard.width / 2) - this.width / 2;
//     this.y = (gameBoard.height / 2) - this.height / 2;
//     this.speedX = 0;
//     this.speedY = 0;
//   }

//   //Draw Alien
//   drawAlien(){
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }

//   //New position after keyboard clicks
//   alienNewPos() {
//     this.y += this.speedY;
//     if(this.y < 0) {
//       this.y = 1;
//     }
//     if(this.y > gameBoard.height - this.height) {
//       this.y = gameBoard.height - this.height - 1;
//     }
//     this.x += this.speedX;
//     if(this.x < 0) {
//       this.x = 1;
//     }
//     if(this.x > gameBoard.width - this.width) {
//       this.x = gameBoard.width - this.width - 1;
//     }
//   }
// }
