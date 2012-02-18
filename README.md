#LDT
##Lightweight Decoratorable Textarea
###Javascript Live Syntax Highlighting
LDT aims to provide a simple, lightweight, and highly extensible alternative to existing in-browser live syntax highlighting solutions by leveraging clever CSS and native functionality.

##Browser Support
LDT has been tested on

 * Firefox 3.6, 9, 10
 * Internet Explorer 8
 * Chromium 16
 * Midori 4.1
 * Opera 11.61
 * Epiphany

##Using LDT
Turning a regular `textarea` into an auto highlighting `ldt` is easy.
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
var codeArea = new LDT( $('codeArea'), parser );
</pre>
###CSS
<pre>
/* css rule applied to comment tokens */
.ldt > .comment {
    color: silver;
}
</pre>

##API

##License
LDT is open sourced under GPL v3 and MIT.
Full text for both licenses should be available in this directory.
