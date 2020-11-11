var PLAY = 1
var END = 0
var TEXTSPACE = 3
var gameState = TEXTSPACE
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeystanding = loadImage("sprite_2.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
ground = createSprite(300,230,600,10)
  monkey = createSprite(70,195,30,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.11
  score = 0
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
background(1000);
 

  monkey.collide(ground);
  if(gameState === TEXTSPACE){
    text("Press Space To Start",250,150)
    if(keyWentDown("space")){
      gameState = PLAY
    }
    console.log(monkey.y)
  }
  if(gameState === PLAY ){
    text("press 'j'to jump",500,20)
     text("Score: "+ score, 500,50);
     score = score + Math.round(getFrameRate()/60);
 MonkeyJump();
      monkey.velocityY = monkey.velocityY + 0.6
    drawObstacles();
  }
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach(); 
    score = score +10
     }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END
  }
  drawSprites();
  if(gameState === END){
    obstacle.setVelocity(0,0);
    obstacleGroup.setLifetimeEach(-1);
    banana.setVelocity(0,0);
    FoodGroup.setLifetimeEach(-1);
    text("Press 'R' to Restart",200,50)
    text("Total Score = "+score,200,75)
    if(keyWentDown("r")){
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      gameState = PLAY
    }
  }
}
function drawObstacles(){
  if(frameCount%110 === 0){
    obstacle = createSprite(600,70,20,20);
   obstacle.addImage("obstacle",obstaceImage)
    obstacle.y = 200
    obstacle.scale = 0.130
    obstacle.velocityX = -6
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,40,40)
    
    banana = createSprite(605,100,20,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -6
    banana.scale = 0.09 
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
  }
  }
function MonkeyJump(){
  if(keyWentDown("j")&&monkey.y>190){
    monkey.velocityY = -12
  }
}