/*
event id, ticket type, user

getNumAvailTickets

getAllAttendees: user, event, ticket

getPublishedEvent: user, event 

getPublishedEvents

getUserOwnedEvents*/



"use strict";
const assert = require('chai').assert;
var sDT = new Date(2016, 4, 30, 16, 5);
var dT = new Date(2017, 4, 30, 16, 5);

const newUser = {
  username: 'modelTest',
  password: 'password',
  email: 'modelTest@gmail.com'
};

describe('controllers:EventsController', () => {
  it('Should get Event Controller information', done => {
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

        describe('controllers:EventsController:getNumAvailTickets', () => {
          it('Should get number of available tickets', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .then(eventsController => {
               assert.equal(newEventsController.getNumAvailTickets, 1);
               done();
             })
             .catch(done);
           });
        });

 		describe('controllers:EventsController:getAllAttendees', () => {
          it('Should get all attendees', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(eventsController => {
               assert(newEventsController.getAllAttendees);
               done();
             })
             .catch(done);
           });
        });

        describe('controllers:Events:getPublishedEvent', () => {
          it('Should get a published event', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(eventsController => {
               assert.equal(1, newTicketTypes.event); 
               assert(newEventsController.getUserOwnedEvent);
               done();
             })
             .catch(done);
           });
        });

 		describe('controllers:EventsController:getUserOwnedEvents', () => {
          it('Should get all events owned by the user, via ID', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(ticketsController => {
               assert(newEventsController.getUserOwnedEvents);
               done();

             })
             .catch(done);
           });
        });

         describe('controllers:EventsController:getPublishedEvents', () => {
          it('Should generate all published events', done => {
            Events
             .create(newEvent)
            TicketTypes
          	 .create(newTicketTypes)
          	 .create(newTickets)
          	 .then(eventsController => {
              assert(newEventsController.getPublishedEvents);
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

