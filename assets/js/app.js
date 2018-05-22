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
  }]);

  // Format de date français sur la vue
  reservationFront.run(function($mdDateLocale, $filter) {
      $mdDateLocale.formatDate = function(date) {
        if(date == null) { return ''; }
        return $filter('date')( date, 'd/M/yyyy');
      };
  });

  reservationFront.controller('ReservationCtrl', ['$scope', '$rootScope', '$filter', 'ReservationService', function($scope, $rootScope, $filter, ReservationService) {
  
  var $ctrl = this;

  $ctrl.heures = [8,9,10,11,12,13,14,15,16,17,18,19]; // ["8h","9h"]
  $ctrl.formData = {};
  $ctrl.salles = [];
  $ctrl.filterDate;
  $ctrl.filterHeure;
  $ctrl.showInfoMessage = true;


  
  $ctrl.updateSalles = function() {
    if( $ctrl.filterDate == null || $ctrl.filterHeure == null ) {
      $ctrl.showInfoMessage = true;
    } else {
      $ctrl.showInfoMessage = false;
      const formatedDate = $filter('date')( $ctrl.filterDate, 'yyyy-MM-dd');
      ReservationService.getSalles(formatedDate, $ctrl.filterHeure).then(function(response) {
        $ctrl.salles = response.data;
      });
    } 
  }
 
  $ctrl.reserverSalle = function(salle_id) {

    const formatedDate = $filter('date')( $ctrl.filterDate, 'yyyy-MM-dd');

    ReservationService.addReservation(salle_id, formatedDate, $ctrl.filterHeure).then(function(response) {
      // $scope.salles.push($scope.formData)
      // $scope.formData = {};
      $ctrl.updateSalles();
    });
  }

}]);


