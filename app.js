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


//0:up 1:right 2:down 3:left
var hero =new Hero(40,370,0,heroColor);

var enemyTanks=new Array();
for(var i= 0;i<3;i++){
    var enemyTank=new EnemyTanke((i+1)*50,0,2,enemyColor);
    enemyTanks[i]=enemyTank;
}

flashMap();
//定时刷新
function flashMap(){
    cxt.clearRect(0,0,400,400);
    draw(hero);
    for(var i= 0;i<3;i++){
        draw(enemyTanks[i]);
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
    }
    flashMap();
}

