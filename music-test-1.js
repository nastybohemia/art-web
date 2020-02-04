/*
 Music player
Plays a directory of music

Plays songs in a subdirectory of the sketch called music

Put any songs you want in the music subdirectory, then
copy the list of song names into the songs[] array.

created by Tom Igoe
5 Feb 2017

Serial communication code added from the ITP Physical Computing lab examples.
New Code to add the robot sound/button sound feedback added by Jamie Ruddy
along with the fabulous 80s musical choices. 
*/

var song;		// the sound file to be played
var robot;   // the sound of the button press

// the list of songs:
var songs = ['Moon River.wav', 'Kinone - Ghetto.wav'];

var songCount = songs.length; // number of songs in the music dir
var currentSong = 0;          // current song number

function preload() {          // load the first song on preload
 song = loadSound('music/' + songs[currentSong]);
 robot = loadSound('UI Bloop 1.wav');
}

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30, 20, 180);
  fill(255);
  // draw the song's name and current time in seconds:
  text(songs[currentSong], 20, 50);
  text(song.currentTime().toFixed(3), 20, 100);
  //text("sensor value: " + inData, 200, 200);
}

function controlSound(input) {
  switch(input) {
    case 49:   // start/stop, press 1
      if (song.isPlaying()){
       robot.play();
       robot.onended(song.stop());
        
      } else {
       robot.play();
       robot.onended(song.play());
      }
      break;
    case 50:   // play/pause, press 2
      if (song.isPlaying()){
       robot.play();
       robot.onended(song.pause());
      } else {
       robot.play();
       robot.onended(song.play());
      }
      break;
    case 51:    // skip ahead, press 3
      // make sure the song number is valid, and increment:
      if (currentSong < songs.length-1) {
        currentSong++;
      } else {
        currentSong = 0;
      }
      // get new song:
      getSong(currentSong);
      break;
    case 52:    // skip back, press 4
      // in the first second, just rewind the current track:
      if (song.currentTime() > 1.0) {
        robot.play();
        robot.onended(song.jump(0));
      // if more than a second has elapsed, then
      // make sure the song number is valid, and decrement:
      } else {
        if (currentSong > 0) {
          currentSong--;
        } else {
          currentSong = songs.length-1;
        }
        // get new song:
        getSong(currentSong);
      }
      break;
    case 53:    // fast forward, press 5
        robot.play();
        robot.onended(song.rate(2.0));   // double the play speed
      if (!song.isPlaying()){
        song.play();56
      }
      break;
    case 54:    // random song, press 6
      currentSong = Math.round(random(songCount));  // get a new song number
      getSong(currentSong);             // play it
      break;
  }
}

function getSong(songNumber) {
  if (songNumber < songs.length) {   // if the song number is in range
    if (song.isPlaying()) {
        song.stop();
    }
    // load a new song:
    song = loadSound('music/'+ songs[currentSong], resumePlay);
    return true;
  } else {        // if the song number was out of range, return false
    return false;
  }
}

function resumePlay() {
  // if the song isn't playing, play it
  if (song.isPlaying()){
   robot.play();
   robot.onended(song.stop());
  } else {
   robot.play();
   robot.onended(song.play());
  }
}

function keyReleased() {
  controlSound(keyCode);    // send the ASCII number of the key
}