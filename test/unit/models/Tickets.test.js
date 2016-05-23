"use strict";const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);

dT.setDate(dT.getDate + 1);
const newTickets = {
 event: "1",
 user: "1",
 ticketType: "1",
 checkIn: "true",
 firstScanTime: "",
 lastScanTime: "",
 totalScans: "1"
 

};

describe('models:tickets', () => {
 it('Should create new ticket', done => {
   tickets
     .create(newTickets)
     .then( ticket => {
       assert.equal(ticket.event, newTickets.event);
       assert.equal(ticket.user, newTickets.user);
       assert.equal(ticket.ticketType, newTickets.ticketType);
       done();
     })
     .catch(done);
 });

 it('Should remove ticket', done => {
   tickets
     .destroy({event: newTickets.event, name: newTickets.name})
     .then(tickets => {
       assert.equal(tickets[0].event, null);
       assert.equal(tickets[0].user, null);
       assert.equal(tickets[0].ticketType, null);
       done();
     })
     .catch(done);
 });
});