+function(exports,undefined){
	
	
	//c{x,y}, r
	//color,
	//drawType;
	function Circle(cfg){
		for(var i  in cfg){
			this[i] = cfg[i];
		}
		this.__type__ = "circle";
	}
	
	
	var fn = Circle.prototype;
	fn.draw = function(board){
		board.drawCircle(this,this.style);
	};
	//TODO test
	fn.contains = function(x,y){
		return (this.x-x)*(this.x-x)+(this.y-y)*(this.y-y)<=r*r;
	}
	
	exports.Circle = Circle;
}(exports)
