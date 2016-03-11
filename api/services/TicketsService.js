// TicketsService.js - in api/services

var uuid = require('node-uuid');

module.exports = {

    getTicketsByEvent: function(eventId) {
        return Tickets.find({event: eventId})
            .then(function (tickets) {
                if(!tickets) throw new Error('Tickets not found');
                return tickets;
            });
    },

    getTicketsByType: function(ticketTypeId, eventId) {
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

    getNumTicketsByType: function(ticketTypeId, eventId) {
        return Tickets.count({event: eventId, ticketType: ticketTypeId})
            .then(function (found) {
                //if(!found) throw new Error('TempTickets could not be queried for count');
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

    generateTicketUuid: function(ticketId, userId) {
        return Tickets.findOne({ id: ticketId, user: userId })
            .then(function (ticket) {
                if(!ticket) throw new Error('Ticket not found');
                var newUuid = null;
                var ticketExist = true;

                while(ticketExist) {
                    newUuid = uuid.v4();
                    ticketExist = Tickets.find({ uuid: newUuid })
                        .then(function(ticket) {
                            if(!ticket)
                                return false;
                            else
                                return true;
                        });
                }

                ticket.uuid = newUuid;
                ticket.save();
                return ticket;
            });
    },
    
};