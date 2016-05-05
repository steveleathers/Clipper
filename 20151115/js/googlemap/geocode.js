//info
/*
 * 0 (uninitialized)
 * 1 (loading)
 * 2 (loaded)
 * 3 (interactive)
 * 4 (complete)
 */

//utility

function jaxify(http_request,mode) {

	if (http_request.readyState != 4) return null;
	if (http_request.status != 200) {
		window.status = 'request failed: '+http_request.status;
	  	return false;
	}

		var requestReturn = http_request.responseText;
		//alert (requestReturn);

		//parse received CSV Object for latitude/longitude data
		dataArray = requestReturn.split(',');

		searchLong = dataArray[3];
		searchLat = dataArray[2];
		searchZoom = 13;

		//execute local map centering function with new lat/long and zoom
		gMap.setCenter( new  google.maps.LatLng( searchLat, searchLong ));
		gMap.setZoom(searchZoom );

}

function makeRequest(url) {

	var http_request = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
	  http_request = new XMLHttpRequest();
	  if (http_request.overrideMimeType) {
		  http_request.overrideMimeType('text/xml');
		  // See note below about this line
	  }
	} else if (window.ActiveXObject) { // IE
	  try {
		  http_request = new ActiveXObject("Msxml2.XMLHTTP");

	  } catch (e) {
		  try {
			  http_request = new ActiveXObject("Microsoft.XMLHTTP");
		  } catch (e) {}
	  }
	}

	if (!http_request) {
	  window.status = 'failed creating asynchronous request.';
	  return false;
	}

	http_request.onreadystatechange = function() { jaxify(http_request); };
	http_request.open('GET', url, true);
	http_request.send(null);

}


function file_get_contents( url ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Legaev Andrey
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
 	alert("in file get contents");
    var req = null;
    try {
    		req = new ActiveXObject("Msxml2.XMLHTTP");
    	} catch (e)
    	{
    		alert("step0");
        	try
        	{
        		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch (e)
        		{
       	 			alert("step1");
            		try { req = new XMLHttpRequest(); } catch(e) {
            		alert("step2");
            	}
        }
    }
   // alert("step 3");
    if (req == null) throw new Error('XMLHttpRequest not supported');
 	alert("step 4");
    req.open("GET", url, false);
   // req.open("GET", url);
   // alert("after open");
    req.send(null);
   // alert("after send :"+req.responseText);

    return req.responseText;
}

function getLatLong(id) {

		//alert("in the getLatLong");
	  var address = document.getElementById(id).value+',CA';
	  geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      gMap.setCenter(results[0].geometry.location);
	      gMap.setZoom(10 );

	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
















