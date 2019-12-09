// //Setting our canvas game-board (500 x 800)
// const gameBoard = document.getElementById('game-board');
// const ctx = gameBoard.getContext('2d');

// // // Random Enemies

// class Enemies {
//   constructor(color){
//     this.color = color;
//     this.img = new Image();
//     this.width = 25;
//     this.heigth = 25;
//     this.x = Math.floor(Math.random() * gameBoard.width - this.width);
//     this.y = 0;
//     this.speed = 5;
//   }

//   drawEnemies(){
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.heigth);
//   }
// }

// let enemy1 = new Enemies("red");