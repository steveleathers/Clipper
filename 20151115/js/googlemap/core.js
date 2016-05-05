//
//
// Custom Google Maps Implementation
// Reuben King
// Swirl.net
// September 2007
//
//
// googlemap/core.js: Core API Implementation
//


// Google Maps API stuff
var gMap, gDir, geocoder;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var locsXml, locs;
var gMarkers = [], gMarkersHtml = [], gMarkersToHereHtml = [], gMarkersFromHereHtml = [], gInfoWindow = [];
var gMarkerIndex = 0;








// Initialization:  Load the XML data and if successful, draw the map
function init()
{



	if ( typeof( gMapConfig ) != 'object' ) {
		window.alert( 'Fatal: Unable to load configuration data from googlemap/config.js.  Check the contents of this file' );
		return false;
	}


	var xmlUrl = gMapConfig.LocationsXmlFile;

	if ( gMapConfig.ForceNoCache ) {
		xmlUrl += '?seed=' + Math.floor( Math.random() * 100000 );
	}





	new Ajax.Request(

		xmlUrl,
		{
			 method: 'get',
			 requestHeaders: { 'Accept' : 'text/xml', 'Cache-Control': 'no-store' },
			  onSuccess: function(transport)
			  {

				  	setupMap(transport);

			  },
			   onFailure: function(transport)
			  {
				  alert('Ajax.Request Failure! ' + transport.status + '/' + transport.statusText  );
			  }

		}
		); // Ajax.Request ends here


}


// Create the Map, load the XML, party on..
function setupMap(transport)
{



		var gMapOuterDiv = document.getElementById( gMapConfig.MapOuterDivId );
		var gMapDiv      = document.getElementById( gMapConfig.MapInnerDivId );
		var gDirDiv      = document.getElementById( gMapConfig.DirectionsDivId );

		if ( !gMapOuterDiv || !gMapDiv )
		{
			dieGracefully( 'Unable to hook onto map div' );
			//alert( 'Unable to hook onto map div' );
		}
		else
		{
			gMapDiv.style.width  = gMapConfig.Width + 'px';
			gMapDiv.style.height = gMapConfig.Height + 'px';



			var mapOptions = {
			        zoom:  gMapConfig.InitialZoomLevel ,
			        // center map on Alameda
			        center: new google.maps.LatLng(gMapConfig.InitialLatitude, gMapConfig.InitialLongitude),
			        scaleControl: true,
			        overviewMapControl: true,
			        overviewMapControlOptions:{opened:true},
			        mapTypeId: google.maps.MapTypeId.ROADMAP
				};




			gMap = new google.maps.Map( gMapDiv, mapOptions);


			getLocationsFromXml( transport.responseXML );

			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setPanel(gDirDiv);
  			directionsDisplay.setMap(gMap);
  			 google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
					    showDirectionsPane();
		  });

		geocoder = new google.maps.Geocoder();


		}





}




// callback function from simpleXml-- adds markers to map for all locations
function getLocationsFromXml( sx )
{

	var pLat, pLong, thePoint, tMarker;

	locs = sx.getElementsByTagName('location');
	

	if ( !locs.length ) {
		alert('no locations found in reponse XML!');
		return false;
	}
	else
	{
		//alert('found ' + locs.length + ' locations' );

		for ( var i=0; i < locs.length; i++ )
		{
			pLat = parseFloat( locs[i].getAttribute('lat') );
			pLong = parseFloat( locs[i].getAttribute('long') );

			thePoint = new google.maps.LatLng( pLat, pLong );

			 tMarker = createMarker( thePoint, locs[i] );
		}

		//alert('found all ' + (i+1) + ' locations' );

		return true;
	}
}
// =======================================================

// Used by createMarker
function getLocationIcon( location )
{


	var imagef = gMapConfig.MarkerIcons[ location.getAttribute('icon').toLowerCase() ];

	if ( imagef ) {


		locIcon = new google.maps.MarkerImage(
			imagef,
			 new google.maps.Size(12, 20),
			 new google.maps.Point(0,0),
			 new google.maps.Point(6, 20)
			);


		return locIcon ;
	}


}




// Used by createMarker
function getShadowIcon( location )
{




		var shadowIcon = new google.maps.MarkerImage(
			'images/googlemap/marker_icons/mm_20_shadow.png',
			 new google.maps.Size(22, 20),
			 new google.maps.Point(0,0),
			 new google.maps.Point(6, 20)
			);



	}



// Creates a marker for a given location
function createMarker( point, location )
{

var vicon = getLocationIcon( location );
var sicon = getShadowIcon();
var markerObj = new google.maps.Marker({
			position: point,
	        shadow: sicon,
	        icon: vicon,
	        map: gMap
	    });



var html, htmlStart, htmlEnd, toHereHtml, fromHereHtml;
var locName = location.getElementsByTagName('name')[0].firstChild.data;
var locStreet = location.getElementsByTagName('street')[0].firstChild.data;
var locCity = location.getElementsByTagName('city')[0].firstChild.data;
var locState = location.getElementsByTagName('state')[0].firstChild.data;
var locZip = location.getElementsByTagName('zip')[0].firstChild.data;
var	pLat = parseFloat( location.getAttribute('lat') );
var	pLong = parseFloat( location.getAttribute('long') );


// added by indira
var isPhone = false;
var locPhone = '';
if(location.getElementsByTagName('phone')[0].firstChild != null)
{
	isPhone = true;
	locPhone = location.getElementsByTagName('phone')[0].firstChild.data;
}
// end added by indira

	var isNotes = false;
	var locNotes = '';
	if(location.getElementsByTagName('notes')[0].firstChild != null)
	{
		isNotes = true;
		locNotes = location.getElementsByTagName('notes')[0].firstChild.data;
	}



	//var locPhone = location.getElementsByTagName('phone')[0].firstChild.data;
	var address = locStreet + '<br>' + locCity + ', ' + locState + ' ' + locZip;
	var address2 = address.replace('<br>',', ');


    var toHereLink   = '<a href="javascript:void(0)" onClick="getDirectionsToHere(' + gMarkerIndex + ')">To Here</a>';
	var fromHereLink = '<a href="javascript:void(0)" onClick="getDirectionsFromHere(' + gMarkerIndex + ')">From Here</a>';

	htmlStart      = '<div id="popup' + location.getAttribute('id') + '" class="locationPopup">';
	htmlStart     += '<h1>Address:</h1>';
	if ( locName )
		htmlStart += '<p class="name">' + locName + '</p>';
	htmlStart     += '<p class="address">' + address + '</p>';
	//htmlStart     += '<p class="phone">' +locPhone + '</p>';
	// added by indira
	if(isPhone)
		htmlStart     += '<p class="phone">' +locPhone + '</p>';
	//end added by indira

	if(isNotes)
		htmlStart     += '<p class="phone"><b>Notes:</b> ' +locNotes + '</p>';

	htmlEnd = '</div>';

	html = htmlStart;
	html += '<p class="directions"><strong>Get Directions:</strong> ' + toHereLink + ' - ' + fromHereLink + '</p>';
	html += htmlEnd;

	toHereHtml      = htmlStart;
	toHereHtml     += '<p class="directions"><strong>Get Directions:</strong> To Here - ' + fromHereLink + '</p>';
	toHereHtml     += '<form action="javascript:getDirections()">';
	toHereHtml     += '<p class="small grey">Start Address</p>';
	toHereHtml     += '<input type="text" id="startAddr" class="address" /><input type="submit" value="Go" /></p>';
	toHereHtml     += '<input type="hidden" id="endAddr" value="' + address2 + '@' + pLat + ',' + pLong + '"/>';
	toHereHtml     += '</form>';
	toHereHtml     += htmlEnd;

	fromHereHtml    = htmlStart;
	fromHereHtml   += '<p class="directions"><strong>Get Directions:</strong> ' + toHereLink + ' - From Here</p>';
	fromHereHtml   += '<form action="javascript:getDirections()">';
	fromHereHtml   += '<p class="small grey">End Address</p>';
	fromHereHtml   += '<input type="text" id="endAddr" class="address" /><input type="submit" value="Go" /></p>';
	fromHereHtml   += '<input type="hidden" id="startAddr" value="' + address2 + '@' + pLat + ',' + pLong + '"/>';
	fromHereHtml   += htmlEnd;

	gMarkersHtml[gMarkerIndex] = html;

	gMarkersToHereHtml[gMarkerIndex] = toHereHtml;
	gMarkersFromHereHtml[gMarkerIndex] = fromHereHtml;

	gMarkers[gMarkerIndex] = markerObj;
	gMarkersToHereHtml[gMarkerIndex] = toHereHtml;


	var infowindowObj = new google.maps.InfoWindow({
			      content: html
		  });


  google.maps.event.addListener(markerObj, 'click', function() {
		    infowindowObj.open(gMap,markerObj);
		  });

	gInfoWindow[gMarkerIndex] = infowindowObj;
	gMarkerIndex++;

	//alert("before returning markerObj"+locName);
	return markerObj;

}



function getDirectionsToHere( i )
{


	var contentString = gMarkersToHereHtml[i] ;
	gInfoWindow[i].setContent(contentString);

}

function getDirectionsFromHere( i )
{
	var contentString = gMarkersFromHereHtml[i] ;
	gInfoWindow[i].setContent(contentString);
}



// Fire up the Directions manager
function getDirections()
{
	var saddr = $( 'startAddr' ).value
	var daddr = $( 'endAddr' ).value

	// alert( 'loading directions info for ' + saddr + ' to ' + daddr );

	directionsService.route(
	   {
	    origin: saddr,
	    destination: daddr,
	    travelMode: google.maps.TravelMode.DRIVING
	  },
	  function(result, status) {
		  // alert(' STATUS = ' + status)
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(result);
	    } else {

			var code = status;
				var reason =  code;
				if (  code == 'NOT_FOUND'){ reason = "At least one of the origin, destination could not be geocoded"; }
				else if  (  code == 'INVALID_REQUEST'){ reason =  "The request provided was invalid."; }
					else if  (  code == 'MAX_WAYPOINTS_EXCEEDED'){ reason =  "Too many   DirectionsWaypoint were provided in the Directions Request"; }
					else if  (  code == 'OVER_QUERY_LIMIT') { reason= "The webpage has gone over the requests limit in too short a period of time."; }
					else if  (  code == 'REQUEST_DENIED'){ reason =  "The webpage is not allowed to use the directions service."; }
					else if  (  code == 'UNKNOWN_ERROR'){ reason =  "A directions request could not be processed due to a server error. The request may succeed else if  you try again."; }
					else if  (  code == 'ZERO_RESULTS'){ reason =  "No route could be found between the origin and destination."; }
				 dieGracefully( 'Failed to obtain directions, ' + reason );

			}
	  }




  );
}



function showDirectionsPane()
{
	// alert( 'show directions pane' );

	var dirDiv = $( gMapConfig.DirectionsDivId );
	var mapDiv = $( gMapConfig.MapInnerDivId );

	dirDiv.style.display = 'block';
	dirDiv.style.width = mapDiv.style.width;
}




function dieGracefully( str )
{


	var outerDiv = $( gMapConfig.MapOuterDivId );
	var innerDiv = $( gMapConfig.MapInnerDivId );

	var fatalErrDiv = document.createElement('div');

	fatalErrDiv.id = 'gMapsError';
	fatalErrDiv.innerHTML = '<p class="error title">Unable to display locations map:</p><p class="error">' + str + '</p>'

	outerDiv.replaceChild(  fatalErrDiv, innerDiv );
}


function setMarinCounty(){

gMap.setCenter( new  google.maps.LatLng( gMapConfig.MarinLat, gMapConfig.MarinLong ));
gMap.setZoom(10);
}


function setSF(){

	gMap.setCenter( new  google.maps.LatLng( gMapConfig.SFLat, gMapConfig.SFLong ));
	gMap.setZoom(12);
}





function setEastBay(){

	gMap.setCenter( new  google.maps.LatLng( gMapConfig.EastLat, gMapConfig.EastLong ));
	gMap.setZoom(11);
}

function setSouthBay(){

	gMap.setCenter( new  google.maps.LatLng( gMapConfig.SouthLat, gMapConfig.SouthLong ));
	gMap.setZoom(10);
}


