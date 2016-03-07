/**
 * TicketsController
 *
 * @description :: Server-side logic for managing Tickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
    * CommentController.like()
    */
    getUserTickets: function (req, res) {
    	TicketsService.getTicketsByUserId(req.userId)
    		.then(function (data) {
    			return res.json({
    			data: data,
    		});
    	});
    }
};

