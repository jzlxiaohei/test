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
	
	
	util.merge = function(s,t){
		for(var i in t){
			s[i] = t[i];		
		}
		return s;
	}
	
	//Recursive edition
	util.mergeR = function(s,t){
		for(var i in t){
			var ext = t[i];
			if( ext instanceof Object){
				(s[i] instanceof Object) || (s[i]={});
				mergeR(s[i],ext);
			}
			else{
				s[i] =t[i];
			}
		}	
		return s;
	}
	
}(exports)
