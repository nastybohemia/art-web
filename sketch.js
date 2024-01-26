//sounds
let click;
var song;
let rectWidth;
let input;
let analyzer;
//let sound;
let button;
var songs = ['art-web/Moon River.wav', 'art-web/Kinone - Ghetto.wav'];
// number of songs in the music dir
var songCount = songs.length;
var currentSong = 0;
//dialog box
var dialogBoxI = {
    boxSizeX: 225,
    boxSizeY: 20,
    overBox: false,
    locked: false,
    image: ('art-web/keyboard-2.jpg'),
    closeBtn: ('art-web/close-128-1.png'),
    close: function(){
        dialogBoxI.close();
    },
    show: function(){
        dialogBoxI.show();
    }
};
let bx;
let by;

var isOverCloseBtn = false;
//image
var closeBtn;
//bottom menu
let trash;
let trashSound;
var isOverTrash;

let print;
let printSound;
var isOverPrint;

let settings;
let settingsSound;
var isOverSettings;

let eraser;
let eraserSound;
var isOverEraser;

let brush;
let brushSound;
var isOverBrush;
//draw
let ellipseX = 10;
let ellipseY = 10;
var graphics;
//color picker
let inp1;

function preload() {
    //bottom menu
    brush = loadImage ('art-web/brush-512-2.png');
    eraser = loadImage ('art-web/erase-512-1.png');
    print = loadImage ('art-web/print-1.png');
    settings = loadImage ('art-web/settings-1.png');
    trash = loadImage ('art-web/trash-bin-1.png');
}

function setup() {
    //load music song = loadSound('Moon River.wav', 'Kinone - Ghetto.wav');
    // create canvas
    let cnv = createCanvas(1435,715);
  // positions canvas 50px to the right and 100px
  // below upper left corner of the window
  cnv.position(0, 100);
    const c = createCanvas(1435,715);
    graphics = createGraphics(1435,715);
    box = createGraphics(1435,715);
    noStroke();
    //instuctions
    textSize(20);
    textAlign(CENTER);
    text('Drag an image file onto the canvas. Click to erase. Double click to play/stop music. Enable mic to draw squares. Press any key to change the color.', width / 2, height / 2);
    // Create an Audio input
    input = new p5.AudioIn();
    input.start();
    //sound.loop();
    //console
    console.log('Thank you for looking at my code!');
    //music player
    text(songs[currentSong], 1000, 695);
    //dialog box position
    bx = width / 2.0;
    by = height / 2.0;
    rectMode(RADIUS);
  //strokeWeight(2);
        background (150);
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background (150);
    //dialog box
    // Test if the cursor is over the box
  if (
    mouseX > bx - dialogBoxI.boxSizeX &&
    mouseX < bx + dialogBoxI.boxSizeX &&
    mouseY > by - dialogBoxI.boxSizeY &&
    mouseY < by + dialogBoxI.boxSizeY
  ) {
    dialogBoxI.overBox = true;
    if (!dialogBoxI.locked) {
      stroke(156, 0, 176);
    }
  } else {
    stroke(156, 39, 176);
    dialogBoxI.overBox = false;
  }
    //bottom menu
    image(brush, width / 4 + 100, height/2 + 250, print.width / 6, print.height / 6);
    image(eraser, width / 4 + 200, height/2 + 250, print.width / 6, print.height / 6);
    image(print, width / 4 + 300, height/2 + 250, print.width / 6, print.height / 6);
    image(settings, width / 4 + 400, height/2 + 250, settings.width / 6, settings.height / 6);
    image(trash, width / 4 + 500, height/2 + 250, trash.width / 6, trash.height / 6);
    //draw ellipses
    graphics.noStroke();
    //graphics.fill(255, 0, 0);
    graphics.ellipse(mouseX, mouseY, ellipseX, ellipseY);
    redWalker();
    rect(bx, by, dialogBoxI.boxSizeX, dialogBoxI.boxSizeY);
    //rect(bx, by+85, 255, 105);
    image(dialogBoxI.image, bx-250, by+20,dialogBoxI.boxSizeX+275,dialogBoxI.boxSizeY+132);
    image(dialogBoxI.closeBtn, bx-255, by-20,30,30);
    //box.img('keyboard-2.jpg');
    //box();
      // Draw the box
    //ellipse(mouseX, mouseY, ellipseX, ellipseY);
    // Get the overall volume (between 0 and 1.0)
    let volume = input.getLevel();
    // If the volume > 0.1,  a rect is drawn at a random location.
    let threshold = 0.1;
    // The louder the volume, the larger the rectangle.
    if (volume > threshold) {
        stroke(0);
        rect(random(10, width), random(height), volume * 50, volume * 50);
    }
    // Graph the overall potential volume, w/ a line at the threshold
    let y = map(volume, 0, 1, height, 0);
    let ythreshold = map(threshold, 0, 1, height, 0);
    noStroke();
    rect(0, 0, 0, height);
    // Then draw a rectangle on the graph, sized according to volume
    rect(0, y, 20, y);
    stroke(0);
    line(0, ythreshold, 19, ythreshold);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  //let speed = map(mouseY, 0.1, height, 0, 2);
  //speed = constrain(speed, 0.01, 4);
  //sound.rate(speed);
    //cursor
    /*if (mouseIsPressed == true) {
    cursor(HAND);  // Draw cursor as hand
        //graphics.erase();
  }
  else {
    cursor('brush-1.png'); // Draw cursor as cross
  }*/
    
    //brush hover
    var distanceBrush = dist(mouseX, mouseY, width / 4 + 150, height/2 + 300);
    if(distanceBrush < 50){
    isOverBrush = true;
  } 
    else {
    isOverBrush = false;
  }
    if(isOverBrush == true){
      //cursor(HAND);
    } 
    //brush coursor
    var distanceBrush = dist(mouseX, mouseY, width / 4 + 150, height/2 + 300);
    if(distanceBrush < 50){
    isOverBrush = true;
  } 
    else {
    isOverBrush = false;
  }
    /*if(isOverBrush.mousePressed == true){
      cursor('brush-1.png');
    } */
    //eraser hover
    var distanceEraser = dist(mouseX, mouseY, width / 4 + 250, height/2 + 300);
    if(distanceEraser < 50){
    isOverEraser = true;
  } 
    else {
    isOverEraser = false;
  }
    if(isOverEraser == true){
      //cursor(HAND);
    } 
    //print hover
    var distancePrint = dist(mouseX, mouseY, width / 4 + 350, height/2 + 300);
    if(distancePrint < 50){
    isOverPrint = true;
  } 
    else {
    isOverPrint = false;
  }
    if(isOverPrint == true){
      cursor(HAND);
    } 
    //settings hover
    var distanceSettings = dist(mouseX, mouseY, width / 4 + 450, height/2 + 300);
    if(distanceSettings < 50){
    isOverSettings = true;
  } 
    else {
    isOverSettings = false;
  }
    if(isOverSettings == true){
      cursor(HAND);
    } 
    //trash hover
  var distanceTrash = dist(mouseX, mouseY, width / 4 + 550, height/2 + 300);
    if(distanceTrash < 50){
    isOverTrash = true;
  } 
    else {
    isOverTrash = false;
  }
    if(isOverTrash == true){
      cursor(HAND);
    } 
    
    //closeBtn hover
    var distanceCloseBtn = dist(mouseX, mouseY, bx-245, by-10);
    if(distanceCloseBtn < 20){
    isOverCloseBtn = true;
  } 
    else {
    isOverCloseBtn = false;
  }
    if(isOverCloseBtn == true){
      cursor(HAND);
    } 
}

//image as bg
function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    const img = createImg(file.data);
    // Draw the image onto the canvas
    image(img, 0, 0, width, height);
  } else {
    console.log('Not an image file!');
  }
}

//draw or erase
/*function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
    if (mouseIsPressed == true){
      noErase(); 
    }
    else {
    noErase();
    }
}*/

//colors
function keyTyped() {
    let keyIndex = -1;
    if (key === '1'){
        ellipseX = 10;
        ellipseY = 10;
    }
    if (key === '2'){
        ellipseX = 20;
        ellipseY = 20;
    }
    if (key === '3'){
        ellipseX = 30;
        ellipseY = 30;
    }
    if (key === '4'){
        ellipseX = 40;
        ellipseY = 40;
    }
    if (key === '5'){
        ellipseX = 50;
        ellipseY = 50;
    }
    if (key === '6'){
        ellipseX = 60;
        ellipseY = 60;
    }
    if (key === '7'){
        ellipseX = 70;
        ellipseY = 70;
    }
    if (key === '8'){
        ellipseX = 80;
        ellipseY = 80;
    }
    if (key === '9'){
        ellipseX = 90;
        ellipseY = 90;
    }
    if (key === '0'){
        ellipseX = 0;
        ellipseY = 0;
    }
    if (key === 'a') {
        graphics.fill('aqua');
    }
    if (key === 'b') {
        graphics.fill('blue');
    }
    if (key === 'c') {
        graphics.fill('chocolate');
    }
    if (key === 'd') {
        graphics.fill('black');
    }
    if (key === 'e') {
        graphics.fill('ebony');
    }
    if (key === 'f') {
        graphics.fill('fuchsia');
    }
    if (key === 'g') {
        graphics.fill('green');
    }
    if (key === 'i') {
        graphics.fill('indigo');
    }
    if (key === 'j') {
        graphics.fill('jasmine');
    }
    if (key === 'k') {
        graphics.fill('khaki');
    }
    if (key === 'l') {
        graphics.fill('lime');
    }
    if (key === 'm') {
        graphics.fill('maroon');
    }
    if (key === 'n') {
        graphics.fill('navy');
    }
    if (key === 'o') {
        graphics.fill('olive');
    }
    if (key === 'p') {
        graphics.fill('purple');
    }
        if (key === 'r') {
        graphics.fill('red');
    }
    if (key === 's') {
        graphics.fill('silver');
    }
    if (key === 't') {
        graphics.fill('teal');
    }
    if (key === 'u') {
        graphics.fill('ultramarine');
    }
    if (key === 'v') {
        graphics.fill('violet');
    }
    if (key === 'w') {
        graphics.fill('white');
    }
    if (key === 'y') {
        graphics.fill('yellow');
    }
  if (key === 'x') {
    randFill_r = Math.floor(Math.random() * 255 + 1);
    randFill_g = Math.floor(Math.random() * 255 + 1);
      randFill_b = Math.floor(Math.random() * 255 + 1);
      graphics.fill(randFill_r, randFill_g, randFill_b);
  }
}

/*//music
function doubleClicked() {
  if (sound.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause();
      //sound.stop();
  } else {
    song.play();
      //sound.play();
  }
}

//new song
function getSong(songNumber) {
  if (songNumber < songs.length) {   // if the song number is in range
    if (song.isPlaying()) {
        song.stop();
    }
    // load a new song:
    song = loadSound(songs[currentSong], resumePlay);
    return true;
  } else {        // if the song number was out of range, return false
    return false;
  }
}
function resumePlay() {
  // if the song isn't playing, play it
  if (song.isPlaying()){
      song.stop();
  } else {
      song.play();
  }
}


//function getSong(currentSong) {
  //  song.play();
//}*/

//user
function keyPressed(next) {
/*    if (keyCode === SHIFT) {
  saveCanvas('bubble-pic', 'jpg');
    }*/
    if (keyCode === ENTER) {
        if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause();
            //sound.stop();
  } else {
    song.play();
      //sound.stop();
  }
            }
    if (keyCode === RIGHT_ARROW) {
            if (currentSong == songs.length) {
        currentSong = currentSong - songs.length;
                currentSong++;
      } else {
        currentSong = 0;
      }
      // get new song:
      getSong(currentSong);
            }
    }

function next(){
  index = index + 1;
}

//dialog box
function mousePressed() {
    click.play();
    //brush
    if(isOverBrush == true)
    {
        click.stop();
      brushSound.play();
      cursor('art-web/brush-1.png');
        //redWalker();
        graphics.noErase();
        ellipseX = 10;
        ellipseY = 10;
    } else {
        brushSound.stop();
        cursor('art-web/cursor-64-1.png');
        ellipseX = 0;
        ellipseY = 0;
  }
    //eraser
    if(isOverEraser == true)
    {
        click.stop();
      eraserSound.play();
      cursor('art-web/eraser-64-2.png');
        graphics.erase();
        ellipseX = 10;
        ellipseY = 10;
    } else {
        eraserSound.stop();
  }
    //print
    if(isOverPrint == true)
    {
        click.stop();
      printSound.play();
      cursor(HAND);
        window.print();
    } else {
        printSound.stop();
  }
    //settings
    if(isOverSettings == true){
        click.stop();
      settingsSound.play();
      cursor(HAND);
        redWalker();
        inp1 = createColorPicker('#ff0000');
        rect(bx, by, dialogBoxI.boxSizeX, dialogBoxI.boxSizeY);
    } else {
        
        settingsSound.stop();
  }
    //trash
    if(isOverTrash == true){
        click.stop();
      trashSound.play();
      cursor(HAND);
        if (confirm('Are you sure you want to destroy your painting?')){
            graphics.clear();
            trashSound.play();
        } else{
            trashSound.stop();
        }
    } else {
        trashSound.stop();
  }
    //dialog box
  if (dialogBoxI.overBox) {
    dialogBoxI.locked = true;
      ellipseX = 0;
        ellipseY = 0;
  } else {
    dialogBoxI.locked = false;
  }
    if(isOverCloseBtn == true)
    {
      dialogBoxI.close();
    } else {
       trashSound.stop(); 
  }
}

function mouseDragged() {
  if (dialogBoxI.locked) {
    bx = mouseX;
    by = mouseY;
  }
}

function mouseReleased() {
  dialogBoxI.locked = false;
}

function redWalker() {
  image(graphics, 0, 0);
}

function box() {
  image(graphics, 0, 0);
}
