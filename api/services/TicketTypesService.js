// TicketTypeService.js - in api/services


var TicketsService = require('../services/TicketsService');
var TicketTypes = require('../models/TicketTypes');

module.exports = {

    getNumTicketsOfTypeAvailableForEvent: function (ticketTypeId, eventId) {
        return TicketTypes.findOne(id :ticketTypeId)
            .then(function(ticketType) {
                if(!ticketType) throw new Error('Ticket Type Not Found');

                var maxTickets = ticketType.maxTickets;
                if !maxTickets
                    return maxTickets;

                var numTicketsOfType = TicketsService.getNumTicketsOfTypeByTicketTypeIdEventId(ticketTypeId, eventId);

                if (maxTickets < numTicketsOfType)
                    return numTicketsOfType - numTicketsOfType;
                else
                    return 0;
            });
    },
};