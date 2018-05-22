/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await Salle.count() > 0) {
    return done();
  }

  await Salle.createEach([
    {
      "name":"Salle #1",
      "description":"Salle #1",
      "capacity":5,
      "equipements":[
         {
            "name":"TV"
         },
         {
            "name":"Retro Projecteur"
         }
      ],
   },
   {
      "name":"Salle #2",
      "description":"Salle #2",
      "capacity":10,
      "equipements":[
         {
            "name":"Retro Projecteur"
         }
      ],
   },
   {
      "name":"Salle Okjsdkso",
      "description":"Salle Okjsdkso",
      "capacity":11,
      "equipements":[],
   },
   {
      "name":"Salle de ouf",
      "description":"Salle de ouf",
      "capacity":10,
      "equipements":[
         {
            "name":"TV"
         },
         {
            "name":"Retro Projecteur"
         }
      ],
   },
   {
      "name":"Salle nulle",
      "description":"Salle nulle",
      "capacity":26,
      "equipements":[
         {
            "name":"TV"
         },
         {
            "name":"Retro Projecteur"
         }
      ],
   }
  ]);


  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
