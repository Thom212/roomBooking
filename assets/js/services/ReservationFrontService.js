reservationFront.service('ReservationService', function($http, $q) {
    return {
      'getSalles': function(date, heure) {
        var defer = $q.defer();
        $http.get('/reservation/getSalles', {params : {'date':date, 'heure':heure}}).then(function(resp){
          defer.resolve(resp);
        }).catch( function(err) {
          defer.reject(err);
        });
        return defer.promise;
      },
      'addReservation': function(salle_id, date, heure) {
        var defer = $q.defer();
        $http.post('/reservation/addReservation', {'salle_id':salle_id, 'date':date, 'heure':heure}).then(function(resp){
          defer.resolve(resp);
        }).catch( function(err) {
          defer.reject(err);
        });
        return defer.promise;
      }
  }});