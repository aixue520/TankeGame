/**
 * Created by Administrator on 2015/10/3.
 */

var heroColor=new Array("#DED284","#FEF26E");
var enemyColor=new Array("#00A2B5","#00FEFE");


function Tanke(x, y, direct,color){
    this.x = x;
    this.y = y;
    this.speed = 3;
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


function Bullet(x,y,direct,tank,type,color){
    this.x=x;
    this.y=y;
    this.speed=3;
    this.direct=direct;
    this.isLive=true;
    this.timer=null;
    this.tank = tank;
    this.type = type;
    this.color=color;
    this.run=function(){
        if(this.x<=0 || this>=400 || this.y<=0 || this.y>=400 ||this.isLive==false){
            this.isLive=false;
            if(this.type=='enemy'){
                this.tank.bulletIsLive = false;
            }
            window.clearInterval(this.timer);
        }else{
            switch(this.direct){
                case 0:
                    this.y-=this.speed;
                    break;
                case 1:
                    this.x+=this.speed;
                    break;
                case 2:
                    this.y+=this.speed;
                    break;
                case 3:
                    this.x-=this.speed;
                    break;
            }
        }

    }
}


function Hero(x, y, direct,color) {
    this.hero=Tanke;
    this.hero(x, y, direct,color);
    this.color = color;
    this.direct = direct;
    this.isLive = true;
    this.shotEnemy=function(){
        switch(this.direct){
            case 0:
                heroBullet=new Bullet(this.x+9,this.y,this.direct,this,'enemy');
                break;
            case 1:
                heroBullet=new Bullet(this.x+30,this.y+9,this.direct,this,'enemy');
                break;
            case 2:
                heroBullet=new Bullet(this.x+9,this.y+30,this.direct,this,'enemy');
                break;
            case 3:
                heroBullet=new Bullet(this.x,this.y+9,this.direct,this,'enemy');
                break;
        }
        heroBullets.push(heroBullet);
        //启动多个独立的定时器
        var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
        heroBullets[heroBullets.length-1].timer=timer;

    }
}


function EnemyTanke(x, y, direct,color){
    this.enemytanke=Tanke;
    this.enemytanke(x, y, direct,color);
    this.color = color;
    this.isLive = true;
    this.timer = null;
    this.speed = 2;
    this.count = 0;
    this.direct = direct;
    this.bulletIsLive = true;
    this.run = function(){
        switch(this.direct){
            case 0:
                if(this.y>0){
                    this.y--;
                }
                break;
            case 1:
                if(this.x+30<400){
                    this.x += this.speed;
                }
                break;
            case 2:
                if(this.y+30<400){
                    this.y += this.speed;
                }
                break;
            case 3:
                if(this.x>0){
                    this.x -= this.speed;
                }
                break;
        }
        if(this.count>=30){
            this.direct = Math.round(Math.random()*3);
            this.count=0;
        }
        this.count++;
        //在坦克走的过程中,判断一下,这个坦克的子弹是否活着
        if(this.bulletIsLive == false && this.isLive){
            //子弹已死,给他补充一颗
            switch(this.direct){
                case 0:
                    enemyBullets.push(new Bullet(this.x+9,this.y,this.direct,this,'enemy'));
                    break;
                case 1:
                    enemyBullets.push(new Bullet(this.x+30,this.y+9,this.direct,this,'enemy'));
                    break;
                case 2:
                    enemyBullets.push(new Bullet(this.x+9,this.y+30,this.direct,this,'enemy'));
                    break;
                case 3:
                    enemyBullets.push(new Bullet(this.x,this.y+9,this.direct,this,'enemy'));
                    break;
            }
            enemyBullets[enemyBullets.length-1].timer = window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
            this.bulletIsLive = true;
        }
    }
}


function drawHeroBullet(heroBullets){
    for(var i=0;i<heroBullets.length;i++){
        var heroBullet=heroBullets[i];
        if(heroBullet!==null && heroBullet.isLive){
            cxt.fillStyle="#FEF26E";
            cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
        }
    }

}


function drawEnemyBullet(enemyBullets){
    for(var i=0;i<enemyBullets.length;i++){
        var enemyBullet = enemyBullets[i];
        cxt.fillStyle="#00FEFE";
        if(enemyBullet!==null && enemyBullet.isLive){
            cxt.fillRect(enemyBullet.x,enemyBullet.y,2,2);
        }
    }
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


function isHitEnemyTank(heroBullets,enemyTanks){
    for(var i=0;i<heroBullets.length;i++){
        for(var j=0;j<enemyTanks.length;j++){
            //判断一下自己的子弹和敌人的坦克坐标
            if(enemyTanks[j].isLive){
                switch(enemyTanks[j].direct){
                    case 0:
                    case 2:
                        if(heroBullets[i].x>=enemyTanks[j].x&&heroBullets[i].x<=enemyTanks[j].x+20&&heroBullets[i].y>=enemyTanks[j].y&&heroBullets[i].y<=enemyTanks[j].y+30){
                            //标记敌人的坦克和我们的子弹已经死掉了
                            heroBullets[i].isLive = false;
                            enemyTanks[j].isLive = false;
                            var bomb = new Bomb(enemyTanks[j].x,enemyTanks[j].y);
                            bombs.push(bomb);
                        }
                        break;
                    case 1:
                    case 3:
                        if(heroBullets[i].x>=enemyTanks[j].x&&heroBullets[i].x<=enemyTanks[j].x+30&&heroBullets[i].y>=enemyTanks[j].y&&heroBullets[i].y<=enemyTanks[j].y+20){
                            //标记敌人的坦克和我们的子弹已经死掉了
                            heroBullets[i].isLive = false;
                            enemyTanks[j].isLive = false;
                            var bomb = new Bomb(enemyTanks[j].x,enemyTanks[j].y);
                            bombs.push(bomb);
                        }
                        break;
                }
            }

        }
    }
}

//定义炸弹类
function Bomb(x,y){
    this.x = x;
    this.y = y;
}

//判断敌人的子弹是否击中自己的坦克
function isHitHeroTank(enemyBullets,heroTank){
    for(var i=0;i<enemyBullets.length;i++){
        if(enemyBullets[i].isLive && heroTank.isLive){
            switch(heroTank.direct){
                case 0:
                case 2:
                    if(enemyBullets[i].x >= heroTank.x && enemyBullets[i].x <= heroTank.x+20 && enemyBullets[i].y >= heroTank.y && enemyBullets[i].y <= heroTank.y +30){
                        heroTank.isLive = false;
                        enemyBullets[i].isLive = false;
                    }
                    break;
                case 1:
                case 3:
                    if(enemyBullets[i].x >= heroTank.x && enemyBullets[i].x <= heroTank.x+30 && enemyBullets[i].y >= heroTank.y && enemyBullets[i].y <= heroTank.y +20){
                        heroTank.isLive = false;
                        enemyBullets[i].isLive = false;
                    }
                    break;
            }
        }
    }
}


