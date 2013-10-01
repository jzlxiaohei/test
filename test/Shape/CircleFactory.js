+function(exports){
	"use strict"
	
	var dataImpl = exports.dataImpl;
	var drawImpl = exports.drawImpl;
	var styleImpl = exports.styleImpl;
	var addImpl = exports.addImpl;
	var eachImpl = exports.eachImpl;
	
	var Circle = exports.Circle;
	var util = exports.util;
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
	
	exports.Circles = Circles
	
}(exports)
