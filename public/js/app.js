var app = angular.module("weatherApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
 
            .state('home', {
                url: '/home',
                templateUrl: 'weatherDashboard.html',
                controller: 'weatherController'
            });
    });

app.factory('weatherService', ['$http', '$q', function ($http, $q){
    var applicationFactory = {};
    applicationFactory.url = 'http://api.openweathermap.org/data/2.5/weather';
    applicationFactory.baseurl = 'http://localhost:3000/api/weather';
    applicationFactory.appid = '666c0d8aafd4482419a7a452578b3568';
	
	applicationFactory.getCurrentLocationWeather = function(lat, lon) {
            
            var request = {
                method: 'GET',
                url: applicationFactory.url,
                params: {
                    lat: lat,
                    lon: lon,
                    appid: applicationFactory.appid
                }
            };

            return $http(request);
        };

        applicationFactory.getRequiredLocationWeather = function(location) {
            
            var request = {
                method: 'GET',
                url: applicationFactory.url,
                params: {
                    q: location,
                    appid: applicationFactory.appid
                }
            };

            return $http(request);
        };

        applicationFactory.meanWeatherAPI = function(method, object) {
            
            var request = {
                method: method,
                url: applicationFactory.baseurl,
            };

            if(method.toLocaleUpperCase() === 'GET')
                request.params = object;
            else
                request.data = object;

            return $http(request);
        };
    
	return applicationFactory;
}]);

app.filter('formatTemperature', [
      function() {
        return function(input, scale, label) {
          var value = parseInt(input, 10),
              convertedValue;

          if (isNaN(value)) throw new Error('Input is not a number');

          if (scale === 'F') {
            convertedValue = Math.round(value * 9.0 / 5.0 + 32);
          } else if (scale === 'C') {
            convertedValue = Math.round((value - 32) * 5.0 / 9.0);
          } else {
            throw new Error('Not a valid scale');
          }

          return label ? convertedValue += '\u00B0' : convertedValue;
        };
      }
    ]);