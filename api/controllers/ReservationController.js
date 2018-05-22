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

    console.log('\n\naddRes\n');
    console.log('\n\nbody : \n');
    console.log(req.body);
    console.log('\n\nbodycontent : \n');
    console.log(req.body.salle_id);
    console.log(req.body.date);
    console.log(req.body.heure);

    var resEquivalentes = await Reservation.find({
      salle : req.body.salle_id,
      date : req.body.date,
      heure : req.body.heure
    });

    console.log('\n\nresEquiv : \n');
    console.log(resEquivalentes);

    if(resEquivalentes.length != 0) {

      console.log('\n\nexistRes\n');

      res.statusCode = 422;
      res.send('Réservation déjà existante');

    } else {

      console.log('\n\nnotExistRes\n');

      await Reservation.create({
        salle : req.body.salle_id,
        date : req.body.date,
        heure : req.body.heure
      })

      res.statusCode = 200;
      res.send('Réservation enregistrée');
      console.log('savedRes');
    }

  },

/**
   * `ReservationController.getSalles()`
   */
  getSalles: async function (req, res) {

    console.log('\n\ngetSalle\n');
    console.log('\n\nquerycontent : \n');
    console.log(req.query.date);
    console.log(req.query.heure);

    const dateRes = req.query.date;
    const heureRes = req.query.heure;

    // var salles = await Salle.find();
    // console.log('\n\nSalles : \n');
    // console.log(JSON.stringify(salles));
    // var sallePop = await Salle.find().populate('reservations');
    // console.log('\n\nSalles pop : \n');
    // console.log(JSON.stringify(sallePop));
    // var sallePopCrit = await Salle.find().populate('reservations', {'date' : dateRes, 'heure' : heureRes });
    // console.log('\n\nSalles pop crit : \n');
    // console.log(JSON.stringify(sallePopCrit));


    await Salle.find().populate('reservations', {'date' : dateRes, 'heure' : heureRes })
               .exec(function (err, result) {
      let sallesDispos = [];
      result.forEach(function(salle) {
        console.log('\n\nSalle : \n');
        console.log(salle);
        console.log(salle.reservations.length);
        if(salle.reservations.length == 0) {
          sallesDispos.push(salle);
          console.log('\nSalle pushed ! \n\n');
        }
      });
      console.log('\n\nSalles dispos : \n');
      console.log(JSON.stringify(sallesDispos));
      // console.log(sallesDispos);
      return res.json(sallesDispos);
    });

 

    //.populate('reservations').find({})
    // in https://docs.mongodb.com/manual/reference/operator/query/in/ 
    // https://jira.mongodb.org/browse/SERVER-15612
    // https://docs.mongodb.com/manual/tutorial/query-array-of-documents/
  }


};

