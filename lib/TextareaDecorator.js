/* TextareaDecorator.js
 * written by Colin Kuebler 2012
 * Part of LDT, dual licensed under GPLv3 and MIT
 * Builds and maintains a styled output layer under a textarea input layer
 */

function TextareaDecorator( textarea, parser ){
	/* INIT */
	var api = this;

	// construct editor DOM
	var parent = document.createElement("div");
	var output = document.createElement("pre");
	parent.appendChild(output);
	var label = document.createElement("label");
	parent.appendChild(label);
	// replace the textarea with RTA DOM and reattach on label
	textarea.parentNode.replaceChild( parent, textarea );
	label.appendChild(textarea);
	// transfer the CSS styles to our editor
	parent.className = 'ldt ' + textarea.className;
	textarea.className = '';
	// turn off built-in spellchecking in firefox
	textarea.spellcheck = false;
	// turn off word wrap
	textarea.wrap = "off";

	// coloring algorithm #2
	var color = function( input, output, parser ){
		var oldTokens = output.childNodes;
		// find inputPt and outputPt
		// position in the input text which may need to be (re)tokenized
		// corresponding position in the output nodes which may need modification
		var inputPt = 0, outputPt = 0;
		if( oldTokens.length !== 0 ){
			// find the first difference
			for( outputPt = 0; outputPt < oldTokens.length; outputPt++ ){
				var oldToken = oldTokens[outputPt].textContent;
				if( oldToken !== input.substr( inputPt, oldToken.length ) ){
					break;
				}
				inputPt += oldToken.length;
			}
			// back up one step
			outputPt--;
			inputPt -= oldTokens[outputPt].textContent.length;
		}
		var partialNewTokens = parser.tokenize(input.substr(inputPt));
		// ### from alg 1 ###
		var firstDiff, lastDiffNew, lastDiffOld;
		// trim the length of output nodes to the size of the input
		while( (partialNewTokens.length + outputPt) < oldTokens.length )
			output.removeChild(oldTokens[outputPt]);
		
		// find the last difference
		for( lastDiffNew = partialNewTokens.length-1, lastDiffOld = oldTokens.length-1; outputPt < lastDiffOld; lastDiffNew--, lastDiffOld-- )
			if( partialNewTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent ) break;
		
		// update modified spans
		for( var newPt = 0; outputPt <= lastDiffOld; outputPt++, newPt++ ){
			oldTokens[outputPt].className = parser.identify(partialNewTokens[newPt]);
			oldTokens[outputPt].textContent = oldTokens[outputPt].innerText = partialNewTokens[newPt];
		}
		// add in modified spans
		for( var insertionPt = oldTokens[outputPt] || null; newPt <= lastDiffNew; newPt++ ){
			var span = document.createElement("span");
			span.className = parser.identify(partialNewTokens[newPt]);
			span.textContent = span.innerText = partialNewTokens[newPt];
			output.insertBefore( span, insertionPt );
		}
	};

	/* coloring algorithm
	var color = function( input, output, parser ){
		var oldTokens = output.childNodes;
		var newTokens = parser.tokenize(input);
		var firstDiff, lastDiffNew, lastDiffOld;
		// find the first difference
		for( firstDiff = 0; firstDiff < newTokens.length && firstDiff < oldTokens.length; firstDiff++ )
			if( newTokens[firstDiff] !== oldTokens[firstDiff].textContent ) break;
		// trim the length of output nodes to the size of the input
		while( newTokens.length < oldTokens.length )
			output.removeChild(oldTokens[firstDiff]);
		// find the last difference
		for( lastDiffNew = newTokens.length-1, lastDiffOld = oldTokens.length-1; firstDiff < lastDiffOld; lastDiffNew--, lastDiffOld-- )
			if( newTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent ) break;
		// update modified spans
		for( ; firstDiff <= lastDiffOld; firstDiff++ ){
			oldTokens[firstDiff].className = parser.identify(newTokens[firstDiff]);
			oldTokens[firstDiff].textContent = oldTokens[firstDiff].innerText = newTokens[firstDiff];
		}
		// add in modified spans
		for( var insertionPt = oldTokens[firstDiff] || null; firstDiff <= lastDiffNew; firstDiff++ ){
			var span = document.createElement("span");
			span.className = parser.identify(newTokens[firstDiff]);
			span.textContent = span.innerText = newTokens[firstDiff];
			output.insertBefore( span, insertionPt );
		}
	};*/

	api.input = textarea;
	api.output = output;
	api.update = function(){
		var input = textarea.value;
		if( input ){
			color( input, output, parser );
			// determine the best size for the textarea
			var lines = input.split('\n');
			// find the number of columns
			var maxlen = 0, curlen;
			for( var i = 0; i < lines.length; i++ ){
				// calculate the width of each tab
				var tabLength = 0, offset = -1;
				while( (offset = lines[i].indexOf( '\t', offset+1 )) > -1 ){
					tabLength += 7 - (tabLength + offset) % 8;
				}
				var curlen = lines[i].length + tabLength;
				// store the greatest line length thus far
				maxlen = maxlen > curlen ? maxlen : curlen;
			}
			textarea.cols = maxlen + 1;
			textarea.rows = lines.length + 1;
		} else {
			// clear the display
			output.innerHTML = '';
			// reset textarea rows/cols
			textarea.cols = textarea.rows = 1;
		}
	};

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
	// initial highlighting
	api.update();

	return api;
};

