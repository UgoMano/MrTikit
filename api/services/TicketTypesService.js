// TicketTypeService.js - in api/services


module.exports = {

    getNumTicketsOfTypeAvailableForEvent: function (ticketTypeId, eventId, res) {
        return TicketTypes.findOne({id :ticketTypeId})
            .then(function(ticketType) {
                if(!ticketType) throw new Error('Ticket Type Not Found');

                var maxTickets = 10;//ticketType.maxTickets;
                if (!maxTickets)
                    return maxTickets;

                var numTicketsOfType = TicketsService.getNumTicketsOfTypeByTicketTypeIdEventId(ticketTypeId, eventId);
                numTicketsOfType.then(function() {
                    if (maxTickets < numTicketsOfType) {
                        console.log(maxTickets - numTicketsOfType);
                        return maxTickets - numTicketsOfType;
                    }
                    else
                        return 0;
                });
            }).catch(function(err){
                console.log(err);
            });
    },
};