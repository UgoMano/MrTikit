/**
 * TicketTypesController
 *
 * @description :: Server-side logic for managing Tickettypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getNumAvailTickets: function (req, res) {
    	TicketTypesService.getNumAvailTickets(req.body.ticketTypeId, req.body.eventId).then(function(data){
	  	  return res.json({
	  	    data: data
	  	  });
	  	}).catch(Res.negotiate);
  	},

  	getTicketTypesByEvent: function (req, res) {
  		TicketTypesService.getTicketTypesByEvent(req.body.eventId).then(function(data) {
  			return res.json({
  				data: data
  			});
  		}).catch(res.negotiate);
  	},
	
};

