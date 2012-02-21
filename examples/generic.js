
var parser = new Parser({
	whitespace: /\s+/,
	comment: /\/\*.*?\*\/|\/\/.*?\n|\#.*?\n/,
	string: /"(\\.|[^"])*"?|'(\\.|[^'])*'?/,
	number: /(0x[\dA-Fa-f]+|\d+)\b/,
	keyword: /(and|or|xor|for|do|while|foreach|as|return|die|exit|if|then|else|elseif|new|delete|try|throw|catch|finally|class|function|resource|var|global|const|static|public|private|protected|published|extends|switch|true|false|null|void|this|self|struct)(?!\w|=)/,
	variable: /(\$|\%|\@)(\->|\w)+\b/,
	define: /[$A-Z_a-z0-9]+/,
	op: /(\+|-|\*|\/|=|<|>)=?|(!=|\(|\)|\{|\}|\[|\]|\.)/,
	other: /\S+/,
});

