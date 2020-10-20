var tower, towerimg; 

var door, doorimg, doorgroup;

var climber, climberimg, climbergroup;

var ghost, ghostimg;

var invisibleblock, invisibleblockgroup;

var gamestate = "play";

var sound;
    
 function preload() {
   
   towerimg = loadImage("tower.png");
   doorimg = loadImage("door.png");
   climberimg = loadImage("climber.png");
   ghostimg = loadImage("ghost-standing.png")
   sound = loadSound("spooky.wav");
   
 }  
 
function setup(){
  
  createCanvas(600, 600);
  
  sound.loop();
  
  tower = createSprite (300, 300);
  tower.addImage (towerimg);
  tower.velocityY = 1;
  
  ghost = createSprite (200, 200, 50, 50);
  ghost.addImage (ghostimg);
  ghost.scale = 0.3;
  
  doorgroup = new Group();
  climbergroup = new Group();
  invisibleblockgroup = new Group();
  
}

function draw(){
  
  background ('black');
  
  if(gamestate === "play"){
    
  if (tower.y > 600){
    tower.y = 300
  }
  
  if (keyDown("left_arrow")){
    
    ghost.x = ghost.x -3;
  }
  
  if (keyDown("right_arrow")){
    
    ghost.x = ghost.x +3;
  }  
  
  if (keyDown("space")){
    
    ghost.velocityY = -5; 
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if (climbergroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
  }
  
  if (invisibleblockgroup.isTouching(ghost)||ghost.y > 600){
    
    ghost.destroy();
    gamestate = "over";
  }
  
  spawndoor();
  
  drawSprites();
    
  }
  
  if(gamestate === "over"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
  
}

function spawndoor(){
  
  if (frameCount%240===0){
    
    door = createSprite(200, -50);
    door.addImage(doorimg);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    doorgroup.add(door);
    
    climber = createSprite(200, 10);
    climber.addImage(climberimg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbergroup.add(climber);
    
    invisibleblock = createSprite(200, 15);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 1;
    invisibleblock.lifetime = 800;
    invisibleblockgroup.add(invisibleblock);
    invisibleblock.debug = true;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
  }
  
}