"use strict";const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);
var eDT = new Date(2018, 4, 30, 16, 5);


dT.setDate(dT.getDate + 1);
dT.setDate(eDT.getDate + 5);
const newTicketTypes = {
 event: "1",
 name: "vip",
 maxTickets: '1',
 price: "0.1",
 section: "back",
 photoTicket: "true",
 eventTime: eDT,
 purchaseStart: sDT,
 purchaseEnd: dT,
 hidden: false,
 description: "memes; the world tour",
};

describe('models:TicketTypes', () => {
 it('Should create new ticket type', done => {
   TicketTypes
     .create(newTicketTypes)
     .then( ticketType => {
       assert.equal(ticketType.event, newTicketTypes.event);
       assert.equal(ticketType.name, newTicketTypes.name);
       done();
     })
     .catch(done);
 });  it('Should remove ticket type', done => {
   TicketTypes
     .destroy({event: newTicketTypes.event, name: newTicketTypes.name})
     .then(TicketTypes => {
       assert.equal(TicketTypes[0].event, newEvent.event);
       assert.equal(TicketTypes[0].name, newEvent.name);
       done();
     })
     .catch(done);
 });
});