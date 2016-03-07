// TicketTypeService.js - in api/services


module.exports = {

    getNumAvailTickets: function(ticketTypeId, eventId) {
        return TicketTypes.findOne({ id: ticketTypeId })
            .then(function(ticketType) {
                if(!ticketType) throw new Error('Ticket Type could not be found');

                var maxTickets = ticketType.maxTickets;
                if(!maxTickets) throw new Error('Max Tickets for Type Is Null');

                return TicketsService.getNumTicketsByType(ticketTypeId, eventId)
                    .then(function (numSold) {
                        if(!numSold) throw new Error('Num Tickets Sold could not be excuted');

                        return TempTicketsService.getNumTempTicketsByType(ticketTypeId, eventId)
                            .then(function (numTempTickets) {
                                if(!numTempTickets) throw new Error('Num Temp Tickets could not be excuted');

                                var totalNumTickets = numSold + numTempTickets;
                                if(maxTickets < totalNumTickets) {
                                    throw new Error('total tickets in system exceeds max tickets allowed');
                                }
                                else {
                                    return ( maxTickets - totalNumTickets );
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