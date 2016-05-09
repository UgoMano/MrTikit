"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
  	'GET /consumer/getEvents/': 'EventsController.getPublishedEvents',
  	'POST /consumer/getEvent/': 'EventsController.getPublishedEvent',
  	'POST /consumer/getTicketTypesByEvent/': 'TicketTypesController.getTicketTypesByEvent',
  	'POST /consumer/holdTicket/': 'EventsController.holdTicket',
  	'POST /consumer/purchaseTicket/': 'EventsController.purchaseTicket',

  	'POST /management/getEvents': 'EventsController.getUserOwnedEvents',
  	'POST /management/ticketTypes': 'TicketTypesController.getTicketTypesByEvent',
  }
};
