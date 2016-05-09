
/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Transaction = require('sails-mysql-transactions').Transaction;

module.exports = {

	getNumAvailTickets: function (req, res) {
		EventsService.getNumAvailTickets(req.body.eventId)
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	holdTicket: function (req, res, next) {
		var eventId = req.body.eventId;
		var userId = req.user.id;
		var ticketTypeId = req.body.ticketTypeId;
        Transaction.start(function (err, transaction) {
            if (err || !transaction) {
                transaction && transaction.rollback();
                return next(sails.config.additionals.TRANSACTION_NOT_CREATED);
            }

            TicketTypes.transact(transaction).findOne({id: ticketTypeId}).exec(function (err, ticketType) {
                if (err || !ticketType) {
                    transaction.rollback();
                    return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
                }
                var maxTickets = ticketType.maxTickets;
                if(!maxTickets) return next(sails.config.additions.MAX_TICKETS_OF_TYPE_NOT_FOUND);

                Tickets.transact(transaction).count({event: eventId, ticketType: ticketTypeId}).exec(function(err, numTickets) {
                    if(err) {
                        transaction.rollback();
                        return next(sails.config.additionals.TICKET_COUNT_NOT_FOUND);
                    }

                    TempTickets.transact(transaction).count({event: eventId, ticketType: ticketTypeId}).exec(function (err, numTempTickets) {
                        if(err) {
                            transaction.rollback();
                            return next(sails.config.additionals.TEMP_TICKET_COUNT_NOT_FOUND);
                        }

                        var totalNumTickets = numTickets + numTempTickets;
                        
                            if (maxTickets < totalNumTickets) {
                            	transaction.rollback();
                                return next(sails.config.additionals.TICKETS_EXCEED_MAX_ALLOWED);
                            }
                            else {
                                var numTicketsAvail = maxTickets - totalNumTickets;
                                if (numTicketsAvail == 0) {
                                	transaction.rollback();
                                	return next(sails.config.additionals.TICKET_TYPE_NOT_AVAILABLE);
                                }

                                TempTickets.transact(transaction).create({event: eventId, user: userId, ticketType: ticketTypeId}).exec(function (err, tempTicket) {
                                    if(err || !tempTicket) {
                                        transaction.rollback();
                                        return next(sails.config.additionals.TEMP_TICKET_NOT_CREATED);
                                    }

                                    transaction.commit();
                                    return res.ok({
                                    	data: tempTicket,
                                    });
                                });
                            }
                    });

                });
            });
        });
	},

	purchaseTicket: function (req, res, next) {
		var tempTicketId = req.body.tempTicketId;

		Transaction.start(function (err, transaction) {
            if (err || !transaction) {
                transaction && transaction.rollback();
                return next(sails.config.additionals.TRANSACTION_NOT_CREATED);
            }
		    TempTickets.transact(transaction).findOne({ id: tempTicketId }).exec(function (err, tempTicket) {
                if(err | !tempTicket) {
                    transaction.rollback();
                    return next(sails.config.additionals.TEMP_TICKET_NOT_FOUND);
                }
                var userId = tempTicket.user;
                var eventId = tempTicket.event;
                var ticketTypeId =tempTicket.ticketType;
            
                // Will need when transactions are added
                // var transaction = Transactions.create({
                //     event: eventId,
                //     user: userId,
                //     confirmationNumber: confirmationNumber,
                // });

                var ticket = Tickets.transact(transaction).create({
                    event: eventId,
                    user: userId,
                    ticketType: ticketTypeId,
                }).exec(function (err, ticket) {
                    if(err | !ticket) {
                        transaction.rollback();
                        return next(sails.config.additionals.TICKET_NOT_CREATED);
                    }

                    // Transactions.update({id: transaction.id}, {ticket: ticket.id});
                    tempTicket.destroy(function (err) {
                    	if(err) {
                    		transaction.rollback();
                    		return next(sails.config.additionals.TEMP_TICKET_DELETE_ERROR);
                    	}
                    	transaction.commit();
                        res.ok({
                        	data: ticket,
                    	});

                    });
                });

            });                    
        });
	},

	getAllAttendees: function (req, res) {
		EventsService.getAllAttendees(req.body.eventId)
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	getPublishedEvents: function (req, res) {
		EventService.getPublishedEvents()
			.then(function (data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	getPublishedEvent: function (req, res) {
		EventService.getPublishedEvent(req.body.eventId)
			.then(function (data) { 
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},

	getUserOwnedEvents: function (req, res) {
		EventsService.getUserOwnedEvents(req.user.id)
			.then(function(data) {
				res.json({
					data: data,
				});
			}).catch(res.negotiate);
	},
  
};



