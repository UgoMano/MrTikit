/**
 * TicketTypesController
 *
 * @description :: Server-side logic for managing Tickettypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getNumAvailTickets: function (req, res) {
    if (!req.body.ticketTypeId) {
      return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
    } else if (!req.body.eventId) {
      return next(sails.config.additionals.EVENT_NOT_FOUND);
    } else {

      TicketTypesService.getNumAvailTickets(req.body.ticketTypeId, req.body.eventId).then(function(data){
        return res.json({
          data: data
        });
      }).catch(Res.negotiate);
    }

  },

  getTicketTypesByEvent: function (req, res) {
    if (req.body.eventId) {
      return next(sails.config.additionals.EVENT_NOT_FOUND);
    } else {

      TicketTypesService.getTicketTypesByEvent(req.body.eventId).then(function(data) {
        return res.json({
          data: data
        });
      }).catch(res.negotiate);

    }
  },
  getAllTicketTypesByEvent: function (req, res) {
    if (req.body.eventId) {
      return next(sails.config.additionals.EVENT_NOT_FOUND);
    } else {

      TicketTypesService.getAllTicketTypesByEvent(req.body.eventId).then(function(data) {
        return res.json({
          data: data
        });
      }).catch(res.negotiate);
      
    }
  },
	
};

