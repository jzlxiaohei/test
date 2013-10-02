+function(exports){
	"use strict"
	
	var dataImpl = exports.dataImpl;
	var drawImpl = exports.drawImpl;
	var styleImpl = exports.styleImpl;
	var addImpl = exports.addImpl;
	var eachImpl = exports.eachImpl;
	
	var util = exports.util;
	var Line = exports.Line;
	
	function Lines(id){
		this.name = name;
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
	
	exports.Lines = Lines;
	
}(exports)
