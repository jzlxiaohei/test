( function(g,undefined){
	
	
	function assert(exp,msg,parentNode){
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(msg));
		if(!parentNode)parentNode = document.getElementsByTagName("body")[0];
		if(exp)
			li.style.color = "green";
		else
		{
			li.style.color = "red";
			li.style.textDecoration = "line-through";
			li.style.fontSize= "1.2em";
			li.style.fontWeight = "bold";
		}
		parentNode.appendChild(li);
	}
	if(!g.zl) g.zl = {};
	
	
	
	g.zl.assertAlmostEqual = function(source,target,msg,epsilon){
		epsilon = epsilon || 1e-6;
		assert(Math.abs(source - target)<=epsilon,msg);
	};
	
	g.zl.assert = assert;
})(window)