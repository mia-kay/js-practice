export default class Bullet {
    //creates new instances of the bullet object with the specified
    //initial properties. 
    constructor (canvas, x, y, velocity, bulletColor){
        this.canvas = canvas;
        this.x =x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 5;
        this.height = 20;
    }

    //updates the position of the bullet, sets the fill color, and draws
    // the bullet 
    draw(ctx){
        this.y -= this.velocity;
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //detects collision between the bullet and sprite object
    //and returns true if there is a collision, or false if otherwise. 
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
