var spaceShip, spaceShipImg;
var asteroids, asteroidsImg, asteroidsGroup;
var villianSpaceShips, villianSpaceShipsImg, villianSpaceShipGroup;
var laserBeam, laserBeamImg, laserBeamGroup;
var fuelSprite, fuelImg, fuelGroup;
var alien, alienImg, alienGroup;
var planetObs, planetObsImage, planetObsGroup;
var fuel = 100;
var score = 0;
var lives = 3;

var PLAY=0;
var WIN=1;
var LOSE=2;
var gameState = PLAY;

var backgroundImg;

const bgSound = new Audio("bgSound.wav");
const shootingSound = new Audio("laserBeamSound.wav");
const crashingSound = new Audio("crashingSound.wav");
crashingSound.volume = 1;
const GameOverWinSound = new Audio("winSound.wav");
GameOverWinSound.volume = 1;
const GameOverLoseSound = new Audio("loseSound.wav");
GameOverLoseSound.volume = 1;

function preload() {
  //pre-load images
  backgroundImg = loadImage("gameBackground.jpg");
  spaceShipImg2 = loadImage("rocketShip.png");
  spaceShipImg = loadAnimation("rocketShip.png", "rocketShip2.png", "rocketShip3.png", "rocketShip4.png", "rocketShip5.png", "rocketShip6.png", "rocketShip7.png");
  // villianSpaceShipsImg = loadImage("villianSpaceShip.png");
  villianSpaceShipsImg = loadAnimation("villianSpaceShip.png", "villianSpaceShip2.png", "villianSpaceShip3.png");
  laserBeamImg = loadImage("laserBeam.png");
  // asteroidsImg = loadImage("asteroidImg.png");
  asteroidsImg = loadAnimation("asteroidImg.png", "asteroidImg2.png", "asteroidImg3.png", "asteroidImg4.png", "asteroidImg5.png")
  // alienImg = loadImage("alien.png");
  alienImg = loadAnimation("alienDTC1.png", "alienDTC1.png","alienDTC1.png","alienNO2.png", "alienNO2.png", "alienNO2.png");
  fuelImg = loadImage("fuel.png");
  planetObsImage = loadAnimation("planetR1.png", "planetR2.png", "planetR3.png", "planetR4.png");

}

function setup(){
  createCanvas(displayWidth, displayHeight-150);

  spaceShip = createSprite(displayWidth/4, displayHeight/2);
  spaceShip.addAnimation("spaceShip", spaceShipImg);
  spaceShip.velocityX = 4;
  spaceShip.scale = 0.2;

  fuelSprite = createSprite(displayWidth, displayHeight/2);
  fuelSprite.addImage(fuelImg);
  fuelSprite.scale = 0.2;
  fuelSprite.velocityX = 4;
  fuelSprite.visible = false;

  villianSpaceShipGroup = new Group();
  laserBeamGroup = new Group();
  asteroidsGroup = new Group();
  fuelGroup = new Group();
  alienGroup = new Group();
  planetObsGroup = new Group();

  
}

function draw() {
  background(backgroundImg);
  fill("white");
  textSize(25);
  text("Fuel: " + fuel, spaceShip.x+450, 100);
  text("Lives: " + lives, spaceShip.x+575, 100);
  text("Score: " + score, spaceShip.x+700, 100);

  if(gameState == PLAY) {
    bgSound.play();
    bgSound.loop = true;

    camera.position.x = spaceShip.x+600;
    if(keyDown(UP_ARROW)) {
      spaceShip.y-=10;
    } else if(keyDown(DOWN_ARROW)) {
      spaceShip.y+=10;
    }

    if(keyDown("space") && camera.position.x % 20 == 0) {
      laserBeam = createSprite(spaceShip.x+100, spaceShip.y);
      laserBeam.velocityX = 60;
      laserBeam.addImage(laserBeamImg);
      laserBeam.scale = 0.05;
      laserBeamGroup.add(laserBeam);
      shootingSound.play();
    }

    if(camera.position.x % 100== 0) {
      fuel-=1;
    }

    if(camera.position.x % 900 == 0) {
      villianSpaceShips = createSprite(spaceShip.x+2000, random(0, displayHeight));
      villianSpaceShips.addAnimation("villianjet", villianSpaceShipsImg);
      villianSpaceShips.scale = 0.1;
      villianSpaceShipGroup.add(villianSpaceShips);
    }

    if(camera.position.x % 800 == 0) {
      asteroids = createSprite(spaceShip.x+2000, random(0, displayHeight));
      asteroids.addAnimation("asteroidAnimation", asteroidsImg);
      asteroids.scale = 0.1;
      asteroidsGroup.add(asteroids);
    }

    if(camera.position.x % 1000 == 0) {
      alien = createSprite(spaceShip.x+2000, random(0, displayHeight));
      alien.addAnimation("alienWalking", alienImg);
      alien.scale = 0.3;
      alienGroup.add(alien);
    }

    if(camera.position.x % 1100 == 0) {
      planetObs = createSprite(spaceShip.x+2000, random(0, displayHeight));
      planetObs.addAnimation("planetImage", planetObsImage);
      planetObs.scale = 0.05;
      planetObsGroup.add(planetObs);
    }

    if(laserBeamGroup.isTouching(villianSpaceShipGroup)) {
      villianSpaceShipGroup.destroyEach();
      laserBeamGroup.destroyEach(); 
      score +=1;
    }

    if(laserBeamGroup.isTouching(asteroidsGroup)) {
      asteroidsGroup.destroyEach();
      laserBeamGroup.destroyEach(); 
      score +=1;
    }

    if(laserBeamGroup.isTouching(alienGroup)) {
      alienGroup.destroyEach();
      laserBeamGroup.destroyEach(); 
      score +=1;
    }

    if(laserBeamGroup.isTouching(planetObsGroup)) {
      planetObsGroup.destroyEach();
      laserBeamGroup.destroyEach(); 
      score +=1;
    }


    if(villianSpaceShipGroup.isTouching(spaceShip)) {
      lives-=1;
      fuel-=20;
      crashingSound.play();
      villianSpaceShipGroup.destroyEach();
    }

    if(asteroidsGroup.isTouching(spaceShip)) {
      lives-=1;
      fuel-=20;
      crashingSound.play();
      asteroidsGroup.destroyEach();
    }

    if(alienGroup.isTouching(spaceShip)) {
      lives-=1;
      fuel-=10;
      crashingSound.play();
      alienGroup.destroyEach();
    }

    if(planetObsGroup.isTouching(spaceShip)) {
      lives-=1;
      fuel -=30;
      crashingSound.play();
      alienGroup.destroyEach();
    }

    if(fuel <= 15) {
      fuelSprite.visible = true;
      fuelSprite.velocityX = 0;

    }

    if(laserBeamGroup.isTouching(fuelSprite) && fuel <= 15) {
      fuel = 100;
      laserBeamGroup.destroyEach();
      fuelSprite.destroy();
    }

    if(fuel <= 0 || lives <= 0) {
      gameState = LOSE;
      villianSpaceShipGroup.destroyEach();
      laserBeamGroup.destroyEach();
      asteroidsGroup.destroyEach();
      alienGroup.destroyEach();
      planetObsGroup.destroyEach();
      GameOverLoseSound.play();
    }

    if(score >= 10) {
      gameState = WIN;
      villianSpaceShipGroup.destroyEach();
      laserBeamGroup.destroyEach();
      asteroidsGroup.destroyEach();
      alienGroup.destroyEach();
      planetObsGroup.destroyEach();
      GameOverWinSound.play();
    }
  }

  drawSprites();

  if(gameState == LOSE) {
    bgSound.pause();
    fill("red");
    textSize(50);
    text("Game Over! The spaceship has crashed.", camera.position.x-400, displayHeight/2);
    spaceShip.velocityX = 0;
    spaceShip.velocityY = 20;
  }

  if(gameState == WIN) {
    bgSound.pause();
    fill("red");
    textSize(50);
    text("You Won! Please play again", camera.position.x-300, displayHeight/2);
    spaceShip.addAnimation("spaceShip", spaceShipImg2);
    spaceShip.velocityX = 0;
    spaceShip.velocityY = 0;
  }
}