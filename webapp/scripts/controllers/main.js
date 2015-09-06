
angular.module('webappApp')
  .controller('MainCtrl', function ($scope, $window, $document, SocketService) {
  	var scope = $scope
  	var window = $window
  	var document = $document

	SocketService.on('connect', function() {
		console.log('connected')
	});

	if (self.window.DeviceOrientationEvent) {
	  // Listen for the deviceorientation event and handle the raw data
	  self.window.addEventListener('deviceorientation', function(eventData) {
	    // gamma is the left-to-right tilt in degrees, where right is positive
	    var tiltLR = eventData.gamma;

	    // beta is the front-to-back tilt in degrees, where front is positive
	    var tiltFB = eventData.beta;

	    // alpha is the compass direction the device is facing in degrees
	    var dir = eventData.alpha

	    // call our orientation event handler
	    deviceOrientationHandler(tiltLR, tiltFB, dir);
	  }, false);
	} else {
	  document.getElementById("device").innerHTML = "Deviceorientation not supported."
	}

	function deviceOrientationHandler(tiltLR, tiltFB, dir) {
		SocketService.emit('client:playermove', {tiltLR, tiltFB, dir})
	}
 })
