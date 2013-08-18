(function(g,undefined){

	function Vec2(x,y){
		this.x = x||0;
		this.y = y||0;
	};

	Vec2.prototype.add  = function(v){
		return new Vec2(this.x+v.x,this.y+v.y);
	};

	Vec2.prototype.sub = function(v){
		return new Vec2(this.x-v.x,this.y-v.y);
	};

	
	Vec2.prototype.scale = function(s){
		return new Vec2(this.x*s,this.y*s);
	};

	Vec2.prototype.dot = function(v){
		return this.x*v.x+this.y*v.y;
	};

	Vec2.prototype.length = function(){
		return Math.sqrt(this.length2());
	};

	Vec2.prototype.length2 = function(){
		return this.x*this.x+this.y*this.y;
	};

	Vec2.prototype.normal =function(){
		l = this.length();
		return new Vec2(this.x/l,this.y/l);
	};

	Vec2.prototype.dis = function(v){
		return Math.sqrt(this.dis2());
	};

	Vec2.prototype.dis2 =function(v){
		var x = this.x -v.x;
		var y = this.y-v.y;
		return x*x+y*y;
	};

	Vec2.prototype.add_m=function(v){
		this.x +=v.x;
		this.y +=v.y;
		return this;
	};

	Vec2.prototype.sub_m = function(v){
		this.x-=v.x;
		this.y-=v.y;
		return this;
	};

	Vec2.prototype.scale_m = function(s){
		this.x*=s;
		this.y*=s;
		return this;
	};

	Vec2.prototype.equals = function(v){

		return this.x == v.x &&
				this.y == v.y;
	};
	
	Vec2.prototype.almostEquals = function(v, epsilon) {
		epsilon =epsilon || 1e-6;
		return Math.abs(this.x - v.x) <= epsilon && Math.abs(this.y - v.y) <= epsilon;
	}
	
	Vec2.prototype.toString =function(){
		return "("+this.x+","+this.y+")";
	};
	
	Vec2.prototype.set_m = function(v){
		this.x =v.x;
		this.y =v.y;
		return this;
	};
	
	//rad
	Vec2.prototype.angle = function(v){
		return Math.atan2(this.x*v.y-this.y*v.x,this.x*v.x+this.y*v.y);
	};
	
	Vec2.prototype.rotate = function(theta){
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		return new Vec2(this.x*cos-this.y*sin,
							this.x*sin+this.y*cos);
	};
	
	Vec2.prototype.rotate_m = function(theta){
		var x =this.x;
		var  y =this.y;
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		this.x = x*cos - y*sin;
		this.y = x*sin + y*cos;
		return this;
	};
	
	Vec2.prototype.ortho = function(){
		return new Vec2(-this.y,this.x);
	}
	
	
	
	if(! g.zl )g.zl={};
	g.zl.Vec2 = Vec2;
	
})(window);

