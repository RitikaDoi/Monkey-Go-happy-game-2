var monkey;
var banana;
var obstacle
var bg;
var monkey_running;
var monkey_collided;
var bananaImage;
var obstacleImage;
var obstacleGroup;
var backgroundImage;
var score;
var GameState = 1;
var PLAY = 1;
var END = 2;
var GO;

function preload()
{

 backgroundImage = loadImage("jungle.jpg")
  
 monkey_running = loadAnimation("Monkey_01.png",  "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
 monkey_collided = loadAnimation("Monkey_01.png")

 bananaImage = loadImage("banana.png");
  
 obstacleImage = loadImage("stone.png");
  
 GO = loadImage("Game over image.jpg")
  
}

function setup() 
{
  
  createCanvas(400, 400);
  
  bg = createSprite(0, 200);
  bg.addImage(backgroundImage);
  bg.x = bg.width/2;
  
  invisibleGround = createSprite(50, 370, 100, 10);
  invisibleGround.visible = false;

  monkey = createSprite(50, 330, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.11;
  
  GameOver = createSprite(200, 200);
  GameOver.addImage(GO);
  GameOver.scale = 0.2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;

}

function draw() 
{
  
  background(220);

  GameOver.visible = false;
  
  if(GameState === 1)
    {
      
      spawnBanana();
      spawnObstacles();
      
      bg.velocityX = -3;
      
      if(bg.x < 0)
        {
         
          bg.x = width/2;
        
        }
      
      if(keyDown("space"))
        {
          
          monkey.velocityY = -10;
          
        }
      
      monkey.velocityY = monkey.velocityY + 0.8;
      
      switch(score)
        {
            
          case 10: monkey.scale = 0.12;
            break;
          case 20: monkey.scale = 0.14;
            break;
          case 30: monkey.scale = 0.16;
            break;
          case 40: monkey.scale = 0.18;
            break;
          default: break;
            
        }
      
      if(monkey.isTouching(bananaGroup))
        {
          
          bananaGroup.destroyEach();
          score = score + 1;
          
        }
      
if(monkey.isTouching(obstacleGroup)&& monkey.scale===0.1)
        {
          
          GameState = 2;
          
        }
      
      if(monkey.isTouching(obstacleGroup))
        {
          
          obstacleGroup.destroyEach();
          monkey.scale = 0.1;
          
        }
      
    }
  
  if(GameState === 2)
    {
      
      GameOver.visible = true;
      
      bg.velocityX = 0;
      monkey.velocityX = 0;
      
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      
      monkey.changeAnimation("collided", monkey_collided);
      
      obstacle = createSprite(90,350)
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      
      if(bananaGroup.isTouching(GameOver))
        {
          
          bananaGroup.destroyEach();
          
        }
      
    }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("pink");
  text("Score: " + score, 300, 50);
  
}

function spawnBanana()
{
  
  if(frameCount%80 === 0)
    {
      
      banana =createSprite(450,Math.round(random(50,250)))
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -8;
      banana.lifetime = 55;
      bananaGroup.add(banana);
      
    }
  
}

function spawnObstacles()
{
  
  if(frameCount%300 === 0)
    {
      
      obstacle =createSprite(450,350)
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -8;
      obstacle.lifetime = 55;
      obstacleGroup.add(obstacle);
      
    }
  
}