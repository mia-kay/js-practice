// here in the enemyController it deals with there movement
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController{
  // the enemyMap represents a grid-like arrangement of different types of enemies.
  // Each number in the array corresponds to a specific enemy type, 
  //allowing for the creation of the enemy patterns in 
  //the game.
    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];

      enemyRows = [];


//initializes these variables that control the movement, timers, and velocities of a game. 
      currentDirection = MovingDirection.right;
      xVelocity = 0; 
      yVelocity = 0;
      defaultXVelocity = 1;
      defaultYVelocity = 1;
      moveDownTimerDefault = 30;
      moveDownTimer = this.moveDownTimerDefault;
      fireBulletTimerDefault = 100;
      fireBulletTimer = this.fireBulletTimerDefault;


//creates and initializes these objects, which are class instances.
    constructor (canvas, enemyBulletController, playerBulletController){
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;

        this.enemyDeathSound = new Audio('sounds/enemy-death.wav');
        this.enemyDeathSound.volume = 0.5;

        this.createEnemies();
    }

    //updates and renders the game objects on the canvas.
    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }


    //checks for collisions between player bullets and enemies, plays a sound 
    //effect for enemy death, removes the enemy from the row upon collision, 
    //and filters out empty enemy rows
    collisionDetection(){
        this.enemyRows.forEach(enemyRow=>{
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collideWith(enemy)){
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play();
                    enemyRow.splice(enemyIndex, 1);
                }
            })
        })

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length>0);
    }

    //determines when to fire a bullet, selects a random enemy to fire from, calls the 
    //appropriate method on the enemyBulletController to shoot the bullet, and 
    //resets the bullet firing timer.
    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies [enemyIndex];
            this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
            console.log(enemyIndex);
        }
    }


//ensures that the enemies continue their downward movement by resetting 
//the timer once it reaches or falls below 0
    resetMoveDownTimer(){
        if(this.moveDownTimer<= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    //decrements the move-down timer only when the enemies are moving in the 
    //downward directions specified (downLeft or downRight).
    //controls the pace or timing of the downward movement of the entities. 
    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || 
           this.currentDirection === MovingDirection.downRight) {
            this.moveDownTimer--;
           }
    }

    //checks for specific movement directions and updates the velocity 
    //accordingly, checks for boundary conditions to trigger a change in direction
    updateVelocityAndDirection() {
        for(const enemyRow of this.enemyRows) {
            if(this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow [enemyRow.length-1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.downLeft) {
                this.xVelocity = 0;
                this.yVelocity = this.defaultYVelocity;
                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            } else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRow[0];
                if(leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if (this.currentDirection ===MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }
        }
    }

    //sets the vertical velocity for downward movement
    moveDown(newDirection){
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    //updates positions and allows for the enemies to be visually rendered and 
    //move on the screen according to the specified velocity.
    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    //method that creates the enemies and organizes them into rows based on the
    //enemy map
    createEnemies() {
        this.enemyMap.forEach((row, rowIndex)=>{
            this.enemyRows[rowIndex]= [];
            row.forEach((enemyNumber, enemyIndex)=>{
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex* 50, rowIndex * 35, enemyNumber));
                }
            })
        })
    }

    //checks for collisions between the enemy entities and the sprite object
    collideWith(sprite){
        return this.enemyRows.flat().some(enemy => enemy.collideWith(sprite));
    }
}