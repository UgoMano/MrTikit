/*getNumAvailTickets: Event and ticket type
assert returns number of tickets for that event
getTicketTypesByEvent: ticketType and Event
getAllTicketTypesByEvent: ticketType and Event (using 2 tickettypes)
*/


"use strict";
const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);

const newUser = {
  username: 'modelTest',
  password: 'password',
  email: 'modelTest@gmail.com'
};

describe('controllers:TicketTypes', () => {
  it('Should get Ticket Type information', done => {
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

		const newTicketTypes2 = {
		 event: "2",
		 name: "vip",
		 maxTickets: '1',
		 price: "0.1",
		 section: "back",
		 photoTicket: "true",
		 eventTime: eDT,
		 purchaseStart: sDT,
		 purchaseEnd: dT,
		 hidden: false,
		 description: "memes; the second coming",
		};

        describe('controllers:TicketTypes:getNumAvailTickets', () => {
          it('Should getNumAvailTickets', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .then(ticketTypes => {
               assert.equal(1, newTicketTypes.maxTickets); /*checking maxTickets */
               done();

             })
             .catch(done);
           });
        });

 		describe('controllers:TicketTypes:getTicketTypesByEvent', () => {
          it('Should get ticket types by event', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .then(ticketTypes => {
               assert.equal(1, newTicketTypes.event);
               done();

             })
             .catch(done);
           });
        });

         describe('controllers:TicketTypes:getAllTicketTypesByEvent', () => {
          it('Should get all ticket types by event', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTicketTypes2)
          	 .then(ticketTypes => {
               assert.equal(1, newTicketTypes.event); /*checking event ID */
               assert.equal(2, newTicketTypes2.event);
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
