// EventsService.js - in api/services

module.exports = {

	getNumAvailTickets: function(eventId) {
		return TicketTypes.find({ event: eventId })
			.then(function(ticketTypes) {
				if(!ticketTypes) throw new Error('Ticket Types for event could not be found');

				var totalNumAvailTickets = 0;
				_.each(ticketTypes, function(ticketType) {
					totalNumAvailTickets += TicketTypesServce.getNumAvailTickets(ticketType.id, eventId);
				});
				return totalNumAvailTickets;

			});
	},

	holdTicket: function(eventId, userId, ticketTypeId) {
		var numTickets = TicketTypesServce.getNumAvailTickets(ticketTypeId, eventId);
		if (!numTickets) throw new Error("Could not process holdTicket request");
		if (numTickets == 0) throw new Error('No tickets of that type available');

		return TempTickets.create({
			event: eventId,
			user: userId,
			ticketType: ticketTypeId,
		});
	}

	purchaseTicket: function(tempTicketId, transactionTypeId, confirmationNumber) {
		return TempTickets.findOne({ id: tempTicketId })
            .then(function (tempTicket) {
                if(!tempTicket) throw new Error('TempTicket could not be found');
                var userId = tempTicket.user.id;
                var eventId = tempTicket.event.id;
                var newTransaction = Transactions.create({
                	event: eventId,
                	user: userId,
                	confirmationNumber: confirmationNumber,
                }).then(function (transaction) {
                	if(!transaction) throw new Error('Error creating transaction');
                	return transaction;
                });

                return Tickets.create({
                    event: eventId,
                    user: userId,
                    ticketType: tempTicket.ticketType,
                    transactionType: transactionTypeId,
                    confirmationId: confirmationId,
                    }).then(function (ticket) {
                        if(!ticket) throw new Error('Error Creating Ticket');
                        newTransaction.ticket = ticket.id;
                        newTransaction.save();
                        TempTickets.destroy({ id: tempTicketId }).exec(function(err) {
                        	if(err) throw new Error('TempTicket could not be deleted');
                        });

                        return ticket;
                    });
            });
	},
    
};