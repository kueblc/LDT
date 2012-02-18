#Lightweight Decorator Textarea
###In browser live syntax highlighting
LDT aims to provide a simple, lightweight, and highly extensible alternative to existing in-browser live syntax highlighting solutions by leveraging clever CSS and native functionality.

##Using LDT
Turning a regular `textarea` into an auto highlighting `ldtextarea` is easy.
###HTML
<pre>
&lt;textarea id='codeArea'&gt;&lt;/textarea&gt;
</pre>
###JS
<pre>
// create a parser with a mapping of css classes to regular expressions
var parser = new Parser(
  { whitespace: /^(\s+)/,
    comment: /^(\/\/[^\r\n]*)/,
    other: /^(\S+)/ } );
// pass the textarea element and the parse to LDT
var codeArea = new LDTextarea( $('codeArea'), parser );
</pre>
###CSS
<pre>
/* css rule applied to comment tokens */
.ldt > .comment {
    color: silver;
}
</pre>

##Browser Support
LDT has been tested on

 * Firefox 3.6, 9, 10
 * Internet Explorer 8
 * Chromium 16
 * Midori 4.1
 * Opera 11.61
 * Epiphany

##API
###LDTextarea

 + `new LDTextarea( textarea, parser )` Converts a HTML `textarea` element into an auto highlighting LDTextarea. `parser` is used to determine how to subdivide and style the content. `parser` can be any object which defines the `tokenize` and `identify` methods as described in the Parser API below.
 + `ldt.textarea` The input element of the LDT.
 + `ldt.output` Direct access to the output layer of the LDT. It is an array of HTML nodes. Do *not* remove the last element.
 + `ldt.highlight()` Updates the highlighting of the LDT. It is automatically called on user input. You shouldn't need to call this unless you programmatically changed the contents of `ldt.textarea`.
 + `ldt.insertAtCursor( string )` Inserts `string` into the `ldt.textarea` before the current cursor position.

###Parser

 + `new Parser( [rules] )` Creates a parser. `rules` is an object whose keys are CSS classes and values are the regular expressions which match each token.
 + `parser.rules` Stores the parsing rules, a mapping of CSS class names to regular expressions.
 + `parser.tokenize( string )` Splits `string` into an array of tokens as defined by `parser.rules`.
 + `parser.identify( string )` Finds the CSS class name associated with the token `string`.

##License
LDT is open sourced under GPL v3 and MIT. Full text for both licenses should be available in this directory.
