// TicketsService.js - in api/services

module.exports = {

    getNumTicketsByTicketTypeIdEventId: function(ticketTypeId, eventId) {
        return Tickets.find({event: eventId, ticketType: ticketTypeId})
            .then(function (tickets) {
                if (!tickets) throw new Error('Tickets not found');
                return tickets;
            });
    },

    getTicketsByUserId: function(userId) {
        return Tickets.find( {user: userId })
            .then(function (tickets) {
                if (!tickets) throw new Error('Tickets not found');
                return tickets;
            });
    },

    getNumTicketsOfTypeByTicketTypeIdEventId: function(ticketTypeId, eventId) {
        return Tickets.count({event: eventId, ticketType: ticketTypeId})
            .then(function (found) {
                if (!found) throw new Error('Tickets not found');
                return found;
            });
    },
};