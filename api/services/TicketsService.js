// TicketsService.js - in api/services

module.exports = {

    getTicketsByType: function(ticketTypeId, eventId) {
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

    getNumTicketsByType: function(ticketTypeId, eventId) {
        return Tickets.count({event: eventId, ticketType: ticketTypeId})
            .exec(function countCB(err, found) {
                if (err) throw new Error('Tickets not found');
                return found;
            });
    },

    scanTicket: function(ticketUuid) {
        return Tickets.update({uuid: ticketUuid}, {lastScanTime: new Date()})
            .then(function (ticket) {
                if(!ticket) throw new Error("Error with updating");

                var newTotal = ticket.totalScans + 1;
                var newFirstScan = ticket.firstScanTime;
                if(newTotal == 1)
                    newFirstScan = new Date();

                return Tickets.update({uuid: ticketUuid}, {totalScans: newTotal, firstScanTime: newFirstScan})
                    .then(function (ticket) {
                        if(!ticket) throw new Error("Second Update Error");
                        return ticket;
                    });

            });
    },

    createTicket: function(tempTicketId) {
        return TempTickets.findOne({ id: tempTicketId })
            .then(function (tempTicket) {
                if(!tempTicket) throw new Error('TempTicket Could not be found');
                return Tickets.create({
                    event: tempTicket.event,
                    user: tempTicket.user,
                    ticketType: tempTicket.ticketType,
                    }).then(function (ticket) {
                        if(!ticket) throw new Error('Error Creating Ticket');
                        return ticket;
                    });
            });       
    },
    
};