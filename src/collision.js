function Polygon(){
	this.points = [];
	for(var i in arguments)
	{
		this.points.push(arguments[i]);
	}
}

Polygon.interset=function(pA,pB)
{
	var a_axs = __separatingAxis__(pA);
	var pushVecs = [];
	for(var i = 0;i<a_axs.length;i++)
	{
		var pushVec = __axisSeparatingPolygons__(a_axs[i],pA,pB);
		if(pushVec==null)
			return false;
		else{
			pushVecs.push(pushVec);
		}
		
	}
	var b_axs = __separatingAxis__(pB);
	for(i=0;i<b_axs.length;i++){
		var pushVec = __axisSeparatingPolygons__(b_axs[i],pA,pB);
		if(pushVec ==null)
			return false;
		else{
			pushVecs.push(pushVec);
		}
	}
	var pushVec = pushVecs[0];
	for(i = 1;i<pushVecs.length;i++)
	{
		if(pushVec.length2()>pushVecs[i].length2()){
			pushVec = pushVecs[i];
		}
	}
	var MTD = pushVec;
	var aPos=new zl.Vec2();
	var bPos = new zl.Vec2();
	for(i = 0;i<pA.points.length;i++){
		aPos.add_m(pA.points[i]);
	}
	aPos.scale_m(1/pA.points.length);
	
	for(i = 0;i<pB.points.length;i++){
		bPos.add_m(pB.points[i]);
	}
	bPos.scale_m(1/pB.points.length);
	var d = aPos.sub(bPos);
	if(d.dot(MTD)<0.0)
		MTD.scale_m(-1);
	pA.MTD = MTD.scale(0.5);
	pB.MTD = MTD.scale(0.5);
	return true;
}

//axis可以分开，返回null
//axis不能分开，返回A，B重叠部分的向量
function __axisSeparatingPolygons__(ax,A,B){
	var a = __calProj__(ax,A);
	var b = __calProj__(ax,B);
	if(a.min>b.max || a.max<b.min)
		return null;
		
	var d0 = a.max - b.min;
	var d1 = b.max - a.min;
	var depth = (d0<d1)?d0:d1;
	var l2 = ax.length2();
	return ax.scale_m(depth/l2);
	
	//return false;
}

function __separatingAxis__(polygon){
	var result = [];
	
	var ps = polygon.points;
	var length = ps.length;
	
	for(var i = 0;i<length-1;i++)
	{
		result.push(ps[i+1].sub(ps[i]).ortho());
	}
	result.push(ps[0].sub(ps[i]).ortho());
	return result;
}

function __calProj__ (ax,polygon)
{
	var ps = polygon.points;
		var length = polygon.points.length;
		var d = ax.dot(ps[0]);
		var min = d,
			max = d;
		for(var i  = 1 ;i<length;i++){
			d = ax.dot(ps[i]);
			if(d<min)
				min= d;
			else if( d>max )
				max = d;
		}				
		return {"min":min,
				"max":max};
}

Polygon.prototype.intersetWith =function(other)
{
	return Polygon.interset(this,other);
		
}

Polygon.prototype.draw = function(ctx,color){
	var ps = this.points;
	var length =this.points.length;
	
	if(color)
		ctx.strokeStyle=color;
	
	ctx.beginPath();
	ctx.moveTo(ps[0].x,ps[0].y);
	for(var i = 1;i<length;i++){
		ctx.lineTo(ps[i].x,ps[i].y);
	}
	
	ctx.closePath();
	ctx.stroke();
}

