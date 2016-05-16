"use strict";
const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);
<!-- dt.setDate(dt.getDate + 1); -->
const newEvent = {
 title: "test event",
 facebookId: "id",
 owner: '1',
 category: "wine wednesday",
 description: "Phat",
 location: "steve's moms bedroom",
 startDate: sDT.toISOString(),
 endDate: dT.toISOString(),
 checkIn: false,
 paypalEmail: "e",
 published: true,
};describe('models:Events', () => {
 it('Should create new event', done => {
   Events
     .create(newEvent)
     .then(event => {
       assert.equal(event.title, newEvent.title);
       assert.equal(event.owner, newEvent.owner);
       done();
     })
     .catch(done);
 });  it('Should remove event', done => {
   Events
     .destroy({title: newEvent.title, owner: newEvent.owner})
     .then(events => {
       assert.equal(events[0].title, newEvent.title);
       assert.equal(events[0].owner, newEvent.owner);
       done();
     })
     .catch(done);
 });
});