// Local settings for this Google Map mashup:

var gMapConfig = 
{
	// XML file containing locations info
	//LocationsXmlFile : 'http://swirlclient.com/mtc/www.translink.org/outlets_map/edit_vendors/locations.xml',
	//LocationsXmlFile : 'http://localhost:8080/translinkweb/locations.xml',
	//LocationsXmlFile : '/getTranslink/locations.xml',	
		LocationsXmlFile : '../locations.xml',
	
	// Logging Level ( -1 disabled, 0 debug (all), 1 info, 2 warrning, 3 errors, 4 fatal only ) 
	// see includes/fvlogger/logger.js for specifics
	LoggingLevel : -1,
	
	// The ID of the element which will contain log messages if LoggingLevel > -1
	LogElementId : 'fvlogger',
	
	// Set this to TRUE to disable caching of XML location data:
	ForceNoCache : true,
	
	// Pixel dimensions of map
	Width  : 430,
	Height : 470,
	
	// Pixel dimensions of Driving Directions Div
	//DirectionsWidth   : 200,
	//DirectionsPadding : 8,
	
	DirectionsWidth   : 800,
	DirectionsPadding : 1,
	
	
	// Initial center of origin point for map (latitude/longitude)
	InitialLatitude  : 37.77071473849608,
	InitialLongitude : -122.0086669921875,
	InitialZoomLevel : 8,
	
	MarinLat: 38.049172517522920,
	MarinLong: -122.67059326171875,
	

	SFLat: 37.748729228484920,
	SFLong: -122.43061065673828,
	
	EastLat: 37.899239630600185,
	EastLong: -122.27508544921875,
	
	SouthLat: 37.455237818790530,
	SouthLong: -122.19406127929688,

	// IDs of content DIVs
	MapOuterDivId      : 'googleMapOuter',
	MapInnerDivId      : 'gMap',
	DirectionsDivId    : 'gDrivingDirections',
	
	// Set to TRUE if you'd like the zoom/pan controls available
	ShowBaseControls   : true,
	
	// Set to TRUE if you'd like the street/satellite/hybrid selection controls available
	ShowExtraControls  : false,

	// Define location marker color types and icon URLs
	MarkerIcons : {
	//'other'     : 'images/googlemap/marker_icons/mm_20_yellow.png',
	//'addvalue'  : 'images/googlemap/marker_icons/mm_20_red.png',
	//'walgreens' : 'images/googlemap/marker_icons/mm_20_green.png'
	
	'other retailer'     : 'images/googlemap/marker_icons/mm_20_yellow.png',
	'add value machine'  : 'images/googlemap/marker_icons/mm_20_red.png',
	'walgreens' : 'images/googlemap/marker_icons/mm_20_green.png',
	'ticket office' : 'images/googlemap/marker_icons/mm_20_grey.png'
	
	//	'costco'  : 'images/googlemap/marker_icons/mm_20_red.png',
	//	'safeway' : 'images/googlemap/marker_icons/mm_20_green.png',
	//	'other'   : 'images/googlemap/marker_icons/mm_20_yellow.png'
	},

	// The graphic shadow to place under the marker icon
	MarkerShadowIcon : 'images/googlemap/marker_icons/mm_20_shadow.png',
	
	// A default icon to use if the location type does not match one defined above
	MarkerIconDefault : 'images/googlemap/marker_icons/mm_20_grey.png'

};
