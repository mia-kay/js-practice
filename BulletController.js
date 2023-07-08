import Bullet from "./Bullet.js";
export default class bulletController{
    bullets = [];
    timeTillNextBulletAllowed = 0;
    
// sets up the configuration for bullet shooting, including the canvas, 
//maximum number of bullets, bullet color, and sound settings
    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled){
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.wav");
        this.shootSound.volume = 0.5;
    }

    // drawing of bullets on the canvas. It filters out any bullets that are outside the visible area, logs the remaining number of bullets to the console, and then iterates over the remaining bullets to draw them on the canvas using the 
    //provided rendering context. It also manages the time delay between successive bullet shots if applicable.
    draw(ctx){
        this.bullets = this.bullets.filter(bullet=> bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);
        console.log(this.bullets.length);



        this.bullets.forEach(bullet => bullet.draw(ctx));
        if(this.timeTillNextBulletAllowed > 0){
            this.timeTillNextBulletAllowed--;
        }
    }

    //detects collisions between bullet and sprite object and
    //removes the bullet from the bullets array if a collision is found. 
    //It returns true if a collision occurred and false otherwise. 
    collideWith(sprite){
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
             bullet.collideWith(sprite));

             if(bulletThatHitSpriteIndex >= 0){
                this.bullets.splice(bulletThatHitSpriteIndex, 1);
                return true;
             }
             return false;
    }
    
//handles the shooting of bullets. It checks if shooting is allowed based on 
//the time delay and the maximum number of bullets.
// If shooting is allowed, a new Bullet object is created and added to the bullets array. and plays a sound effect if sound is enabled 
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0){
         
             if(this.timeTillNextBulletAllowed <= 0 && 
                this.bullets.length < this.maxBulletsAtATime){
                    const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
                    this.bullets.push(bullet);
                    if(this.soundEnabled){
                        this.shootSound.currentTime = 0;
                        this.shootSound.play();
                    } 
                    this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
                }
    }
}
