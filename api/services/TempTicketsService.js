// TempTicketsService.js - in api/services

module.exports = {

	getTempTicketById: function (tempTicketId) {
		return TempTickets.findOne({ id: tempTicketId })
			.then(function (tempTicket) {
				if(!tempTicket) throw new Error('Temp Ticket Could Not Be Found');
				return tempTicket;
			});
	},

	getNumTempTicketsByType: function(ticketTypeId, eventId) {
		return TempTickets.count({
			ticketType: ticketTypeId,
			event: eventId
			}).then(function (numFound) {
				//if(!numFound) throw new Error('TempTickets could not be queried for count');
				return numFound;
			});
	},

	getNumTempTicketsByEvent: function(eventId) {
		return TempTickets.count({ event: eventId })
		.exec(function countCB(err, numFound) {
			if(err) throw new Error('TempTickets could not be queried for count');
			return numFound;
		});
	},

};