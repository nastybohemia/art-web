function windows(x,y){
    this.x = x;
    this.y = y;
    
    this.display() = function(){
        image(instructions, this.x, this.y);
    }
    
    this.update() = function(){
        this.x = this.x + random(-1,1);
        this.y = this.y + random(-1,1);
    }
}