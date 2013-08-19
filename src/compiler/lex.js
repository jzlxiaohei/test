(function(g,undefined){
	
	function LexError(msg)
	{
		this.msg = msg||"lex error";
	}
	LexError.prototype = new TypeError();
	LexError.prototype.constructor = LexError;

	var z = g.zl = g.zl || {};
	
	var defineToken = function(){
		var tokenIndex = -1;
		return function(desc){
			return {
				'desc':desc,
				'index':tokenIndex++,
				'equals':function(other){
					return this.index == other.index;
				}
				
			}
		}
	}();
	
	//z.ERROR and z.EOF must be first two tokens
	z.ERROR =defineToken('error');
	z.EOF = defineToken('end of file');
	
	
	z.ID = defineToken("Id");
	
	//z.OP = defineToken("Operator"); 
	z.PLUS = defineToken("plus(+)");
	z.MINUS = defineToken("minus(-)");
	z.MUL = defineToken("multiply(*)");
	z.DIV = defineToken("divide(/)")
	z.LP = defineToken("left parentheses:(")
	z.RP = defineToken('right parentheses:)');
	z.LBRACK =defineToken('left bracket([)');
	z.RBRACK = defineToken('right bracket(])');
	z.LBRACE = defineToken('left brace({)');
	z.RBRACE = defineToken('right brace(})');
	z.SEMICOlON = defineToken('semicolon(;)');
	z.COMMA = defineToken("comma(,)");
	z.PERCENT = defineToken("percent sign(%)");
	z.ASSIGN = defineToken("assign(=)");
	
	z.NUM = defineToken("Number");
	//z.FLOAT = defineToken("Float");
	z.CHAR = defineToken("Char");
	z.STRING = defineToken("String");
	
	z.IF = defineToken("if Keyword");
	z.ELSE = defineToken("else keyword");
	z.WHILE = defineToken("while keyword");
	z.DO = defineToken("do keyword");
	z.RETURN = defineToken("return keyword");
	z.BREAK = defineToken('break keyword');
	z.FUNC =defineToken('func keyword');
	z.VAR = defineToken('var keyword');
	z.PRINT = defineToken('print keyword');
	
	z.EQ = defineToken('equal(==)');
	z.NE = defineToken('not equal(!=)');
	z.LE = defineToken('less or equal(<=)');
	z.LT = defineToken('less than(<)');
	z.GE = defineToken('greater or equal(">=")');
	z.GT = defineToken('greater than(">")'); 
	z.OR = defineToken('OR (||)');
	z.AND = defineToken('AND (&&)');
	
	lookupReserveWord =function(){
		var reserved = {
			'if':z.IF,
			'else':z.ELSE,
			'do':z.DO,
			'return':z.RETURN,
			'break':z.BREAK,
			'while':z.WHILE,
			'func':z.FUNC,
			'var':z.VAR,
			'print':z.PRINT
		};
		return function(str){
			if(str in reserved)
				return reserved[str];
			else return -1;
		}
	}();
	
	z.Scanner =function(str){
		var length = str.length;
		var i=0;
		var curChar;
		var prevIndex;
		var nextChar = function(){
			if(i==length)
				return z.EOF;
			return str.charAt(i++);
		}
		
		var comsumeS  =function(){
			//var c = str.charAt(i);
			while( curChar==' '||curChar=='\r'||curChar=='\n'||curChar=='\t'){
				//i++;
				curChar=nextChar();	
			}	
		}
		var back=function()
		{
			i--;
		}
		var readID = function(){
			var id = "";
			do{
				id +=curChar;
				curChar = nextChar();
			}while(curChar=='_'||(curChar>='a'&& curChar<='z')
					||(curChar>='A'&& curChar<='Z') )
			var r = lookupReserveWord(id);
			back();
			if(r==-1)
				return {
					'index':z.ID.index,
					'desc':z.ID.desc,
					'value':id
				}
			else
				return r;
		}
		var readNum=function(){
			var dotNum = 0;
			var numStr = "";
			do{
				numStr +=curChar;
				curChar = nextChar();
				if(curChar=='.')
				{
					if(dotNum==0){
						numStr+=curChar;
						
						curChar =nextChar();
						if(curChar>='0'&&curChar<='9'){
							numStr+=curChar;
							curChar = nextChar();
						}
						else
						{
							throw new LexError("need num after dot(.)");
						}
						dotNum++;
					}
					else{
						back();
						break;
					}
				}
			}while(curChar>='0'&&curChar<='9')
			back();
			return {
				'index':z.NUM.index,
				'desc':z.NUM.desc,
				'equals':z.NUM.equals,
				'value':parseFloat(numStr)
			}
		}
		
		var backToken=function()
		{
			i = prevIndex;
		}
		var getNextToken = function(){
			prevIndex = i;
			curChar = nextChar();
			if(curChar==z.EOF)
				return z.EOF;
					
			if(curChar==' '||curChar=='\t'||curChar=='\n'||curChar=='\r')
				comsumeS();
			
			if(curChar=='>'){
				if(nextChar()=='=')
					return z.GE;
				else{
					back();
					return z.GT;
				}		
			}
			
			if(curChar=='<'){
				if(nextChar()=='=')
					return z.LE;
				else {
					back();
					return z.LT;
				}
			}
			if(curChar=='='){
				if(nextChar()=='=')
					return z.EQ;
				else{
					back();
					return z.ASSIGN;
				}
			}
			
			if(curChar =='[')
				return z.LBRACK;
			if(curChar ==']')
				return z.RBRACK;
			if(curChar =='(')
				return z.LP;
			if(curChar ==')')
				return z.RP;
			if(curChar =='{')
				return z.LBRACE;
			if(curChar == '}')
				return z.RBRACE;
			
			if(curChar=='+')
				return z.PLUS;
			if(curChar=='-')
				return z.MINUS;
			if(curChar=='*')
				return z.MUL;
			if(curChar=='/')
				return z.DIV;
			if(curChar=='%')
				return z.PERCENT;
			if(curChar ==',')
				return z.COMMA;
			if(curChar ==';')
				return z.SEMICOLON;
			
			if(curChar=='&'){
				if(nextChar()=='&')
					return z.AND;
				else
					throw new LexError("&& should be together");
			}
			
			if(curChar =='|'){
				if(nextChar()=='&')
					return z.OR;
				else 
					throw new LexError("|| should be together");
			}
			
			if(curChar =='!'){
				if(nextChar()=='=')
					return z.NE;
				else 
					throw new LexError("|| should be together");
			}
			
			if(curChar>='0'&&curChar<='9')
				return readNum();
			
			if(curChar=='_'||(curChar>='a'&& curChar<='z')
				||(curChar>='A'&& curChar<='Z'))
				return readID();
				
			if(curChar==z.EOF)
				return z.EOF;
				
			throw new LexError("can not detect zhe char "+curChar);
		}
		
		return {
				'back' : backToken,
				'nextToken':getNextToken
		}
	}
	
	
})(window);