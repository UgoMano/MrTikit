/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getNumAvailTickets: function (req, res) {
		EventsService.getNumAvailTickets(req.body.eventId)
			.then(function (data) {
				res.json({
					data: data,
				});
			});
	},

	holdTicket: function (req, res) {
		EventsService.holdTicket(req.body.eventId, req.body.userId, req.body.ticketTypeId)
			.then(function (data) {
				res.json({
					data: data,
				});
			});
	},

	purchaseTicket: function (req, res) {
		EventsService.purchaseTicket(req.body.tempTicketId, req.body.transactionTypeId, req.body.confirmationNumber)
			.then(function (data) {
				res.json({
					data: data,
				});
			});
	},
  
};



