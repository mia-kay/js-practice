// here in the indexjs is the background of our game where we put other things inside 
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import bulletController from "./BulletController.js";

//This block of code sets up a canvas element for the game and obtains a 
//2D rendering context to manipulate and draw graphics on the canvas.
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//width and height of the canvas
canvas.width = 600;
canvas.height = 600;

//background image of the game
const background = new Image();
background.src = "images/space.png";

// this block of code creates and initializes these objects using their various classes
//with their own arguments
const playerBulletController = new bulletController(canvas, 10, "red", true);
const enemyBulletController = new bulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

// initialized variables that will indicate if the game is over or not, and 
//if the player won or not, respectively. when either is set to true, there will 
//be a display on the screen
let isGameOver = false;
let didWin = false;

//the main loop that controls the game's logic and rendering. It checks if the game is over, renders the background, displays the game-over screen, 
//and updates the positions and appearance of the game elements (enemies, player, bullets) if the game is still ongoing.
function game(){
    CheckGameOver();
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    }
}

// this function is responsible for rendering the game-over screen or victory message on the canvas,
// using the given text and positioning based on whether the game was won or lost.
function displayGameOver(){
if(isGameOver){
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
}
}

//this function is responsible for evaluating the conditions
// that determine if the game is over. It checks for collisions 
//between player and enemy bullets, collisions between player and 
//enemies, and also checks if all enemies have been eliminated. 
//Depending on the outcome of these checks, the isGameOver and didWin 
//variables are updated accordingly to reflect the game state.
function CheckGameOver(){
    if(isGameOver){
        return;
    }

    if(enemyBulletController.collideWith(player)){
          isGameOver = true;
    }

    if(enemyController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000/60);
// this means that we're calling the game loop 60 times every one sec