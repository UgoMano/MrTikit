/**
 * TicketsController
 *
 * @description :: Server-side logic for managing Tickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    getUserTickets: function (req, res) {
    	TicketsService.getTicketsByUserId(req.body.userId)
    		.then(function (data) {
    			return res.json({
    			data: data,
    		});
    	});
    },

    scanTicket: function (req, res) {
        TicketsService.scanTicket(req.body.ticketUuid)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },

    generateTicketUuid: function (req, res) {
        TicketsService.generateTicketUuid(req.body.ticketId, req.body.userId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },

/*
    getTicketsByType: function (req, res) {
        TicketsService.getTicketsByType(req.ticketTypeId, req.eventId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },

    getNumTicketsByType: function (req, res) {
        TicketsService.getNumTicketsByType(req.ticketTypeId, req.eventId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },
*/
};

