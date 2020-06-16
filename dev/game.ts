class Game {

    private gameObjects : GameObject[] = []

    constructor() {
        this.gameObjects.push(new Paddle(20, 87, 83))
        this.gameObjects.push(new Paddle(window.innerWidth-20, 38, 40))

        for (var i = 0; i < 5; i++) {
            this.gameObjects.push(new Ball())
        }

        this.update()        
    }

    public update(): void {

        for (const gameObject of this.gameObjects) {

            //call update functions from ball & paddle
            gameObject.update()
            
                // ball leaves the screen left: remove ball!
                if (gameObject.getRectangle().left < 0 && gameObject instanceof Ball) {

                    this.removeBall(gameObject)
                }
            
                // ball leaves the screen right: remove ball!
                if (gameObject.getRectangle().right > window.innerWidth+50 && gameObject instanceof Ball) {

                    this.removeBall(gameObject)
                }                
            

            if(gameObject instanceof Paddle){
                //checkt of gameObject een paddle is

                for (const ball of this.gameObjects) {
                    //loopt opnieuw door alle game objecten
                    
                    
                    if(ball instanceof Ball){
                        //als het gameobject een ball is

                        // ball hits paddle
                        if (this.checkCollision(ball.getRectangle(),gameObject.getRectangle())) {
                            ball.hitPaddle()
                        }
                    }
                }
            }  
        }


        //     b.update()
        // }

        // this.paddle.update()

        requestAnimationFrame(() => this.update())
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    private removeBall(ball : Ball){
        let i = this.gameObjects.indexOf(ball)
        this.gameObjects.splice(i, 1)
        console.log(this.gameObjects.length)
        
        ball.removeDiv()
    }
    
} 


window.addEventListener("load", () => new Game())