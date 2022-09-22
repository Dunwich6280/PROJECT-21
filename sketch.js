var jet, missile, sky, restart
var jetImg, missileImg, skyImg, restartImg
var missileGroup

var score=0
var gameState = "play"




function preload(){
  jetImg = loadImage("superhornet.png")
  missileImg = loadImage("missile.png")
  skyImg = loadImage("bluesky.jpg")
  restartImg = loadImage("restart.png")
  
}

function setup(){
  createCanvas(600,600)
  
  // creating the jet
  jet = createSprite(250,250)
  jet.addImage("jet", jetImg)
  jet.scale = 0.3

  //creating the restart button
  restart = createSprite(300,300)
  restart.addImage("restart", restartImg)
  restart.scale = 0.5

  jet.setCollider("rectangle",0,0,300,300)
  //jet.debug = true

  
  restart.visible = false

  missileGroup = new Group()
}

function draw(){
  background(skyImg)
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50)
  score = score + Math.round(getFrameRate()/60)

  if (gameState === "play") {
    
    if (keyDown("A") || keyDown("left_arrow")) {
      jet.x = jet.x - 10
      
    }

    if (keyDown("D") || keyDown("right_arrow")) {
      jet.x = jet.x + 10
      
    }

    spawnMissile()

    if (missileGroup.isTouching(jet)) {
      gameState = "end"
      
    }

    
  }

  

  if (gameState === "end"){
    restart.visible = true
    score = 0

    jet.velocityY = 0
    jet.velocityX = 0
    missileGroup.setVelocityYEach(0)
  }
  
  if (mousePressedOver(restart)) {
    reset()
  }

  missileGroup.velocityY= (7+(score/4))
 
  drawSprites();
}

function spawnMissile(){

  if (frameCount % 60 === 0) {
    var missile = createSprite(100, 800)
    // generating the missiles at random places
    missile.x = Math.round(random(1,600))
    missile.lifetime = 800
    missile.scale = 0.05
    missile.addImage(missileImg)
    missile.velocityY = -(4+3*score/100)
    missileGroup.add(missile)

    
  }
}

function reset() {
  gameState = "play"
  restart.visible = false

  missileGroup.destroyEach()   
  score = 0
}
  
