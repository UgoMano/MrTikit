// TempTicketsService.js - in api/services

module.exports = {

	getTempTicketById: function (tempTicketId) {
		return TempTickets.findOne({ id: tempTicketId })
			.then(function (tempTicket) {
				if(!tempTicket) return sails.config.additionals.TEMP_TICKET_NOT_FOUND;
				return tempTicket;
			});
	},

	getNumTempTicketsByType: function(ticketTypeId, eventId) {
		return TempTickets.count({
			ticketType: ticketTypeId,
			event: eventId
			}).then(function (numFound) {
				if(!numFound) return sails.config.additionals.TEMP_TICKET_COUNT_NOT_FOUND;
				return numFound;
			});
	},

	getNumTempTicketsByEvent: function(eventId) {
		return TempTickets.count({ event: eventId })
		.exec(function countCB(err, numFound) {
			if(err) return sails.config.additionals.TEMP_TICKET_COUNT_NOT_FOUND;
			return numFound;
		});
	},

};