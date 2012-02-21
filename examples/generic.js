
// generic.js
// a generic syntax parser
// by Colin Kuebler 2012
// with help from
// http://www.phoboslab.org/log/2007/08/generic-syntax-highlighting-with-regular-expressions

var parser = new Parser({
	whitespace: /\s+/,
	comment: /\/\*.*?\*\/|\/\/.*?\n|\#.*?\n/,
	string: /"(\\.|[^"])*"?|'(\\.|[^'])*'?/,
	number: /-?(\d+\.?\d*|\.\d+)|0x[\dA-Fa-f]+/,
	keyword: /(and|or|xor|for|do|while|foreach|as|return|die|exit|if|then|else|elseif|new|delete|try|throw|catch|finally|class|function|resource|var|global|const|static|public|private|protected|published|extends|switch|true|false|null|void|this|self|struct|def)(?!\w|=)/,
	variable: /(\$|\%|\@)(\->|\w)+\b/,
	define: /[$A-Z_a-z0-9]+/,
	op: /(\+|-|\*|\/|=|<|>)=?|(!=|\(|\)|\{|\}|\[|\]|\.)/,
	other: /\S+/,
});

