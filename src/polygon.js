//“¿¿µ”⁄vec2.js
(function(g,undefined){
	function Polygon(ps){
		//this.points = ps;
		if(!(ps instanceof Array)
			throw new TypeError("Polygon need array to construct");
		//this.points = [];
		this.m = 1;
	}
	
	var pFn = Polygon.prototype;
	pFn.draw = function(ctx,color){
		color = color||"steelblue";
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.moveTo(this.points[0].x,this.points[0].y);	
		for(var i=1;;i<this.point.length;i++){
			ctx.lineTo(this.points[i].x,this.points[i].y);
		}
		ctx.lineTo(this.points[0].x,this.points[0].y);
		ctx.stroke();
	};
	pFn.setM(m){
		if(!m)
			throw new TypeError("mass should not be 0 or undefined");
		this.m = m;
	}
	
	
	
	
	var zl = g.zl||{};
	zl.rigid={};
	zl.rigid.Polygon = function(ps){
		return new Polygon(ps);
	}
	
})(window);