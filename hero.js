/**
 * Created by Administrator on 2015/10/3.
 */

var heroColor=new Array("#DED284","#FEF26E");
var enemyColor=new Array("#00A2B5","#00FEFE");


function Tanke(x, y, direct,color){
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.direct = direct;
    this.color=color;
    //up
    this.moveUp = function () {
        this.y -= this.speed;
        this.direct = 0;
    };
    this.moveRight = function () {
        this.x += this.speed;
        this.direct = 1;
    };
    this.moveDown = function () {
        this.y += this.speed;
        this.direct = 2;
    };
    this.moveLeft = function () {
        this.x -= this.speed;
        this.direct = 3;
    };
}


function Hero(x, y, direct,color) {
    //通过对象冒充，达到继承的效果
    this.tanke=Tanke;
    this.tanke(x, y, direct,color);
}


function EnemyTanke(x, y, direct,color){
    this.tanke=Tanke;
    this.tanke(x, y, direct,color);
}


//可以画自己和敌人的坦克
function draw(tanke) {
    switch (tanke.direct) {
        case 0:
        case 2:
            cxt.fillStyle = tanke.color[0];
            cxt.fillRect(tanke.x, tanke.y, 5, 30);
            cxt.fillRect(tanke.x + 15, tanke.y, 5, 30);
            cxt.fillRect(tanke.x + 6, tanke.y + 5, 8, 20);
            cxt.fillStyle = tanke.color[1];
            cxt.arc(tanke.x + 10, tanke.y + 15, 4, 0, 360, false);
            cxt.fill();
            cxt.strokeStyle = tanke.color[1];
            cxt.lineWidth = 2;
            cxt.beginPath();
            cxt.moveTo(tanke.x + 10, tanke.y + 15);
            if (tanke.direct == 0) {
                cxt.lineTo(tanke.x + 10, tanke.y);
            } else if (tanke.direct == 2) {
                cxt.lineTo(tanke.x + 10, tanke.y + 30);
            }
            cxt.closePath();
            cxt.stroke();
            break;
        case 1:
        case 3:
            cxt.fillStyle = tanke.color[0];
            cxt.fillRect(tanke.x, tanke.y, 30, 5);
            cxt.fillRect(tanke.x, tanke.y + 15, 30, 5);
            cxt.fillRect(tanke.x + 5, tanke.y + 6, 20, 8);
            cxt.fillStyle = tanke.color[1];
            cxt.arc(tanke.x + 15, tanke.y + 10, 4, 0, 360, false);
            cxt.fill();
            cxt.strokeStyle = tanke.color[1];
            cxt.lineWidth = 2;
            cxt.beginPath();
            cxt.moveTo(tanke.x + 15, tanke.y + 10);
            if (tanke.direct == 1) {
                cxt.lineTo(tanke.x + 30, tanke.y + 10);
            } else if (tanke.direct == 3) {
                cxt.lineTo(tanke.x, tanke.y + 10);
            }
            cxt.closePath();
            cxt.stroke();
            break;


    }
}