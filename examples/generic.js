
// generic.js
// a generic syntax parser
// by Colin Kuebler 2012
// with help from
// http://www.phoboslab.org/log/2007/08/generic-syntax-highlighting-with-regular-expressions

var parser = new Parser({
	whitespace: /\s+/,
	comment: /\/\*([^\*]|\*[^\/])*(\*\/?)?|(\/\/|#)[^\r\n]*/,
	string: /"(\\.|[^"])*"?|'(\\.|[^'])*'?/,
	number: /-?(\d+\.?\d*|\.\d+)|0x[\dA-Fa-f]+/,
	keyword: /(and|as|case|catch|class|const|def|delete|die|do|else|elseif|esac|exit|extends|false|fi|finally|for|foreach|function|global|if|new|null|or|private|protected|public|published|resource|return|self|static|struct|switch|then|this|throw|true|try|var|void|while|xor)(?!\w|=)/,
	variable: /(\$|\%|\@)(\->|\w)+(?!\w)|\${\w*}?/,
	define: /[$A-Z_a-z0-9]+/,
	op: /(\+|-|\*|\/|=|<|>)=?|(!=|\(|\)|\{|\}|\[|\]|\.)/,
	other: /\S+/,
});

