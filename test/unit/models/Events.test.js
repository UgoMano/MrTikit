"use strict";
const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);

const newUser = {
  username: 'modelTest',
  password: 'password',
  email: 'modelTest@gmail.com'
};

describe('models:User', () => {
  it('Should create new user', done => {
    User
      .create(newUser)
      .then(user => {
        const newEvent = {
         title: "test event",
         facebookId: "id",
         owner: user.id,
         category: "wine wednesday",
         description: "Phat",
         location: "steve's moms bedroom",
         startDate: sDT.toISOString(),
         endDate: dT.toISOString(),
         checkIn: false,
         paypalEmail: "e",
         published: true,
        };

        describe('models:Events', () => {
          it('Should create new event', done => {
            Events
             .create(newEvent)
             .then(event => {
               assert.equal(event.title, newEvent.title);
               assert.equal(event.owner, newEvent.owner);
               assert.notEqual(event.title, -1);
               assert.notEqual(event.owner, -1);
               done();
             })
             .catch(done);
           });
          it('Should remove event', done => {
           Events
             .destroy({title: newEvent.title, owner: newEvent.owner})
             .then(events => {
               assert.equal(events[0].title, null);
               assert.equal(events[0].owner, null);
               done();
             })
             .catch(done);
          });
        });
        done();

      })
      .catch(done);
  });
});
