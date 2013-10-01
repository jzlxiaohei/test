+function(exports){
	
	var util = exports.util;
	
	
	var unitFunc = function(d,i){
		return d;
	}
	var unitArr = function(arr,i){
		return util.merge({},arr);
	}
	var normalArr = function(arr,i){
		return util.merge({},arr[i]);
	}
	
	var dataImpl  = function(Ctor){
	
		return function(data,f,num){
			if(!util.isArray(data)){
				num = num || 1;
				var g=unitArr;
			}
			else{
				num = data.length;
				g = normalArr;
			}
			
			f = f|| unitFunc;
			var item;
			for(var i =0;i<num;i++){
				this.arr.push(new Ctor(f(g(data,i),i)));
			}
			return this;
		};
	}
	
	var drawImpl  = function(board){
		for(var i = 0;i<this.arr.length;i++){
			this.arr[i].draw(board);
		}
	}
	
	var styleImpl = function(sty,f){
		f = f|| unitFunc;
		var g;
		if(util.isArray(sty))
			g = normalArr;
		else
			g = unitArr;
		
		//var s = util.merge({},sty);
		var item;
		for(var i = 0;i<this.arr.length;i++){
				item = this.arr[i]; 
				item.style = f(g(sty,i),i);
				//util.merge(item.style,f(g(sty,i),i));
		}
		
		return this;
	}
	
	var addImpl = function(shapes){
			for(var i =0;i<shapes.length;i++){
				this.arr.push(shapes);
			}
			return this;
	}
	
	var eachImpl = function(f){
		for(var i = 0;i<this.arr.length;i++){
			f(this.arr[i]);
		}
		return this;
	}
	
	//TODO animation implementation
	var animationImpl =function(prop,f,time){
		
	}
	
	exports.dataImpl = dataImpl;
	exports.drawImpl = drawImpl;
	exports.styleImpl = styleImpl;
	exports.addImpl = addImpl;
	exports.eachImpl = eachImpl;
}(exports)
