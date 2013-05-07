// vim: tabstop=4:softtabstop=4:shiftwidth=4:noexpandtab

/* Parser.js
 * written by Colin Kuebler 2012
 * Part of LDT, dual licensed under GPLv3 and MIT
 * Generates a tokenizer from regular expressions for TextareaDecorator
 */

function Parser( rules, i ){
	var self = this;

	// variables used internally
	self.i = i ? 'i' : '';
	self.parseRE = null;
	self.ruleSrc = [];
	self.ruleMap = {};

	self.add(rules);
};

Parser.prototype = {
	constructor: Parser,

	add: function( rules ){
		var self = this;

		for( var rule in rules ){
			var s = rules[rule].source;
			self.ruleSrc.push( s );
			self.ruleMap[rule] = new RegExp('^('+s+')$', self.i );
		}
		self.parseRE = new RegExp( self.ruleSrc.join('|'), 'g' + self.i );
	},

	tokenize: function(input){
		var self = this;

		return input.match(self.parseRE);
	},

	identify: function(token){
		var self = this;

		for( var rule in self.ruleMap ){
			if( self.ruleMap[rule].test(token) ){
				return rule;
			}
		}
	}
};

