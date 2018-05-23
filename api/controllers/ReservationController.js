/**
 * ReservationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `ReservationController.addReservation()`
   */
  addReservation: async function (req, res) {

    var resEquivalentes = await Reservation.find({
      salle : req.body.salle_id,
      date : req.body.date,
      heure : req.body.heure
    });

    if(resEquivalentes.length != 0) {

      res.statusCode = 422;
      console.log('Réservation déjà existante');
      res.send('Réservation déjà existante');

    } else {

      await Reservation.create({
        salle : req.body.salle_id,
        date : req.body.date,
        heure : req.body.heure
      })

      res.statusCode = 200;
      console.log('Réservation enregistrée');
      res.send('Réservation enregistrée');
    }

  },

  /**
   * `ReservationController.getSalles()`
   */
  getSalles: async function (req, res) {

    const dateRes = req.query.date;
    const heureRes = req.query.heure;

    await Salle.find().populate('reservations', {'date' : dateRes, 'heure' : heureRes })
               .exec(function (err, result) {
      let sallesDispos = [];
      result.forEach(function(salle) {
        if(salle.reservations.length == 0) {
          sallesDispos.push(salle);
        }
      });
      return res.json(sallesDispos);
    });
  }
};

