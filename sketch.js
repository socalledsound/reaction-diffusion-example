var _cellArray=[];     // two dimensional array of cells
var _cellSize = 4;      // size of each cell
var _numX=3;
var _numY=3;        // dimensions of grid

function setup() { 
  createCanvas(800, 400);
    frameRate(10);
  _numX = floor(width/(_cellSize));
  _numY = floor(height/(_cellSize));
    
_cellArray = Array(_numX);    
    
  for (var x = 0; x <_numX; x++) {
   _cellArray[x]=Array(_numY);   
  };
        
  restart();
} 

function restart() {
//  _cellArray = new Cell[_numX][_numY];
    
    
    _cellArray.forEach((item,index)=>{
            for (var y = 0; y<_numY; y++) {	 	
      item[y] = new Cell(index,y,_cellSize);	   
        }	               
    })
 console.log(_cellArray); 					
 
  for (var x = 0; x < _numX; x++) {
    for (var y = 0; y < _numY; y++) {	
      
      var above = y-1;		
      var below = y+1;		
      var left = x-1;			
      var right = x+1;			
      
      if (above < 0) { above = _numY-1; }	
      if (below == _numY) { below = 0; }	
      if (left < 0) { left = _numX-1; }	
      if (right == _numX) { right = 0; }	

     _cellArray[x][y].addNeighbour(_cellArray[left][above]);	
     _cellArray[x][y].addNeighbour(_cellArray[left][y]);		
     _cellArray[x][y].addNeighbour(_cellArray[left][below]);	
     _cellArray[x][y].addNeighbour(_cellArray[x][below]);	
     _cellArray[x][y].addNeighbour(_cellArray[right][below]);	
     _cellArray[x][y].addNeighbour(_cellArray[right][y]);	
     _cellArray[x][y].addNeighbour(_cellArray[right][above]);	
     _cellArray[x][y].addNeighbour(_cellArray[x][above]);		
    }
  }
}

function draw() {
  background(200);
  					
  for (var x = 0; x < _numX; x++) {
    for (var y = 0; y < _numY; y++) {
     _cellArray[x][y].calcNextState();
    }
  }
  						
  translate(_cellSize/2, _cellSize/2);  	
						
  for (var x = 0; x < _numX; x++) {
    for (var y = 0; y < _numY; y++) {
     _cellArray[x][y].drawMe();
    }
  }
}

function mousePressed() {
  restart();
}

//================================= object

var Cell = function(x,y,cellSize) {
    this.x=x*cellSize; 
    this.y=y*cellSize; 
    this.cellSize=cellSize;
    this.nextState=((x/500) + (y/300)) * 14; 
    this.state=this.nextState;
    this.lastState = 0; 
    this.neighbours = [];

//     this.init = function(float ex, float why) {
//        this.x = this.ex * this._cellSize;
//        this.y = this.why * this._cellSize;
//        this.nextState = ((this.x/500) + (this.y/300)) * 14;  
//        this.state = this.nextState;
//        //this is weird
//         this.neighbours = new Cell[0]; 
//     } 
// 
     this.addNeighbour = function(cell) {
         this.neighbours.push(cell); 
         console.log(this.neighbours)
     }
//
     this.calcNextState = function() {

        var total = 0;				
        for (var i=0; i < this.neighbours.length; i++) {	
           total += this.neighbours[i].state;		
        }					
        var average = int(total/8);

        if (average == 255) {
          this.nextState = 0;
        } else if (average == 0) {
          this.nextState = 255;
        } else {
          this.nextState = this.state + average;
          if (this.lastState > 0) { this.nextState -= this.lastState; }	 
          if (this.nextState > 255) { this.nextState = 255; }
          else if (this.nextState < 0) { this.nextState = 0; }
        }

        this.lastState = this.state;	
     }
 
     this.drawMe = function() {
        var xShrink = random(20,200);
         var sizer= random(1,4);;
         this.state = this.nextState;

        //stroke(0);
         noStroke();
        //fill(this.state,this.state*random(3),this.state*(random(5)),random(200));  
          //fill(this.state/random(30),this.state/random(60),this.state*(random(20)),random(20));  
        //ellipse(this.x, this.y, this.cellSize, this.cellSize);
        // ellipse(this.x, this.y, this.cellSize*this.state/random(100)/random(40), this.cellSize*this.state/random(100)/random(40));
         //rect(this.x, this.y, this.cellSize*this.state/xShrink, this.cellSize*this.state);
         // rect(this.x*3, this.y*3, this.cellSize*this.state/xShrink, this.cellSize*this.state);
         fill(random(255), this.state/random(255),this.state/random(255),this.state/3);
         ellipse(this.x, this.y, this.cellSize*sizer);
     }
}
