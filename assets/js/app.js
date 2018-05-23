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
  $ctrl.salles = [];
  $ctrl.filterDate;
  $ctrl.filterHeure;
  $ctrl.showListeSalles = false;
  $ctrl.showMessageSuccess = false;
  $ctrl.showMessageError = false;

  $ctrl.updateSalles = function() {
    $ctrl.showMessageSuccess = false;
    $ctrl.showMessageError = false;
    if( $ctrl.filterDate == null || $ctrl.filterHeure == null ) {
      $ctrl.showListeSalles = false;
    } else {
      const formatedDate = $filter('date')( $ctrl.filterDate, 'yyyy-MM-dd');
      ReservationService.getSalles(formatedDate, $ctrl.filterHeure).then(function(response) {
        $ctrl.salles = response.data;
        $ctrl.showListeSalles = true;
      });
    } 
  }
 
  $ctrl.reserverSalle = function(salle_id) {
    if( $ctrl.filterDate == null || $ctrl.filterHeure == null ) {
      $ctrl.showListeSalles = false;
    } else {
      const formatedDate = $filter('date')( $ctrl.filterDate, 'yyyy-MM-dd');
      ReservationService.addReservation(salle_id, formatedDate, $ctrl.filterHeure)
      .then(function(response) {
        $ctrl.updateSalles();
        $ctrl.showMessageSuccess = true;

        $ctrl.message = "Votre réservation a bien été prise en compte"
      })
      .catch(function(error) {
        $ctrl.updateSalles();
        console.log(JSON.stringify(error));
        if(error.status == 422) {
          $ctrl.showMessageError = true;
        }
      });
    }
  }

}]);


