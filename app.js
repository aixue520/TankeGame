/**
 * Created by Administrator on 2015/10/3.
 */

/*var canvas=document.getElementById("can1");
var cxt=canvas.getContext("2d");

//直线
cxt.moveTo(20,20);
cxt.lineTo(20,90);
cxt.stroke();

//三角形
cxt.beginPath();
cxt.moveTo(40,20);
cxt.lineTo(40,90);
cxt.lineTo(80,90);
cxt.closePath();
cxt.fill();   /!*cxt.stroke();*!/

//正方形
cxt.strokeRect(100,20,70,70);
cxt.fillStyle="#ff0000";
cxt.fillRect(190,20,70,70);

//圆形
cxt.fillStyle="#00ff00";
cxt.beginPath();
cxt.arc(300,60,20,0,360,false);
cxt.closePath();
cxt.fill();

//图片
var img = new Image();
img.src = "a.jpg";
//先加载
img.onload=function(){
    cxt.drawImage(img,20,100,200,150);
}

//文字
var text="肉嘟嘟";
cxt.fillStyle="#0000ff";
cxt.font="30px 宋体";
cxt.fillText(text,230,200);*/

var canvas1 = document.getElementById("map");
var cxt = canvas1.getContext("2d");


//定义炸弹
var bombs = new Array();
//0:up 1:right 2:down 3:left
var hero =new Hero(40,370,0,heroColor);
var heroBullets=new Array();

var enemyTanks=new Array();
var enemyBullets = new Array();
for(var i= 0;i<3;i++){
    var enemyTank=new EnemyTanke((i+1)*50,0,2,enemyColor);
    enemyTanks[i]=enemyTank;
    //draw(enemyTanks[i]);
    //让敌人的坦克动起来
    var timer = window.setInterval("enemyTanks["+i+"].run()",50);
    enemyTanks[i].timer = timer;
    //让敌人发射子弹
    var enemyBullet = new Bullet(enemyTanks[i].x+9,enemyTanks[i].y+30,enemyTanks[i].direct,enemyTanks[i],'enemy');
    enemyBullets.push(enemyBullet);
    enemyBullets[i].timer = window.setInterval("enemyBullets["+i+"].run()",50);
}

if(hero.isLive){
    draw(hero);
}


flashMap();

//定时刷新
function flashMap(){
    cxt.clearRect(0,0,400,400);
    isHitHeroTank(enemyBullets,hero);
    if(hero.isLive){
        draw(hero);
    }
    isHitEnemyTank(heroBullets,enemyTanks);
    drawHeroBullet(heroBullets);
    drawEnemyBullet(enemyBullets,enemyTanks);
    for(var i= 0;i<3;i++) {
        if (enemyTanks[i].isLive) {
            draw(enemyTanks[i]);
        }
    }
        for(var k=0;k<bombs.length;k++){
            var img1 = new Image();
            img1.src = '1.jpg';
            var x = bombs[k].x;
            var y = bombs[k].y;
            img1.load=function(){
                cxt.drawImage(img1,x,y,30,30);
            }
            bombs.splice(k,1);
        }
}


function test() {
    var code = event.keyCode;
    switch (code) {
        case 87:
            hero.moveUp();
            break;
        case 68:
            hero.moveRight();
            break;
        case 83:
            hero.moveDown();
            break;
        case 65:
            hero.moveLeft();
            break;
        case 74:
            hero.shotEnemy();
            break;
    }
    flashMap();
}

window.setInterval("flashMap()",100);
