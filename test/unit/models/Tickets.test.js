"use strict";const assert = require('chai').assert;
var sDT = new DateTime().now();
var dT = new DateTime().now();

dt.setDate(dt.getDate + 1);
const newtickets = {
 event: "1",
 user: "1",
 ticketType: "1",
 checkIn: "true",
 firstScanTime: "",
 lastScanTime: "",
 totalScans: "1"
 

};

describe('models:tickets', () => {
 it('Should create new ticket type', done => {
   tickets
     .create(newtickets)
     .then( ticket => {
       assert.equal(ticket.event, newtickets.event);
       assert.equal(ticket.user, newtickets.user);
       assert.equal(ticket.ticketType, newtickets.ticketType);
       done();
     })
     .catch(done);
 });

 it('Should remove ticket type', done => {
   tickets
     .destroy({event: newtickets.event, name: newtickets.name})
     .then(tickets => {
       assert.equal(tickets[0].event, newEvent.event);
       assert.equal(tickets[0].user, newEvent.user);
       assert.equal(tickets[0].ticketType, newtickets.ticketType);
       done();
     })
     .catch(done);
 });
});