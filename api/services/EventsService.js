// EventsService.js - in api/services

module.exports = {

	getNumAvailTickets: function(eventId) {
		return TicketTypes.find({ event: eventId })
			.then(function(ticketTypes) {
                var promises= [];
				if(!ticketTypes) throw new Error('Ticket Types for event could not be found');
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

	holdTicket: function(eventId, userId, ticketTypeId) {
		return TicketTypesService.getNumAvailTickets(ticketTypeId, eventId)
            .then(function (numTickets) {
                if (numTickets == 0) throw new Error('No tickets of that type available');

                return TempTickets.create({
                    event: eventId,
                    user: userId,
                    ticketType: ticketTypeId,
                });

            });
	},

	purchaseTicket: function(tempTicketId, transactionTypeId, confirmationNumber) {
		return TempTickets.findOne({ id: tempTicketId })
            .then(function (tempTicket) {
                if(!tempTicket) throw new Error('TempTicket could not be found');
                
                var userId = tempTicket.user;
                var eventId = tempTicket.event;
                var ticketTypeId =tempTicket.ticketType;
                var transaction = Transactions.create({
                	event: eventId,
                	user: userId,
                	confirmationNumber: confirmationNumber,
                });

                var ticket = Tickets.create({
                    event: eventId,
                    user: userId,
                    ticketType: ticketTypeId,
                    //transactionType: transactionTypeId,
                    });
                Transactions.update({id: transaction.id}, {ticket: ticket.id});
                TempTickets.destroy({ id: tempTicketId }).exec(function(err) {
                    if(err) throw new Error('TempTicket could not be deleted');
                    });
                return ticket;                    
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