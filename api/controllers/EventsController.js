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
			}).catch(res.negotiate);
	},

	holdTicket: function (req, res) {
		EventsService.holdTicket(req.body.eventId, req.user.id, req.body.ticketTypeId)
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	purchaseTicket: function (req, res) {
		EventsService.purchaseTicket(req.body.tempTicketId, req.body.transactionTypeId, req.body.confirmationNumber)
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	getAllAttendees: function (req, res) {
		EventsService.getAllAttendees(req.body.eventId)
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},
  
};



