var dog,normalDog,happyDog;
var feed;
var addFood;
var database;
var foodcount;
var food;
var foodS;
function preload(){
  normalDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  food=new Food();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(normalDog);
  dog.scale=0.15;

  feed=createButton("Feed your Pet")
  feed.position(70,95);
  feed.mousePressed(feedDog)

  addFood=createButton("add Food")
  addFood.position(800,95);
  addFood.mousePressed(AddFoods);

  database.ref("food").on("value",function(data){
    foodS=data.val();
   })
  
   database.ref("feedTime").on("value",function(data){
     lastFed=data.val();
   })

}

function draw() {
  background("blue");
   
 
  textSize(15);
drawSprites();
 // if(lastFed>=12){
    
  //}
 
  food.display();
 
}





//function to read food Stock


//function to update food stock and last fed time

function feedDog(){
  dog.addImage(happyDog);
  if(food.getFoodStock()<=0){
    food.updateFoodStock(food.getFoodStock()*10)
  }
  else{
   food.updateFoodStock(food.getFoodStock()-1);
  }
  database.ref("/").update({
  food:food.getFoodStock(),
  feedTime:hour()
  })
  
}

//function to add food in stock
function AddFoods(){
  
  foodS++;
  food.updateFoodStock(foodS)
  database.ref("/").update({
    food:foodS
  })
}
