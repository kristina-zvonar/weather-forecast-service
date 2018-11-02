describe("Cache Utils", function () {

    describe("Weather cache", function () {

        var result;		
        var latitude = "11.75";
		var longitude = "12.56";
		
		var parser = new DOMParser();
		var xmlDocument = parser.parseFromString("<rootTag><sample></sample></rootTag>", "text/xml");

        
        window.cache.cacheWeatherResults(latitude, longitude, xmlDocument);
		var key = latitude + "#" + longitude;
		result = window.cache.checkWeatherCache(latitude, longitude);
        

        it("Should insert weather info into cache", (done) => {
            expect(result).not.toBeNull();
            done();
        });
		
		window.localStorage.removeItem(key);

    });
	
	describe("Geocoding cache", function() {
		var address = "Washington";
		var result;
		
		window.cache.cacheGeocodingResults(address);
		result = window.cache.checkGeocodingCache(address);
		
		it("Should insert coordinates into cache", (done) => {
			expect(result).not.toBeNull();
			done();
		});
		
		window.localStorage.removeItem(address);
	});


});
