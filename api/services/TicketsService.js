// TicketsService.js - in api/services

module.exports = {

    getNumTicketsByTicketTypeIdEventId: function(ticketTypeId, eventId) {
        return Tickets.find({event: eventId, ticketType: ticketTypeId})
            .then(function (tickets) {
                if (!tickets) throw new Error('Tickets not found');
                return tickets.count;
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
            .exec(function countCB(err, found) {
                if (err) throw new Error('Tickets not found');
                return found;
            });
    },
};