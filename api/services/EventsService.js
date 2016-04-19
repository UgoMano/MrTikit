// EventsService.js - in api/services


var Transaction = require('sails-mysql-transactions').Transaction;

module.exports = {

	getNumAvailTickets: function(eventId) {
		return TicketTypes.find({ event: eventId })
			.then(function(ticketTypes) {
                var promises= [];
				if(!ticketTypes) return sails.config.additionals.TICKET_TYPE_NOT_FOUND;
                var totalNumAvailTickets;
                _.each(ticketTypes, function(ticketType) {

                    promises.push(TicketTypesService.getNumAvailTickets(ticketType.id, eventId));
/*                    promises.push(TicketTypesService.getNumAvailTickets(ticketType.id, eventId).then(function(data){
                        return data;
                    }));*/
                });
                return Promise.all(promises).then(function(numTicketsAvail) {
                    return numTicketsAvail.reduce(function (a, b) {
                        return a + b;
                    });
                });
			});
	},

    getAllAttendees: function(eventId) {
        return TicketsService.getTicketsByEvent(eventId)
            .then(function(tickets) {
                var promises= [];

                _.each(tickets, function(ticket) {
                    promises.push(User.findOne({id: ticket.user}));
                });

                return Promise.all(promises).then(function(attendees) {
                    var allNames = [];
                    _.each(attendees, function(user) {
                        var fullName = user.firstName + ' ' + user.lastName;
                        allNames.push(fullName);
                    });
                    return allNames;
                });
            });
    },
    
};