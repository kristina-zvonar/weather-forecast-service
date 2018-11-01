function geocodeAddress(locationType) {
	var geocoder = new google.maps.Geocoder();

	var addressFieldId = LAYOUT.ID + locationType + LAYOUT.ADDRESS;
	var latFieldId = LAYOUT.ID + locationType + LAYOUT.LATITUDE;
	var lngFieldId = LAYOUT.ID + locationType + LAYOUT.LONGITUDE;

	var address = $(addressFieldId).val();
	var latitude;
	var longitude;

	var cacheHit = cache.checkGeocodingCache(address);
	if (cacheHit !== null) {
		var coords = JSON.parse(cacheHit);
		latitude = coords.lat;
		longitude = coords.lng;
		
		$(latFieldId).val(latitude);
		$(lngFieldId).val(longitude);
	} else {
		geocoder.geocode({
			'address' : address
		}, function(results, status) {
			if (status === 'OK') {
				var result = results[0].geometry.location;

				latitude = result.lat();
				longitude = result.lng();

				$(latFieldId).val(latitude);
				$(lngFieldId).val(longitude);

				cache.cacheGeocodingResults(address, latitude, longitude);
			} else {
				alert(ERROR_MESSAGE.REQUEST_FAILURE + " - " + status);
			}
		});
	}
}
