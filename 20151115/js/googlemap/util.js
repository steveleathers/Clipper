//
// GoogleMap Mashup Utility Functions
//

// Adds a function hook to window.onload
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// similarily, hook to the onload event handler
function addUnloadEvent(func) {
  var oldonunload = window.onunload;
  if (typeof window.onunload != 'function') {
    window.onunload = func;
  } else {
    window.onunload = function() {
      if (oldonunload) {
        oldonunload();
      }
      func();
    }
  }
}



function getScrollerWidth() {
    var scr = null;
    var inn = null;
    var wNoScroll = 0;
    var wScroll = 0;

    // Outer scrolling div
    scr = document.createElement('div');
    scr.style.position = 'absolute';
    scr.style.top = '-1000px';
    scr.style.left = '-1000px';
    scr.style.width = '100px';
    scr.style.height = '50px';
    // Start with no scrollbar
    scr.style.overflow = 'hidden';

    // Inner content div
    inn = document.createElement('div');
    inn.style.width = '100%';
    inn.style.height = '200px';

    // Put the inner div in the scrolling div
    scr.appendChild(inn);
    // Append the scrolling div to the doc
    document.body.appendChild(scr);

    // Width of the inner div sans scrollbar
    wNoScroll = inn.offsetWidth;
    // Add the scrollbar
    scr.style.overflow = 'auto';
    // Width of the inner div width scrollbar
    wScroll = inn.offsetWidth;

    // Remove the scrolling div from the doc
    document.body.removeChild(
        document.body.lastChild);

    // Pixel width of the scroller
    return (wNoScroll - wScroll);
}



var MAX_DUMP_DEPTH = 10;

function dumpObj(obj, name, indent, depth) {
	  if (depth > MAX_DUMP_DEPTH) {
			 return indent + name + ": <Maximum Depth Reached>\n";
	  }

	  if (typeof obj == "object") {
			 var child = null;
			 var output = indent + name + "\n";
			 indent += "\t";
			 for (var item in obj)
			 {
				   try {
						  child = obj[item];
				   } catch (e) {
						  child = "<Unable to Evaluate>";
				   }
				   if (typeof child == "object") {
						  output += dumpObj(child, item, indent, depth + 1);
				   } else {
						  output += indent + item + ": " + child + "\n";
				   }
			 }
			 return output;
	  } else {
			 return obj;
	  }
}

