function geocodeAddress() {
	var geocoder = new google.maps.Geocoder();
	var address = $('#address').val();
	
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status === 'OK') {
			var result = results[0].geometry.location;
			var latitude = result.lat();
			var longitude = result.lng();
			
			testPrintGeocode(latitude, longitude);
		} else {
			alert('Geocode was not successful for the following reason: '
					+ status);
		}
	});
}

function testPrintGeocode(latitude, longitude) {
	console.log("Latitude: " + latitude);
	console.log("Longitude: " + longitude);
}