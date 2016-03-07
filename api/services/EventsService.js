// EventsService.js - in api/services

module.exports = {

	getNumAvailTickets: function(eventId) {
		return TicketTypes.find({ event: eventId })
			.then(function(ticketTypes) {
				if(!ticketTypes) throw new Error('Ticket Types for event could not be found');

				// TODO: Finish this amazeballs

			});
	},
    
};