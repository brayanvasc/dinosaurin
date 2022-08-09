 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
 var gameOverImg, restartImg;
 var trex, trex_running, trex_collided;
 var ground, invisibleGround, groundImage;

 var cloudsGroup, cloudImage;
 var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

 var score;

 var jumpSound, checkPointSound, dieSound;


 function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
   restartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
 }

 function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,windowHeight-90,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(windowWidth/2,windowHeight,1200,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  

  invisibleGround = createSprite(300,windowHeight+17,600,40);
  invisibleGround.visible = false;
  
  gameOver = createSprite(windowWidth/2,windowHeight/2-20,400,20);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;
   restart = createSprite(windowWidth/2,windowHeight/2+20,400,20);
    restart.addImage(restartImg);
   restart.scale = 0.5;
   score = 0;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  
  
  trex.debug = false;
  trex.setCollider("circle",0,0,40);
 }

 function draw() {
  background("white");
  text("Pontuação: "+ score, 20,30);
  


  function reset(){

    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;

  }
  
  
  if(gameState === PLAY){
       
    gameOver.visible = false;

    restart.visible = false;

    ground.velocityX = -(4 +1*score/100);
   
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(touches.length > 0 || keyDown("space")&& trex.y >= 500) {
        trex.velocityY = -13;
        jumpSound.play();
        touches = [];
    }


     if(score > 0 && score%100 === 0){
      checkPointSound.play();
     }

  
    trex.velocityY = trex.velocityY + 0.9
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
        dieSound.play();
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);

     cloudsGroup.setVelocityXEach(0);
     
     gameOver.visible = true;

     restart.visible = true;

     trex.changeAnimation("collided",trex_collided);

     if (mousePressedOver(restart)){
      reset();
      }

   }
  
 

  trex.collide(invisibleGround);
  
  
  
  drawSprites();
 }

 function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(windowWidth,windowHeight-20,10,40);
   obstacle.velocityX = -(6 +score/100);

   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
 }

 function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(windowWidth,100,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 500;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
 }

