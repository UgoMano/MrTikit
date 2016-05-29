// TicketsService.js - in api/services

var crypto = require('crypto');
var biguint = require('biguint-format');

module.exports = {

    getTicketsByEvent: function(eventId) {
        return Tickets.find({event: eventId})
            .then(function (tickets) {
                if(!tickets) return sails.config.additionals.TICKETS_NOT_FOUND;
                return tickets;
            });
    },

    getTicketsByType: function(ticketTypeId, eventId) {
        return Tickets.find({event: eventId, ticketType: ticketTypeId})
            .then(function (tickets) {
                if (!tickets) return sails.config.additionals.TICKETS_NOT_FOUND;
                return tickets;
            });
    },

    getTicketsByUserId: function(userId) {
        return Tickets.find({user: userId}).populateAll()
            .then(function (allTickets) {
                if(!allTickets) return sails.config.additionals.TICKETS_NOT_FOUND;
                ticketInfo = [];

                _.each(allTickets, function(ticket) {
                    newObject = {
                        id: ticket.id,
                        scanId: ticket.scanId,
                        checkIn: ticket.checkIn,
                        firstScanTime: ticket.firstScanTime,
                        lastScanTime: ticket.lastScanTime,
                        totalScans: ticket.totalScans,
                        ticketType: {
                            name: ticket.ticketType.name,
                            price: ticket.ticketType.price,
                        },
                        event: {
                            title: ticket.event.title,
                            startDateTime: ticket.event.startDateTime,
                            endDateTime: ticket.event.endDateTime,
                            // add location
                        },
                    };

                    ticketInfo.push(newObject);

                })
                return ticketInfo;
                //console.log(allTickets);
            });
    },

/*    getTicketsByUserId: function(userId) {
        return Tickets.find({user: userId}).populateAll()
            .then(function (allTickets) {
                return allTickets;
              if (!tickets) throw new Error('Tickets not found');
                return tickets;
            });
    },*/

    getNumTicketsByType: function(ticketTypeId, eventId) {
        return Tickets.count({event: eventId, ticketType: ticketTypeId})
            .then(function (found) {
                if(!found) return sails.config.additionals.TEMP_TICKET_COUNT_NOT_FOUND;
                return found;
            });
    },

    scanTicket: function(ticketScanId, eventId) {
        return Tickets.findOne({scanId: ticketScanId, event: eventId}).populateAll()
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
                ticket.save();
                ticketObjectToReturn = {
                    id: ticket.id,
                    scanId: ticket.scanId,
                    checkIn: ticket.checkIn,
                    firstScanTime: ticket.firstScanTime,
                    lastScanTime: ticket.lastScanTime,
                    totalScans: ticket.totalScans,
                    user: {
                        firstName: ticket.user.firstName,
                        lastName: ticket.user.lastName,
                        email: ticket.user.email,
                    },
                    ticketType: {
                        name: ticket.ticketType.name,
                        section: ticket.tyicketType.section,
                    },
                };

                return ticketObjectToReturn;
                //return ticket
            });
    },

    generateNewScanId: function(ticketId) {
        return Tickets.findOne({ id: ticketId })
            .then(function (ticket) {
                if(!ticket) return sails.config.additionals.TICKET_NOT_FOUND;

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