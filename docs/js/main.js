"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        console.log("I am a gameobject");
    }
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("ball");
        document.body.appendChild(_this.div);
        _this.x = window.innerWidth;
        _this.y = Math.random() * (window.innerHeight - 100);
        _this.speedX = -3 - (Math.random() * 6);
        _this.speedY = Math.random() * 6 - 3;
        return _this;
    }
    Ball.prototype.hitPaddle = function () {
        this.speedX *= -1;
    };
    Ball.prototype.removeDiv = function () {
        this.div.remove();
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x > window.innerWidth) {
            this.speedX *= -1;
        }
        _super.prototype.update.call(this);
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.gameObjects = [];
        this.gameObjects.push(new Paddle(20, 87, 83));
        this.gameObjects.push(new Paddle(window.innerWidth - 20, 38, 40));
        for (var i = 0; i < 5; i++) {
            this.gameObjects.push(new Ball());
        }
        this.update();
    }
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var gameObject = _a[_i];
            gameObject.update();
            if (gameObject.getRectangle().left < 0 && gameObject instanceof Ball) {
                this.removeBall(gameObject);
            }
            if (gameObject.getRectangle().right > window.innerWidth + 50 && gameObject instanceof Ball) {
                this.removeBall(gameObject);
            }
            if (gameObject instanceof Paddle) {
                for (var _b = 0, _c = this.gameObjects; _b < _c.length; _b++) {
                    var ball = _c[_b];
                    if (ball instanceof Ball) {
                        if (this.checkCollision(ball.getRectangle(), gameObject.getRectangle())) {
                            ball.hitPaddle();
                        }
                    }
                }
            }
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.removeBall = function (ball) {
        var i = this.gameObjects.indexOf(ball);
        this.gameObjects.splice(i, 1);
        console.log(this.gameObjects.length);
        ball.removeDiv();
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(xp, up, down) {
        var _this = _super.call(this) || this;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.div = document.createElement("paddle");
        document.body.appendChild(_this.div);
        _this.upkey = up;
        _this.downkey = down;
        _this.x = xp;
        _this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        _super.prototype.update.call(this);
    };
    return Paddle;
}(GameObject));
//# sourceMappingURL=main.js.map