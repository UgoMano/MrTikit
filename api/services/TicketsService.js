// TicketsService.js - in api/services

var crypto = require('crypto');
var biguint = require('biguint-format');

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

    scanTicket: function(ticketScanId, eventId) {
        return Tickets.findOne({scanId: ticketScanId, event: eventId})
            .then(function (ticket) {
                if(!ticket) return sails.config.additionals.TICKET_NOT_FOUND;

                var lastScanTime = new Date();

                var newTotal = ticket.totalScans + 1;
                var newFirstScan = ticket.firstScanTime;
                if(newTotal == 1)
                    newFirstScan = lastScanTime;
                ticket.lastScanTime = lastScanTime;
                ticket.totalScans = newTotal;
                ticket.firstScanTime = newFirstScan;
                return ticket.save();
                //return ticket
            });
    },

    generateNewScanId: function(ticketId) {
        return Tickets.findOne({ id: ticketId })
            .then(function (ticket) {
                if(!ticket) throw new Error('Ticket not found');

                var newScanId = null;
                var ticketExist = true;
                var eventId = ticket.event.id;

                while(ticketExist) {
                    var hexEventId = eventId.toString(16);
                    var randomNum = crypto.randomBytes(8);
                    newScanId = biguint(randomNum, 'hex', { prefix: hexEventId });
                    ticketExist = Tickets.find({ scanId: newScanId, event: eventId }, function(err, ticket) {
                        return ticket;
                    });
                    if(!ticket)
                        ticketExist = false;
                }

                ticket.scanId = newScanId;
                ticket.save();
                return ticket;
            });
    },    
};