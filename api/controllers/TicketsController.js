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
        TicketsService.scanTicket(req.body.ticketScanId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },

    generateNewScanId: function (req, res) {
        TicketsService.generateNewScanId(req.body.ticketId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            });
    },
};

