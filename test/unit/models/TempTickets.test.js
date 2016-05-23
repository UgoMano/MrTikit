"use strict";const assert = require('chai').assert;
var sDT = new DateTime().now();
var dT = new DateTime().now();

dt.setDate(dt.getDate + 1);
const newTempTickets = {
 event: "1",
 user: "1",
 ticketType: "1"
};

describe('models:TempTickets', () => {
 it('Should create new ticket type', done => {
   TempTickets
     .create(newTempTickets)
     .then( tempTicket => {
       assert.equal(tempTicket.event, newTempTickets.event);
       assert.equal(tempTicket.user, newTempTickets.user);
       assert.equal(tempTicket.ticketType, newTempTickets.ticketType);
       done();
     })
     .catch(done);
 });

 it('Should remove ticket type', done => {
   TempTickets
     .destroy({event: newTempTickets.event, name: newTempTickets.name})
     .then(TempTickets => {
       assert.equal(TempTickets[0].event, newEvent.event);
       assert.equal(TempTickets[0].user, newEvent.user);
       assert.equal(TempTickets[0].ticketType, newTempTickets.ticketType);
       done();
     })
     .catch(done);
 });
});