/* TextareaDecorator.js
 * written by Colin Kuebler 2012
 * Part of LDT, dual licensed under GPLv3 and MIT
 * Builds and maintains a styled output layer
 */

function TextareaDecorator( textarea, parser ){
	/* INIT */
	var api = this;

	// construct editor DOM
	var parent = document.createElement("div");
	var output = document.createElement("pre");
	parent.appendChild(output);
	// extra br tag acts as trailing insertionPt
	output.appendChild( document.createElement("br") );
	var label = document.createElement("label");
	parent.appendChild(label);
	// replace the textarea with RTA DOM and reattach on label
	textarea.parentNode.replaceChild( parent, textarea );
	label.appendChild(textarea);
	// transfer the CSS styles to our editor
	parent.className = textarea.className;
	textarea.className = '';
	// shortcut to output nodes
	var n = output.childNodes;
	// detect all changes to the textarea,
	// including keyboard input, cut/copy/paste, drag & drop, etc
	if( textarea.addEventListener ){
		// standards browsers: oninput event
		textarea.addEventListener( "input", api.update, false );
	} else {
		// MSIE: detect changes to the 'value' property
		textarea.attachEvent( "onpropertychange",
			function(e){
				if( e.propertyName.toLowerCase() === 'value' ){
					api.update();
				}
			}
		);
	}
	// turn off built-in spellchecking in firefox
	textarea.spellcheck = false;
	// turn off word wrap
	textarea.wrap = "off";
	// internally used functions
	function lineLength(line){
		var tabLength = 0;
		line.replace( /\t/g,
			function( str, offset ){
				tabLength += 8 - (tabLength + offset) % 8;
				return str;
			} );
		return line.length + tabLength;
	};

	api.input = textarea;
	api.output = n;
	api.update = function(){
		var input = textarea.value;
		if( input ){
			var m = parser.tokenize(input);
			var i, j, mp, np;
			// find the first difference
			for( i = 0; i < m.length && i < n.length-1; i++ )
				if( m[i] !== n[i].textContent ) break;
			// if the length of the display is longer than the parse, delete excess display
			while( m.length < n.length-1 )
				output.removeChild(n[i]);
			// find the last difference
			for( mp = m.length-1, np = n.length-2; i < np; mp--, np-- )
				if( m[mp] !== n[np].textContent ) break;
			// update modified spans
			for( ; i <= np; i++ ){
				n[i].className = parser.identify(m[i]);
				n[i].textContent = n[i].innerText = m[i];
			}
			// add in modified spans
			for( var insertionPt = n[i]; i <= mp; i++ ){
				span = document.createElement("span");
				span.className = parser.identify(m[i]);
				span.textContent = span.innerText = m[i];
				output.insertBefore( span, insertionPt );
			}
			// determine the best size for the textarea
			var lines = textarea.value.split('\n');
			var maxlen = 0;
			for( var i = 0; i < lines.length; i++ )
				maxlen = (lines[i].length > maxlen) ? lineLength(lines[i]) : maxlen;
			textarea.cols = maxlen + 1;
			//lines.reduce(function(a,b){return a.length > b.length ? a : b;}).length;
			textarea.rows = lines.length;
		} else {
			// clear the display
			while( n.length > 1 ) output.removeChild(n[0]);
			// reset textarea rows/cols
			textarea.cols = textarea.rows = 1;
		}
	};

	return api;
};

