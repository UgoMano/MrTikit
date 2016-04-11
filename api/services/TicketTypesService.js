// TicketTypeService.js - in api/services


module.exports = {

    getNumAvailTickets: function(ticketTypeId, eventId) {
        return TicketTypes.findOne({ id: ticketTypeId })
            .then(function(ticketType) {
                if(!ticketType) return sails.config.additionals.TICKET_TYPE_NOT_FOUND;

                var maxTickets = ticketType.maxTickets;
                if(!maxTickets) return sails.config.additions.MAX_TICKETS_OF_TYPE_NOT_FOUND;

                return TicketsService.getNumTicketsByType(ticketTypeId, eventId)
                .then(function (numTickets) {
                    return TempTicketsService.getNumTempTicketsByType(ticketTypeId, eventId)
                        .then(function (numTempTickets) {
                            var totalNumTickets = numTickets + numTempTickets;
                        
                            if (maxTickets < totalNumTickets) {
                                return sails.config.additionals.TICKETS_EXCEED_MAX_ALLOWED;
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
                if(!ticketTypes) return sails.config.additionals.TICKET_TYPE_NOT_FOUND;

                return ticketTypes;
            });
    },

};