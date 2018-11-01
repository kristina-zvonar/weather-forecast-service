function getWeatherData(latitude, longitude, locationType) {
	
	if(latitudeValid(latitude) && longitudeValid(longitude)) {
	
		var ajaxRequest = $.ajax({
			url: 'https://api.met.no/weatherapi/locationforecast/1.9/',
			type: 'GET',
			data: {lat: latitude, lon: longitude},
			dataType: 'xml'
		});
		
		ajaxRequest.done(function(resultXML, type){
						
			var data = $(resultXML).find(SERVICE.WEATHER_DATA)
								   .find(SERVICE.PRODUCT)
								   .find(SERVICE.TIME)
								   .find(SERVICE.LOCATION);
			var dewPoint = data.find(SERVICE.DEW_POINT_TEMPERATURE).attr(SERVICE.VALUE);
			var humidity = data.find(SERVICE.HUMIDITY).attr(SERVICE.VALUE);
			var temperature = data.find(SERVICE.TEMPERATURE).attr(SERVICE.VALUE);
			var lowClouds = data.find(SERVICE.LOW_CLOUDS).attr(SERVICE.PERCENT);
			var mediumClouds = data.find(SERVICE.MEDIUM_CLOUDS).attr(SERVICE.PERCENT);
			var highClouds = data.find(SERVICE.HIGH_CLOUDS).attr(SERVICE.PERCENT);
			
			testPrint(dewPoint, humidity, temperature, lowClouds, mediumClouds, highClouds);
		});
		
		ajaxRequest.fail(function(){
			alert("There was an error fetching data from the service. Please try again.");
		});
	} else {
		alert("Invalid coordinates provided");
	}
}

function latitudeValid(latitude) {
	return typeof(latitude) === 'number' && latitude > -90 && latitude < 90;
}

function longitudeValid(longitude) {
	return typeof(longitude) === 'number' && longitude > -180 && longitude < 180;
}

function testPrint(dewPoint, humidity, temperature, lowClouds, mediumClouds, highClouds) {
	console.log("Dew point: " + dewPoint);
	console.log("Humidity: " + humidity);
	console.log("Temperature: " + temperature); 
	console.log("Low clouds: " + lowClouds);
	console.log("Medium clouds: " + mediumClouds);
	console.log("High clouds: " + highClouds);
}