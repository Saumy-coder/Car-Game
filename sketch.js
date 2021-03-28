var car,carImage;
var ground,roadImage;
var gameState;
var enemyCar1,enemyCar2,enemyCar3;
var score,highScore;
var enemyCarGroup;

function preload() {
    carImage=loadImage("car-removebg-preview.png");
    roadImage=loadImage("road.jpg");
    enemyCar1=loadImage("enemyCar1-removebg-preview.png")
    enemyCar2=loadImage("enemyCar2-removebg-preview.png")
    enemyCar3=loadImage("enemyCar3-removebg-preview.png")
}

function setup() {
    createCanvas(300,700);

    ground=createSprite(150,-0,300,700);
    ground.addImage("road",roadImage);
    ground.scale=1.5;
    ground.velocityY=10;

    car=createSprite(150,450,10,10);
    car.addImage("car",carImage);
    car.scale=0.8;
    car.debug=true;
    car.setCollider("rectangle",0,0,100,200)

    gameState="play";

    enemyCarGroup = new Group();

    score=0;
    highScore=0;

}

function draw() {
    background("white");

    if(keyDown("SPACE")&&gameState==="end"){
       gameState="play";
       enemyCarGroup.destroyEach();
       ground.velocityY=10;
       score=0;
       ground.y=0
    }

    

    if(gameState==="play"){
        if(ground.y>700){
            ground.y=ground.height/2;
        }
        summonCars();
        if(car.isTouching(enemyCarGroup)){
            enemyCarGroup.setVelocityYEach(0);
            ground.velocityY=0;
            gameState="end"
            car.velocityX=0;
        }
        if(keyWentDown("left")){
            if(car.x==150){
                car.x=50;
            }
        }
        if(keyWentDown("left")){
            if(car.x==250){
                car.x=150;
            }
        }
        if(keyWentDown("right")){
            if(car.x==150){
                car.x=250;
            }
        }
        if(keyWentDown("right")){
            if(car.x==50){
                car.x=150;
            }
        }
        score=score+0.2
        drawSprites();
    textSize(15)
    text("Score:"+round(score),50,50)
    text("High Score:"+round(highScore),150,50)
    }

    if(gameState==="end"){
        textSize(25)
        textFont("verdana")
        text("GAME OVER",100,300)
        textSize(15)
        text("Press Space To Play Again",90,400)
        if(score>highScore){
            highScore=score;
        }
        
    }
}

function summonCars() {
    if(frameCount%60===0){
        var carY;
        var rand=Math.round(random(1,3));
        switch(rand){
            case 1: carY=50
            break;
            case 2: carY=150
            break;
            case 3: carY=250;
            break;
        }
        var enemyCar = createSprite(carY,-100,50,100) ;

        var enemyCarImage=Math.round(random(1,3));
        switch(enemyCarImage){
            case 1: enemyCar.addImage("1",enemyCar1)
            enemyCar.rotation=180;
            enemyCar.scale=0.7;
            enemyCar.setCollider("rectangle",0,0,100,200)
            break;

            case 2: enemyCar.addImage("2",enemyCar2)
            enemyCar.rotation=-90;
            enemyCar.scale=0.5;
            enemyCar.setCollider("rectangle",0,0,200,100)
            break;

            case 3: enemyCar.addImage("3",enemyCar3)
            enemyCar.rotation=-90;
            enemyCar.scale=0.5;
            enemyCar.setCollider("rectangle",0,0,200,100)
            break;
        }
        enemyCar.velocityY=10
        enemyCar.debug=true;
        enemyCarGroup.add(enemyCar)

    }
}