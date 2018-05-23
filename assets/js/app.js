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
  
  //obj init
  var $ctrl = this;
  $ctrl.heures = [8,9,10,11,12,13,14,15,16,17,18,19]; // ["8h","9h"]
  $ctrl.salles = [];
  //data
  $ctrl.filterDate;
  $ctrl.filterHeure;
  //messages
  $ctrl.showListeSalles = false;
  $ctrl.showMessageSuccess = false;
  $ctrl.showMessageError = false;
  //filters
  $ctrl.capacityMin = 0;
  $ctrl.tvFilter = false;
  $ctrl.rpFilter = false;
  //filters functions
  $scope.capa = (function(value) { return (value.capacity >= $ctrl.capacityMin); });
  $scope.eqpmt = (function(value) {
      if($ctrl.tvFilter) {
        if(value.equipements.find(function(currVal) { return currVal.name == 'TV'}) == undefined) {
            return false;
        }
      }
      if($ctrl.rpFilter) {
        if(value.equipements.find(function(currVal) { return currVal.name == 'Retro Projecteur'}) == undefined) {
            return false;
        }
      }
      return true;
   });

  //update salles
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
 
  //book salle
  $ctrl.reserverSalle = function(salle_id) {
    if( $ctrl.filterDate == null || $ctrl.filterHeure == null ) {
      $ctrl.showListeSalles = false;
    } else {
      const formatedDate = $filter('date')( $ctrl.filterDate, 'yyyy-MM-dd');
      ReservationService.addReservation(salle_id, formatedDate, $ctrl.filterHeure)
      .then(function(response) {
        $ctrl.updateSalles();
        $ctrl.showMessageSuccess = true;
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


