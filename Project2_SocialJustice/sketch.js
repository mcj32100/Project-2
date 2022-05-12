/***********************************************************************************
  Clothing Search
  by Mitch Johnson
***********************************************************************************/


// adventure manager global  
var adventureManager;

// p5.play
var playerAvatar;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;


var speed = 10;

var numCollected = 0;

// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  clickables = clickablesManager.setup();

  playerAvatar = new Avatar("Player", 640, 400);
   
  playerAvatar.setMaxSpeed(30);

  playerAvatar.addMovingAnimation( 'assets/av_front2.png', 'assets/av_front3.png');
  playerAvatar.addStandingAnimation('assets/av_standing1.png','assets/av_standing2.png');

  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerAvatar.sprite);

  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();
 
  setupClickables(); 
}

function draw() {
  
  adventureManager.draw();

  clickablesManager.draw();
  
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {  
      
    checkMovement();

    // this is a function of p5.play, not of this sketch
    drawSprite(playerAvatar.sprite);
    //--
  } 
}

function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = -speed;
  }

  playerAvatar.setSpeed(xSpeed,ySpeed);
}

function mouseReleased() {
  if( adventureManager.getStateName() === "Splash") {
    adventureManager.changeState("Instructions");
  }
}



function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}

clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "yellow";
}


clickableButtonOnOutside = function () {
  this.color = "yellow";
}
 
clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name); 
}


function displayCollected() {
  push();
    fill('black');
    textAlign(TOP, RIGHT);
    textSize(25);
    text( "Collected Clothing = " + numCollected, width/2, height -100);

    pop();
}


class InstructionsScreen extends PNGRoom {
  
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 

  }

  
  draw() {  
    // this calls PNGRoom.draw()
    super.draw();
      
    // text draw settings
    fill(255);
    textSize(30);

    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}

// create a static sprite
class DownroadRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 600,300,'assets/shirt.png');
    this.isSetup = false;
    this.tshirtCollected = false;

    this.button = new StaticSprite("button", 800,100,'assets/shorts.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 150,600,'assets/hoodie.png');
    this.shoeCollected = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    // create a static sprite
    displayCollected();

    }
}

class BottomLeftRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 700,400,'assets/shorts.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 800,100,'assets/shirt.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 950,600,'assets/hoodie.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}

class LeftroadRoom extends PNGRoom {
  preload() {
    this.shorts = new StaticSprite("shorts", 600,400,'assets/hoodie.png');
    this.shortsCollected = false;
    
    this.button = new StaticSprite("button", 700,100,'assets/shirt.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 950,600,'assets/shorts.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.shorts.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.shortsCollected === false ) {
      drawSprite(this.shorts.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shorts.sprite)) {
        this.shortsCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}

class TopLeftRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 700,300,'assets/shirt.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 800,600,'assets/shorts.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 1050,350,'assets/hoodie.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}

class UproadRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 600,400,'assets/shorts.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 200,200,'assets/hoodie.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 900,500,'assets/shirt.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}

class ToprightRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 600,450,'assets/hoodie.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 200,250,'assets/shorts.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 800,650,'assets/shirt.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}

class RightroadRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 600,400,'assets/shirt.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 780,150,'assets/hoodie.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 800,600,'assets/shorts.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    
    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }
    
    displayCollected();
  
  }
  
}

class BottomRightRoom extends PNGRoom {
  preload() {
    this.tshirt = new StaticSprite("tshirt", 100,400,'assets/shorts.png');
    this.tshirtCollected = false;
    
    this.button = new StaticSprite("button", 200,200,'assets/hoodie.png');
    this.buttonCollected = false;

    this.shoe = new StaticSprite("shoe", 300,50,'assets/shirt.png');
    this.shoeCollected = false;

    this.isSetup = false
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    if( this.isSetup === false ) {
      this.tshirt.setup();
      this.button.setup();
      this.shoe.setup();
      this.isSetup = true;
    }
    // this calls PNGRoom.draw()
    super.draw();
    
    if( this.tshirtCollected === false ) {
      drawSprite(this.tshirt.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.tshirt.sprite)) {
        this.tshirtCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.buttonCollected === false ) {
      drawSprite(this.button.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.button.sprite)) {
        this.buttonCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    if( this.shoeCollected === false ) {
      drawSprite(this.shoe.sprite);

      // check for intersection, make collected
      if( playerAvatar.sprite.overlap(this.shoe.sprite)) {
        this.shoeCollected = true; 
        console.log("Collected");
        numCollected++;
      }
    }

    displayCollected();
  
  }
  
}


class TemplateScreen extends PNGRoom {
  preload() {
    
  }
  draw() {
    
    super.draw();    
  }
}

  