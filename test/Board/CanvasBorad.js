+function(exports,undefined){
	"use strict"
	function CanvasBoard (cfg)
	{
		for(var i in cfg){
			this[i] = cfg[i];			
		}
		if(!this.ctx)
			throw new Error("ctx is needed");
	}
	
	function assignType(ctx,style){
		//(typeof null == object is true)
		if(style && typeof style=="object"){
			for(var i in style){
				if(ctx[i])
					ctx[i] = style[i];
			}
		}
	}
	function requireTypeMatch(s,t,msg){
		if(s!==t)
			throw new TypeError(msg);
	}
	
	CanvasBoard.prototype ={
		constructor : CanvasBoard,
		
		drawLine:function(line,style){
			
			requireTypeMatch(line.__type__, "line","drawLine function: Line is needed");
			
			var ctx = this.ctx;
			assignType(ctx, style);
			ctx.beginPath();
			ctx.moveTo(line.x1,line.y1);
			ctx.lineTo(line.x2,line.y2);
			ctx.stroke();

		},
		drawCircle:function(circle,style){
			
			requireTypeMatch(circle.__type__, "circle","drawLine function: Circle is needed");
			
			var ctx  = this.ctx;
			assignType(ctx, style);
			ctx.beginPath();
			ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2,true);
			var drawType = style.drawType || "fill";
			switch (drawType){
				case "fill":
					ctx.fill();break;
				case "stroke":
					ctx.stroke();break;
				case "both":
					ctx.stroke();
					ctx.fill();break;
				default:
					break;
			};

		}
	};
	
	
	
	exports.CanvasBoard = CanvasBoard;
}(exports)
