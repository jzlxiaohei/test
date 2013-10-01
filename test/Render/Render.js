+function(exports,undefined){
	"use strict"
	
	
	
	function Render(cfg){
		for(var i  in cfg){
			this[i] = cfg[i];
		}
		this.factorys=[];
	}
	
	Render.prototype = {
		constructor:Render,
  		register:function(prop,Factory){
  			this[prop] = function(){
  				var fac=new Factory();
  				this.factorys.push(fac);
  				return fac;
  			};
  		}
	}
	
	
	
	
	
	
	exports.Render = Render;
}(exports)
