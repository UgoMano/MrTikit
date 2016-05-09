"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
  	'GET /v1/consumer/getEvents/': 'EventsController.getPublishedEvents',
  	'POST /v1/consumer/getEvent/': 'EventsController.getPublishedEvent',
  	'POST /v1/consumer/getTicketTypesByEvent/': 'TicketTypesController.getTicketTypesByEvent',
  	'POST /v1/consumer/holdTicket/': 'EventsController.holdTicket',
  	'POST /v1/consumer/purchaseTicket/': 'EventsController.purchaseTicket',

  	'POST /v1/management/getEvents': 'EventsController.getUserOwnedEvents',
  	'POST /v1/management/ticketTypes': 'TicketTypesController.getTicketTypesByEvent',
  }
};
