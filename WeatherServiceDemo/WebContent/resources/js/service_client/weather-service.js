function getWeatherData(latitude, longitude, locationType) {

	if (latitudeValid(latitude) && longitudeValid(longitude)) {
		
		var cacheHit = cache.checkWeatherCache(latitude, longitude);
		if(cacheHit !== null) {
			parseAndDisplay(cacheHit, locationType);
		} else {	
			var ajaxRequest = $.ajax({
				url : 'https://api.met.no/weatherapi/locationforecast/1.9/',
				type : 'GET',
				data : {
					lat : latitude,
					lon : longitude
				},
				dataType : 'xml'
			});
			
			ajaxRequest.done(function(resultXML, type) {
				parseAndDisplay(resultXML, locationType);
				cache.cacheWeatherResults(latitude, longitude, resultXML);
			});
	
			ajaxRequest.fail(function() {
				alert(ERROR_MESSAGE.REQUEST_FAILURE);
			});
		}
	} else {
		alert(ERROR_MESSAGE.INVALID_COORDINATES);
	}
}

function latitudeValid(latitude) {
	var isNumber = typeof (latitude) === 'number'
			|| (typeof (latitude) === 'string' && latitude.match(/\d+\.?\d*/) !== null);
	return isNumber && latitude > -90 && latitude < 90;
}

function longitudeValid(longitude) {
	var isNumber = typeof (longitude) === 'number'
			|| (typeof (longitude) === 'string' && longitude.match(/\d+\.?\d*/) !== null);
	return isNumber && longitude > -180 && longitude < 180;
}

function parseAndDisplay(resultXML, locationType) {
	var data = $(resultXML).find(SERVICE.WEATHER_DATA).find(SERVICE.PRODUCT)
			.find(SERVICE.TIME).find(SERVICE.LOCATION);
	var dewPoint = data.find(SERVICE.DEW_POINT_TEMPERATURE).attr(SERVICE.VALUE);
	var humidity = data.find(SERVICE.HUMIDITY).attr(SERVICE.VALUE);
	var temperature = data.find(SERVICE.TEMPERATURE).attr(SERVICE.VALUE);
	var fog = data.find(SERVICE.FOG).attr(SERVICE.PERCENT);
	var lowClouds = data.find(SERVICE.LOW_CLOUDS).attr(SERVICE.PERCENT);
	var mediumClouds = data.find(SERVICE.MEDIUM_CLOUDS).attr(SERVICE.PERCENT);
	var highClouds = data.find(SERVICE.HIGH_CLOUDS).attr(SERVICE.PERCENT);

	displayOverview(dewPoint, humidity, temperature, locationType);
	displayDetails(fog, lowClouds, mediumClouds, highClouds, locationType);
}

function displayOverview(dewPoint, humidity, temperature, locationType) {
	var idDewPoint = LAYOUT.ID + locationType + LAYOUT.DEW_POINT;
	var idHumidity = LAYOUT.ID + locationType + LAYOUT.HUMIDITY;
	var idTemperature = LAYOUT.ID + locationType + LAYOUT.TEMPERATURE;

	var displayDewPoint = dewPoint + '&#176;';
	var displayHumidity = humidity + LAYOUT.PERCENT;

	$(idDewPoint).html(displayDewPoint);
	$(idHumidity).html(displayHumidity);
	$(idTemperature).html(temperature);
}

function displayDetails(fog, lowClouds, mediumClouds, highClouds, locationType) {
	var idFog = LAYOUT.ID + locationType + LAYOUT.FOG;
	var idLowClouds = LAYOUT.ID + locationType + LAYOUT.LOW_CLOUDS;
	var idMediumClouds = LAYOUT.ID + locationType + LAYOUT.MEDIUM_CLOUDS;
	var idHighClouds = LAYOUT.ID + locationType + LAYOUT.HIGH_CLOUDS;

	var displayFog = Math.round(fog) + LAYOUT.PERCENT;
	var displayLowClouds = Math.round(lowClouds) + LAYOUT.PERCENT;
	var displayMediumClouds = Math.round(mediumClouds) + LAYOUT.PERCENT;
	var displayHighClouds = Math.round(highClouds) + LAYOUT.PERCENT;

	$(idFog).html(displayFog);
	$(idLowClouds).html(displayLowClouds);
	$(idMediumClouds).html(displayMediumClouds);
	$(idHighClouds).html(displayHighClouds);

	displaySun(idFog, fog);
	displayCloud(idLowClouds, lowClouds);
	displayCloud(idMediumClouds, mediumClouds);
	displayCloud(idHighClouds, highClouds);

	var formId = LAYOUT.ID + locationType + LAYOUT.FORM;
	$(formId).fadeOut();
}

function displayCloud(prefix, value) {
	var id = prefix + LAYOUT.IMAGE;
	var opacity;

	if (value <= 20) {
		opacity = 0.0;
	} else if (value > 20 && value <= 50) {
		opacity = 0.5;
	} else if (value >= 50) {
		opacity = 1.0;
	}
	$(id).css('opacity', opacity);

}

function displaySun(prefix, value) {
	var id = prefix + LAYOUT.IMAGE;
	var opacity;

	if (value <= 20) {
		opacity = 1.0;
	} else if (value > 20 && value <= 50) {
		opacity = 0.5;
	} else if (value >= 50) {
		opacity = 0.0;
	}

	$(id).css('opacity', opacity);
}