/**
 * TicketsController
 *
 * @description :: Server-side logic for managing Tickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    scanTicket: function (req, res) {
        if (!req.body.ticketScanId || !req.body.eventId) 
        {
            return next(sails.config.additionals.TICKET_NOT_FOUND);
        } else {

            TicketsService.scanTicket(req.body.ticketScanId, req.body.eventId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            }).catch(res.negotiate);

        }
    },

    generateNewScanId: function (req, res) {
        if (!req.body.ticketId) {
            return next(sails.config.additionals.TICKET_NOT_FOUND);
        } else {

            TicketsService.generateNewScanId(req.body.ticketId)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            }).catch(Res.negotiate);

        }
    },

    getUserTickets: function (req, res) {
        if (!req.user.id) {
            return next(sails.config.additionals.TICKET_NOT_FOUND);
        } else {

            TicketsService.getTicketsByUserId(req.user.id)
            .then(function (data) {
                return res.json({
                    data: data,
                });
            }).catch(res.negotiate);
            
        }
    }
};