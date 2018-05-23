'use strict';

var reservationFront = angular.module('reservationFront', ['ngRoute', 'ui.bootstrap','ngMaterial', 'ngMessages']);

reservationFront.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/reservation.html',
      controller: 'ReservationCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }
]);

// Format de date français sur la vue
reservationFront.run(function($mdDateLocale, $filter) {
    $mdDateLocale.formatDate = function(date) {
      if(date == null) { return ''; }
      return $filter('date')( date, 'd/M/yyyy');
    };
});



