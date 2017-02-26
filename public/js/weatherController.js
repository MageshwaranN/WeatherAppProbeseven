angular.module("weatherApp")
    .controller('weatherController',['$scope', '$window', '$http', 'weatherService', function($scope, $window, $http, weatherService){
        $window.navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            $scope.coords = {
                lat: lat,
                long:long
            }

            $scope.$apply();
            $scope.currentLocationWeather();

        });

        $scope.currentLocationWeather = function(){

            weatherService.getCurrentLocationWeather($scope.coords.lat, $scope.coords.long)
                .then(function(response) {
                    var data = response.data;
                    $scope.title = `Weather Status of ${data.name}`;
                    $scope.currentWeatherMain = data.weather[0].main;
            });
        };

        $scope.searchLocationWeather = function(){

            if($scope.requestedCity){
                    weatherService.getRequiredLocationWeather($scope.requestedCity)
                    .then(function(response) {
                        $scope.data = response.data;
                        $scope.data.dt = new moment.unix($scope.data.dt).format("MM/DD/YYYY hh:mmA");
                        $scope.data.sys.sunrise = new moment.unix($scope.data.sys.sunrise).format("hh:mmA");
                        $scope.data.sys.sunset = new moment.unix($scope.data.sys.sunset).format("hh:mmA");

                        weatherService.meanWeatherAPI('POST', {saveWeather: $scope.data})
                            .then(function(response){
                                console.log(response);
                            });

                        weatherService.meanWeatherAPI('GET', {city: $scope.requestedCity})
                            .then(function(response){
                                $scope.tabData = response.data;
                            });

                        $scope.show = true;
                });
            }
            else{
                $scope.show = false;
            }
        };

    }])