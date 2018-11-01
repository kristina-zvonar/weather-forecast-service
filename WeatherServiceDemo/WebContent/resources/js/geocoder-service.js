function geocodeAddress(locationType) {
	var geocoder = new google.maps.Geocoder();
	
	var addressFieldId = LAYOUT.ID + locationType + 'Address';
	var latFieldId = LAYOUT.ID + locationType + 'Latitude';
	var lngFieldId = LAYOUT.ID + locationType + 'Longitude';
	
	var address = $(addressFieldId).val();
	
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status === 'OK') {
			var result = results[0].geometry.location;
			var latitude = result.lat();
			var longitude = result.lng();
			
			$(latFieldId).val(latitude);
			$(lngFieldId).val(longitude);
		} else {
			alert('Geocode was not successful for the following reason: '
					+ status);
		}
	});
}
