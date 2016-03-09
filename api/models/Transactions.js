/**
 * Transactions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	event: {
      model: 'Events',
      required: true,
    },

    user: {
      model: 'User',
      required: true,
    },

    ticket: {
      model: 'Ticket',
    },

    transactionType: {
    	model: 'TransactionTypes',
    	required: true,
    },

    confirmationNumber: {
    	type: 'string',
    },

  },

  beforeValidate(values, next) {
  	var eventId = values['event'];
    var userId = values['user'];
    var ticketId = value['ticket'];
    var transactionTypeId = value['transactionType'];

    Events.findOne(eventId, function (err, event) {
    	if (err || !event) return next(sails.config.additionals.EVENT_NOT_FOUND);
    	return next();
    });

    User.findOne(userId, function (err, user) {
    	if(err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
    	return next();
    });

    TicketTypes.findOne(ticketId, function(err, ticket) {
    	if(err || !ticket) return next(sails.config.additionals.TICKET_NOT_FOUND);
    	return next();
    });

    TransactionTypes.findOne(transactionTypeId, function(err, transactionType) {
    	if(err || !transactionType) return next(sails.config.additionals.TRANSACTION_TYPE_NOT_FOUND);
    	return next();
    });
  },

};