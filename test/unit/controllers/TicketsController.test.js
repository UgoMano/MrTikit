/*scan ticket: user and ticket type and event

generateNewScanId : ticket

getUserTickets: ticket
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

describe('controllers:TicketsController', () => {
  it('Should get Ticket Controller information', done => {
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

		const newTickets = {
		 event: "1",
		 user: "1",
		 ticketType: "1",
		 checkIn: "true",
		 firstScanTime: "",
		 lastScanTime: "",
		 totalScans: "1"
		};

        describe('controllers:TicketsController:scanTicket', () => {
          it('Should scan ticket', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .then(ticketsController => {
               assert(newTicketsController.scanTicket);
               done();

             })
             .catch(done);
           });
        });

 		describe('controllers:TicketsController:generateNewScanId', () => {
          it('Should generate a new scan identifier', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(ticketsController => {
               assert.equal(1, newTickets.event);
               done();

             })
             .catch(done);
           });
        });

         describe('controllers:Tickets:getUserTickets', () => {
          it('Should get all ticket types by event', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(ticketsController => {
               assert.equal(user.id, newTickets.owner); 
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
