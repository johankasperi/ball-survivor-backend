angular.module('webappApp')

.factory('SocketService', function($rootScope) {
  var socket = io.connect("http://169.254.176.62:8080");
  var rootScope = $rootScope;

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
  };
});