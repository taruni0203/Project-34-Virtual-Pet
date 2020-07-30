//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload(){

  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentDown(UP_ARROW)){
    fillStock(foodS);
    dog.addImage(dogImg);
  }
  textSize(15);
  fill("white");
  text("Press Down Arrow Key to Feed, Up Arrow Key to Refill",70,20);

  drawSprites();
  //add styles here
  fill("white");
  stroke("white");
  text("Food Remaining: "+foodS,200,100);
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food: x
  })
}
function fillStock(x){
  if(x>= 20){
    x = 20
  }
  else{
    x = x+1;
  }
    

  database.ref('/').update({
    food: x
  })
}



