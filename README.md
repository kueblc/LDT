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

##Using LDT
Turning a regular `textarea` into an auto highlighting `ldt` is easy.
###HTML
<pre><textarea id='codeArea'></textarea></pre>
###JS
<pre>
var parser = new Parser(
  { whitespace: /^(\s+)/,
    comment: /^(\/\/[^\r\n]*)/,
    other: /^(\S+)/ };
var codeArea = new LDT( $('codeArea'), parser );
</pre>
###CSS
<pre>
.ldt > .comment {
    color: silver;
}
</pre>

##API

##License
LDT is open sourced under GPL v3 and MIT.
Full text for both licenses should be available in this directory.
