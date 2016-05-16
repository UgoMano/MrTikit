"use strict";const assert = require('chai').assert;
var sDT = new DateTime().now();
var dT = new DateTime().now();
dt.setDate(dt.getDate + 1);const newEvent = {
 title: "test event",
 facebookId: "id",
 owner: '1',
 category: "wine wednesday",
 description: "Phat",
 location: "steve's moms bedroom",
 startDateTime: sDT.toISOString(),
 endDateTime: dt.toISOString(),
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