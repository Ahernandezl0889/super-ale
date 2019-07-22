let startGame = function() {
  let startBtn = document.getElementById("btn");
  startBtn.style.display = "none"
  
  //crea la clse objeto, movimiento y la pinta
      class Obstacle {
  
          constructor() {
              this.x = 1100;
              this.y = 400;
              this.width = 84;
              this.height = 122;
          }
  
          move(speed) {
              this.x = this.x - speed;
          }
  
          drawObstacle() {
  
              if ((this.x + this.width) < 0) {
                  this.x = 1100;
                  updateScore();
              }
              let obstacleImg = new Image();
              obstacleImg.src = "./images/pipe.png";
  
              ctx.drawImage(obstacleImg, this.x, this.y, 84, 122);
          }
      }
  
      let canvas = document.getElementById("the-canvas");
      var ctx = canvas.getContext("2d");
  
      let score = 0;
  
  
  
      let backgrounXPosition = 0;
  
      const floor = 400;
  
      let obstacle = new Obstacle()
  
  //crea el objeto mario
      let mario = {
          frameCounter: 0,
          frameNumber: 0,
          x: 100,
          y: floor,
          fallSpeed: 0,
          horizontalSpeed: 7,
          width: 39,
          height: 49,
          jump: function() {
              if (mario.y == floor) {
                  this.fallSpeed = -25;
              }
          },
          checkCollision(obstacle) {
              let point1IsIn = this.x > obstacle.x && this.x < obstacle.x + obstacle.width && this.y + this.height > obstacle.y
  
              let point2IsIn = this.x + this.width > obstacle.x && this.x + this.width < obstacle.x + obstacle.width && this.y + this.height > obstacle.y
  
  
              return point1IsIn || point2IsIn;
  
          }
      }
  
      document.onkeydown = function(e) {
          switch (e.keyCode) {
              case 32:
                  mario.jump();
                  break;
          }
      }
  
      
  //dibuja a mario
      function draw(mario) {
          let marioImg = new Image();
          marioImg.src = "./images/Running/frame" + mario.frameNumber + ".png";
  
          ctx.drawImage(marioImg, mario.x, mario.y, 100, 100);
          mario.frameCounter++;
  
  //jump
          //y = -25 + 0 = 25 -500 = 475 la proxima y = 24 asi hsata que llegue a 0 y empiece a caer
          mario.y += mario.fallSpeed;
          if (mario.y < floor) {
              mario.fallSpeed += 1
          } else {
              mario.fallSpeed = 0;
              mario.y = floor;
          }
  
  
  
          //animation
  
          if (mario.frameCounter % 5 == 0) {
              mario.frameNumber++;
              if (mario.frameNumber >= 12) {
                  mario.frameNumber = 0;
              }
          }
  
      }
  
      function updateBackground() {
  
          backgrounXPosition = backgrounXPosition - mario.horizontalSpeed;
          $("canvas").css("background-position-x", backgrounXPosition + "px");
      }
  
      function updateScore() {
          score++;
          document.getElementById("score").innerHTML = "Score: " + score;
          if (score % 3 == 0) {
              mario.horizontalSpeed++;
          }
      }
  
      function updateCanvas() {
          updateBackground();
          ctx.clearRect(0, 0, 1024, 512);
          draw(mario)
          obstacle.drawObstacle()
          obstacle.move(mario.horizontalSpeed)
          if (mario.checkCollision(obstacle)) {
              startBtn.style.display = "block"
              alert("Game Over");
          } else {
              setTimeout(function(){
              
                  updateCanvas();
              }, 16)
          }
      }
  
      setTimeout(function(){
      
          updateCanvas();
      }, 16)
  }
  
  window.onload = startGame;
  