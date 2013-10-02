+function(exports,undefined){

	
	var util = exports.util = {}
	
	var toString = Object.prototype.toString;
	
	util.isArray = function(arr){
		return toString.call(arr) == "[object Array]";
	}
	util.isFunction = function(func){
		return toString.call(func) =="[object Function]";
	}
	
	//如果f不是function,简单的把obj(深)复制成num的元素
	//如果f是function,result push进f的返回值
	util.obj2arr = function (obj,num,f){
		num = num||1;
		var result = [];
		for(var i = 0;i<num;i++){
			if(util.isFunction(f)){
				result.push(f(obj,i));
			}
			else{
				result.push(util.merge({},obj));
			}
		}
		return result;
	}
	
	
//	util.merge = function(s,t){
//		for(var i in t){
//			s[i] = t[i];		
//		}
//		return s;
//	}
	
	//Recursive edition
	util.merge = function(s, t)
	{
	    for (var key in t)
	    {
	        var ext = t[key];
	        if (typeof (ext) != 'object')
	        {
	            s[key] = ext;
	        }
	        else
	        {
	            if (!s[key] || typeof (s[key]) != 'object')
	            {
	                s[key] = {};
	            }
	            merge(s[key], ext);
	        }
	    }
	    return s;
	};

	
}(exports)
