export default class Enemy {
    //creates and sets the height and  width of the enemy object's image
    //and loads the appropriate image file
    constructor(x, y, imageNumber){
        this.x=x;
        this.y=y;
        this.width=44;
        this.height=32;

        this.image = new Image();
        this.image.src = `images/enemy${imageNumber}.png`; 
    }

    //draws enemy on canvas using the drawimage method
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //controls the enemies' movement based on the given velocities
    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }

    //checks the overlapping conditions of their bounding boxes by determining 
    //if the enemy has collided with the sprite object
    collideWith(sprite){
        if(this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height){
               return true;
            }
            else{
               return false;
            }
    }
    
}