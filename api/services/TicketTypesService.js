// TicketTypeService.js - in api/services


module.exports = {

    getNumAvailTickets: function(ticketTypeId, eventId) {
        return TicketTypes.findOne({ id: ticketTypeId })
            .then(function(ticketType) {
                if(!ticketType) throw new Error('Ticket Type could not be found');

                var maxTickets = ticketType.maxTickets;
                if(!maxTickets) throw new Error('Max Tickets for Type Is Null');

                return TicketsService.getNumTicketsByType(ticketTypeId, eventId)
                .then(function (numTickets) {
                    return TempTicketsService.getNumTempTicketsByType(ticketTypeId, eventId)
                        .then(function (numTempTickets) {
                            var totalNumTickets = numTickets + numTempTickets;
                        
                            if (maxTickets < totalNumTickets) {
                                throw new Error('Total tickets in the system exceeds max tickets allowed');
                            }
                            else {
                                var numTicketsAvail = maxTickets - totalNumTickets;
                                return numTicketsAvail;
                            }
                    });
                });

            });
    },

    getTicketTypesByEvent: function(eventId) {
        return TicketTypes.find({ event: eventId })
            .then(function(ticketTypes) {
                if(!ticketTypes) throw new Error('TicketTypes for event could not be found');

                return ticketTypes;
            });
    },

};