//creating variables 
var tower,towerImage ;
var ghost, ghostImage;
var door,doorImage;
var climber,climberImage;
var Iclimber ;
var doorGroup, climberGroup,IclimberGroup;
var PLAY= 1 ;
var END = 0 ;
var gameState  = PLAY ;
var x = 800 ;
var BGsound ;

function preload(){
 //loading images 
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
  //loading sounds
  BGsound = loadSound("spooky.wav");
}
function setup(){
  
  createCanvas(600,600);
  
  //creating sprites
  tower = createSprite(300,300,10,10);
  tower.addImage("tower",towerImage);
  
  ghost = createSprite(300,200,10,10);
  ghost.addImage("ghost", ghostImage);
  ghost.scale= 0.3 ;
   
  //creating group for door and climber 
  doorGroup = new Group();
  climberGroup = new Group();
  IclimberGroup = new Group();
  
  //playing sound
  BGsound.play();
  BGsound.setLoop(true);
  
}

function draw(){
  
  background("white"); 
  
  if(gameState === PLAY ){
  //creating infinite tower
  tower.setVelocity(0,3);
  
  if(tower.y >600){
    
    tower.y = 300;
  }
  
  //ghost controls : 
  if(keyDown("space")){
     
     ghost.velocityY = -5 ;
    
  }
    
  ghost.velocityY += 0.9 ;
  
  if(keyDown("left")){
    
    ghost.velocityX = -3 ;
  }
  
  
  if(keyDown("right")){
    
    ghost.velocityX = 3 ;
  }
  
  if(keyWentUp("right")||keyWentUp("left")){
    
    ghost.velocityX = 0 ;
  }
   
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0 ;
    //tower.velocityY = 0 ;
    //doorGroup.setVelocityYEach(0);
    //climberGroup.setVelocityYEach(0);
    //IclimberGroup.setVelocityYEach(0);
  }
  
  if(ghost.isTouching(IclimberGroup)|| ghost.y >600 ){
    ghost.destroy();
    gameState = END ;
  }
  
  //spawning doors
  spawnDoors();
  
  }
  
  if(gameState === END){
   
    tower.velocityY = 0 ;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    IclimberGroup.setVelocityYEach(0);
    doorGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    IclimberGroup.setLifetimeEach(-1);
    x =180 ;
     
  }
  drawSprites();
   
  fill("yellow");
  textSize(50);
  text("Game Over",x,300);
}

// function to spawn doors
function spawnDoors(){
  
  if(frameCount%150=== 0){
    
  door = createSprite(300,0,10,10);
  door.addImage("door",doorImage);
  door.velocityY = 3 ;
  door.x = random(100,500);
  door.lifetime = 200 ;
  doorGroup.add(door);
    
  climber = createSprite(300,70,10,10);
  climber.addImage("climber",climberImage);
  climber.velocityY = 3 ;
  climber.x = door.x ;
  climber.lifetime = 200 ;
  climberGroup.add(climber);
  
  Iclimber = createSprite(300,75,100,15);
  Iclimber.velocityY = 3 ;
  Iclimber.x = door.x ; 
  Iclimber.visible = false ;
  Iclimber.lifetime = 200 ;
  IclimberGroup.add(Iclimber);
    
  climber.depth = ghost.depth ;
  door.depth = ghost.depth ;
  ghost.depth += 1 ;
        
  }
}