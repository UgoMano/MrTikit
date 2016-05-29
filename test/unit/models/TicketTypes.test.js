"use strict";const assert = require('chai').assert;
var sDT = new DateTime().now();
var dT = new DateTime().now();
var edT = new DateTime().now();

dt.setDate(dt.getDate + 1);
dt.setDate(edt.getDate + 5);
const newTicketTypes = {
 event: "1",
 name: "vip",
 maxTickets: '1',
 price: "0.1",
 section: "back",
 photoTicket: "true",
 eventTime: eDT.toISOString(),
 purchaseStart: sDT.toISOString(),
 purchaseEnd: dt.toISOString(),
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