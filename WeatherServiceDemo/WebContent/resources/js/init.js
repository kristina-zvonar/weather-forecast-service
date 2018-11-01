
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
		var longitude = $('#destinationLongitude').val();
		getWeatherData(latitude, longitude, 'destination');
	});
	
	$('#departureAddress').on('input', function(){
		$('#departureLongitude, #departureLatitude').prop('disabled', this.value !== '');
	});
	
	$('#destinationAddress').on('input', function(){
		$('#destinationLatitude, #destinationLongitude').prop('disabled', this.value !== '');
	});
	
	$('#departureLatitude, #departureLongitude').on('input', function(){
		$('#departureAddress, #departureGeocode').prop('disabled', this.value !== '');
		$('#departureButton').prop('disabled', this.value === '');
	});
	
	$('#destinationLatitude, #destinationLongitude').on('input', function(){
		$('#destinationAddress, #destinationGeocode').prop('disabled', this.value !== '');
		$('#destinationButton').prop('disabled', this.value === '');
	});
	
	$('#departureButton').prop('disabled', true);
	$('#departureGeocode').click(function(){
		$('#departureButton').prop('disabled', false);
	});
	
	$('#destinationButton').prop('disabled', true);
	$('#destinationGeocode').click(function(){
		$('#destinationButton').prop('disabled', false);
	});
	
});
