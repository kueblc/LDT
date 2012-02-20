/* Parser.js
 * written by Colin Kuebler 2012
 * Part of LDT, dual licensed under GPLv3 and MIT
 * Generates a tokenizer from regular expressions for TextareaDecorator
 */

function Parser( rules ){
	/* INIT */
	var api = this;

	// variables used internally
	var parseRE = null;
	// functions used internally
	function generateRE(){
		var rulesrc = [];
		for( var rule in api.rules ){
			rulesrc.push( api.rules[rule].source.substr(1) );
		}
		parseRE = new RegExp( rulesrc.join('|'), "gi" );
	};

	api.rules = rules;
	api.tokenize = function(input){
		if( !parseRE ) generateRE();
		return input.match(parseRE);
	};
	api.identify = function(token){
		for( var rule in api.rules ){
			if( api.rules[rule].test(token) ){
				return rule;
			}
		}
	};

	return api;
};

