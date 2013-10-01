+function(exports,undefined){
	
	//x1,y1,x2,y2
	//lineWidth,color
	//drawType = stroke|fill
	
	
	/*cfg = {
		x1:0,y1:0,x2:0,y2:0
		
		//do not use in this way
		style:{
			strokeType:,
			lineWidth:
			......
		}
	}
	*/
	
	//TODO 
	//magic number,should be configed
	//to tell a point is close enough to line,see contains function
	var close = 36;
	
	function Line(cfg){
		//this.drawType = "stroke";
		for(var i in cfg){
			this[i] = cfg[i];
		}
		this.__type__ = "line";
	}
	Line.prototype = {
		constructor:Line,
		draw : function(board){
			board.drawLine(this,this.style);
		},
		
		//TODO test
		contains:function(x,y){
			//see http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html
			var deltaX = this.x2-this.x1,
				deltaY = this.y2-this.y1;
			var a = deltaX*(this.y1-y)-(this.x1-x)*deltaY;
			var b = deltaX*deltaX + deltaY*deltaY;
			return  a*a/b < close;
		}
	}
	
	
	exports.Line = Line;
	
}(exports)
