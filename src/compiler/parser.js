(function(g,undefined){

	
	
	//exp -> exp op exp 
	//exp -> num | true|false | ID | [ID*|NUM*]
	
	//exp -> (num | true| false| ID |[ID*|NUM*])exp
	//exp-> op exp| Epsilon
	
	var z = g.zl;
	
	var ERROR= z.ERROR;
	var EOF = z.EOF ;
	
	var PLUS = z.PLUS ;
	var MINUS = z.MINUS ;
	var MUL = z.MUL ;
	var DIV = z.DIV ;
	var LP = z.LP ;
	var RP = z.RP ;
	var LBRACK = z.LBRACK ;
	var RBRACK = z.RBRACK ;
	var LBRACE = z.LBRACE ;
	var RBRACE = z.RBRACE ;
	var SEMICOLON = z.SEMICOlON ;
	var CONMMA = z.COMMA ;
	var PERCENT = z.PERCENT ;
	var ASSIGN = z.ASSIGN ;
	
	var ID = z.ID ;
	var NUM = z.NUM ;
	//z.FLOAT ;
	var CHAR  = z.CHAR ;
	var STRING = z.STRING ;
	
	var IF = z.IF ;
	var ELSE = z.ELSE ;
	var WHILE = z.WHILE ;
	var DO = z.DO ;
	var RETURN = z.RETURN ;
	var BREAK = z.BREAK ;
	var FUNC = z.FUNC ;
	var VAR = z.VAR ;
	var PRINT = z.PRINT ;
	
	var EQ = z.EQ ;
	var NE = z.NE ;
	var LE = z.LE ;
	var LT = z.LT ;
	var GE = z.GE ;
	var GT = z.GT ; 
	var OR = z.OR ;
	var AND = z.AND ; 
	
	
	function ParserError(msg)
	{
		this.msg = msg||"parser error";
	}
	ParserError.prototype = new TypeError();
	ParserError.prototype.constructor = ParserError;
	
	
	var defineStat = function(props){
		var t = 1;
		return function()
		{
			var result  = {};
			result.type = t;
			if(props){
				for(var p in props)
				{
					result['p'] = props[p];
				}
			}
		}
	}();


	
	
	function Node(){
		
	}
	
	//p->pa|b
	//p->bR
	//R->aR|Epsilon
	
	
	//Term = num | (Exp)
	//Factor = Term | Factor*Term | Factor / Term
	//Exp = Factor | Exp +Factor |Exp -Factor
	
	//exp-> factor E
	//E -> + factor E | Eps
	//factor->term T
	//T-> * term T| Eps
	//term-> (exp)|number
	
	
	
	/*var parseExpr = function(){
		curToken = nextToken();
		if(curToken.equals(z.NUM)||curToken.equals(z.ID))
		{
			var left = curToken;
			var t = nextToken();
			if(t.equals (PLUS) || t.equals(MINUS)) {
				return {
					op:t,
					right:parseExpr(),
					'left':left
				}
			}
			else{
				return left;
			}
		}
		throw new ParserError("num or id expect");
	}*/
		
	
	
	var Parser = function(scan)
	{
		var curToken;
		//var prevToken;
		var nextToken=function(){
			var token = scan.nextToken();
			if(token==EOF){
				//throw new ParserError("need a token,but now is eof");
			}
			return token;
		};
		var back = function(){
			scan.back();
		}
		
		var match =function(cur ,target)
		{
			if( !target.equals(target) ){
				throw new ParserError("need "+target.desc+" but not");
			}
			
		};
		
		var parseTerm =function(){
			curToken = nextToken();
			if(curToken.equals(NUM))
				return curToken;
			match(curToken,LP);
				var exp = parseExpr();
			curToken = nextToken();
			match(curToken,RP);
			return exp;
		}
		
		var parseFactor =function(){
			var left = parseTerm();
			var temp = curToken;
			curToken = nextToken();
			if(curToken.equals(MUL)
				|| curToken.equals(DIV)){
				return{
					'op':curToken,
					'left':left,
					'right':parseFactor()
				}
			}
			else{
				curToken = temp;
				back();
				return left;
			}
		}
		
		var parseExpr = function(){
			var left = parseFactor();
			var temp = curToken;
			curToken = nextToken();
			if(curToken.equals(PLUS)
				||curToken.equals(MINUS)){;
				return {
					'op':curToken,
					'left':left,
					'right':parseExpr()
				}
			}
			else{
				curToken = temp;
				back();
				return left;
			}
		}
		//return node
		var parse=function(){
			return parseExpr();
		}
		return {
			'parse' :parse
		}
	}
	
	z.Parser = Parser;
	
	
})(window);