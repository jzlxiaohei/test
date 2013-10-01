+function(exports,undefined){
	
	var Line = exports.Line;
	var Circle = exports.Circle;
	var util = exports.util;
	
	
	//TODO add event
	//change function
	//animation(prop,f,t) f should return the end prop value
	//each(f)
	
	
	//Lines:
	function Lines(){
		this.arr = [];
	}
	
	Lines.prototype ={
		constructor:Lines,
		
		data :dataImpl(Line),
		
		draw:drawImpl,
		style:styleImpl,
		add:addImpl,
		each:eachImpl,
		
	}
	
	//Circles:
	function Circles(){
		this.arr=[];
	}
	Circles.prototype = {
		constructor:Circle,
		data: dataImpl(Circle),
		draw:drawImpl,
		style:styleImpl,
		add:addImpl,
		each:eachImpl
	}
	
	
	exports.Lines = Lines;
	exports.Circles = Circles;
}(exports)
