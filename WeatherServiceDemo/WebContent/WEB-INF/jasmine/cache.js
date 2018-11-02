var cache = (function(){
	return {
		cacheGeocodingResults: function(address, latitude, longitude) {
			if (typeof(Storage) !== 'undefined') {
				var coords = {
					lat: latitude,
					lng: longitude
				};
			    window.localStorage.setItem(address, JSON.stringify(coords));
			} 
		},
		
		checkGeocodingCache: function(address) {
			if(typeof(Storage) !== 'undefined') {
				return window.localStorage.getItem(address);
			} 
		},
		
		cacheWeatherResults: function(latitude, longitude, xmlDocument) {
			var serializer = new XMLSerializer();
			var results = {
				timestamp: new Date(),
				value: serializer.serializeToString(xmlDocument)
			};
			
			if(typeof(Storage) !== 'undefined') {
				window.localStorage.setItem(latitude + "#" + longitude, JSON.stringify(results));
			}
		},
		
		checkWeatherCache: function(latitude, longitude) {
			var parser = new DOMParser();
			var key = latitude + "#" + longitude;
			if(typeof(Storage) !== 'undefined') {
				var cacheHitString = window.localStorage.getItem(key);
				if(cacheHitString === null) {
					return cacheHitString;
				}
				
				var cacheHit = JSON.parse(cacheHitString);
				var cachedTimestamp = cacheHit.timestamp;
				var now = new Date();
				
				if(now.getTime() > ((Date.parse(cachedTimestamp)) + 10 * 60 * 1000)) {
					window.localStorage.removeItem(key);
					return null;
				} else {
					var xmlDocument = parser.parseFromString(cacheHit.value, "text/xml");
					return xmlDocument;
				}				
				
			}
		}
	}
})();