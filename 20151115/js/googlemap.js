//
//
// Custom Google Maps Implementation
// Reuben King 
// Swirl.net
// September 2007
//
//
// ** See includes/core.js for core implementation
//
	
// Dynamic includes:
// These will be included in the order they are defined in this array.
// Note the ywill all be appended to the end of the HTML HEAD element
var requiredIncludes = 
[
	{ 
	  name : 'prototype-js',
	  type : 'javascript', 
	   src : 'js/googlemap/prototype-js/prototype.js'
	},
	
	{ 
	  name : 'googlemap-util',
	  type : 'javascript', 
	   src : 'js/googlemap/util.js'
	},
	
	{ 
	  name : 'fvlogger',
	  type : 'javascript', 
	   src : 'js/googlemap/fvlogger/logger.js'
	},
	
	{ 
	  name : 'fvlogger-css',
	  type : 'stylesheet', 
	   src : 'js/googlemap/fvlogger/logger.css'
	},
	
	{ 
	  name : 'googlemap-config',
	  type : 'javascript', 
	   src : 'js/googlemap/config.js'
	},
	
	{ 
	  name : 'googlemap-css',
	  type : 'stylesheet', 
	   src : 'css/googlemap.css'
	},
	
	{ 
	  name : 'googlemap-core',
	  type : 'javascript', 
	   src : 'js/googlemap/core.js'
	}
];



//
//
// Loop through above and include each
for ( var i = 0; i < requiredIncludes.length; i++ )
{
	if ( requiredIncludes[i].type == 'javascript' )
	{
		if ( typeof(console) == 'object' ) console.log( 'include ' + requiredIncludes[i].name + ': ' + requiredIncludes[i].src );
		include( requiredIncludes[i].src );
	}
	else if ( requiredIncludes[i].type == 'stylesheet' )
	{
		if ( typeof(console) == 'object' ) console.log( 'use stylesheet ' + requiredIncludes[i].name + ': ' + requiredIncludes[i].src );
		attachStylesheet( requiredIncludes[i].src );
	}
	else
	{
		if ( typeof(console) == 'object' ) console.log( 'error parsing dep ' + requiredIncludes[i].name + ' (' + requiredIncludes[i].type + '): ' + requiredIncludes[i].src );
	}
}


//
// dynamically include a Javascript src file
function include( script_filename ) 
{	
    var htmlHead = document.getElementsByTagName('head').item(0);
    
	var js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', script_filename);
    
	htmlHead.appendChild(js);
}

//
// dynamically attach a CSS stylesheet file
function attachStylesheet( css_filename, css_media ) 
{
	var htmlHead = document.getElementsByTagName("head").item(0);     
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = css_filename;
	if ( css_media )
		cssNode.media = css_media;
	
	htmlHead.appendChild(cssNode);
}
