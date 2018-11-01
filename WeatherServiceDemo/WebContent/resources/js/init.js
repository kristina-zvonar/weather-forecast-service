
$(document).ready(function() {
	$('#departureForm').hide();
	$('#destinationForm').hide();

	$('#departureDiv').click(function() {
		$('#departureForm').fadeToggle();
	});

	$('#destinationDiv').click(function() {
		$('#destinationForm').fadeToggle();
	});

	$("#departureButton").click(function() {
		var latitude = $('#departureLatitude').val();
		var longitude = $('#departureLongitude').val();
		getWeatherData(latitude, longitude, 'departure');
	});

	$('#destinationButton').click(function() {
		var latitude = $('#destinationLatitude').val();
		var longitude = $('#destinationLatitude').val();
		getWeatherData(latitude, longitude, 'destination');
	});
});
