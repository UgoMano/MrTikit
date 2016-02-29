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
    like: function (req, res) {
    	TicketTypesService.getNumTicketsOfTypeAvailableForEvent(1, 1).then(function(data){
	  	  return res.json({
	  	    todo: 'Not implemented yet!',
	  	    types: data
	  	  });
	  	});
  	}
};

