
/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var SailsMysqlTransaction = require('sails-mysql-transactions').Transaction;

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
        var ticketQty = req.body.qty;

        SailsMysqlTransaction.start(function (err, mysqltransaction) {
            if (err || !mysqltransaction) {
                mysqltransaction && mysqltransaction.rollback();
                return next(sails.config.additionals.SAILS_MYSQL_TRANSACTION_NOT_CREATED);
            }

            TicketTypes.transact(mysqltransaction).findOne({id: ticketTypeId}).exec(function (err, ticketType) {
                if (err || !ticketType) {
                    mysqltransaction.rollback();
                    return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
                }
                var maxTickets = ticketType.maxTickets;
                if(!maxTickets) return next(sails.config.additions.MAX_TICKETS_OF_TYPE_NOT_FOUND);

                Tickets.transact(mysqltransaction).count({event: eventId, ticketType: ticketTypeId}).exec(function(err, numTickets) {
                    if(err) {
                        mysqltransaction.rollback();
                        return next(sails.config.additionals.TICKET_COUNT_NOT_FOUND);
                    }

                    TempTickets.transact(mysqltransaction).count({event: eventId, ticketType: ticketTypeId}).exec(function (err, numTempTickets) {
                        if(err) {
                            mysqltransaction.rollback();
                            return next(sails.config.additionals.TEMP_TICKET_COUNT_NOT_FOUND);
                        }

                        var totalNumTickets = numTickets + numTempTickets;
                        
                        if (maxTickets < totalNumTickets) {
                            mysqltransaction.rollback();
                            return next(sails.config.additionals.TICKETS_EXCEED_MAX_ALLOWED);
                        }
                        else {
                            var numTicketsAvail = maxTickets - totalNumTickets;
                            if (numTicketsAvail == 0 || numTicketsAvail < ticketQty ) {
                                mysqltransaction.rollback();
                                return next(sails.config.additionals.QTY_TICKETS_NOT_AVAIL);
                            }

                            var arrayObjectForCreate = [];
                            for ( i = 0; i < ticketQty; i++ ) { 
                                var createObject = {
                                    event: eventId,
                                    user: userId,
                                    ticketType: ticketTypeId,
                                };

                                arrayObjectForCreate.push(createObject);
                            }

                            var tempTicketsArray = [];

                            TempTickets.transact(mysqltransaction).create(arrayObjectForCreate).exec(function (err, tempTickets) {
                                if(err || !tempTickets) {
                                    mysqltransaction.rollback();
                                    return next(sails.config.additionals.TEMP_TICKET_NOT_CREATED);
                                }
                            
                                _.each(tempTickets, function(tempTicket) {
                                    tempTicketsArray.push(tempTicket.id);    
                                });

                                Transactions.transact(mysqltransaction).create({
                                    event: eventId,
                                    user: userId,
                                    tempTickets: tempTicketsArray,
                                }).exec(function (err, transactionObject) {
                                    if ( err || !transactionObject ) {
                                        mysqltransaction.rollback();
                                        return next(sails.config.additionals.TRANSACTION_NOT_CREATED);
                                    }

                                    mysqltransaction.commit();
                                    return res.ok({
                                        data: transactionObject,
                                    });
                                });                                                          
                            });
                        }
                    });

                });
            });
        });
    },

	purchaseTicket: function (req, res, next) {
        var transactionId = req.body.transactionId;
        var userId = req.user.id;

        SailsMysqlTransaction.start(function (err, mysqltransaction) {
            if (err || !mysqltransaction) {
                mysqltransaction && mysqltransaction.rollback();
                return next(sails.config.additionals.SAILS_MYSQL_TRANSACTION_NOT_CREATED);
            }

            Transactions.transact(mysqltransaction).findOne({ id: transactionId, user: userId }).exec(function (err, transactionObject) {
                if(err || !transactionObject ) {
                    mysqltransaction.rollback();
                    return next(sails.config.additionals.TRANSACTION_NOT_FOUND);
                }

                var tempTicketIds = transactionObject.tempTickets;
                var eventId = transactionObject.event;
                var userId = transactionObject.user;
                var ticketTypeId = "a";
                var ticketObjects = [];


                TempTickets.transact(mysqltransaction).find({ id: tempTicketIds, user: userId }).exec(function (err, tempTickets) {
                    if(err || !tempTickets) {
                        mysqltransaction.rollback();
                        return next(sails.config.additionals.TEMP_TICKET_NOT_FOUND);
                    }

                    _.each(tempTickets, function (tempTicket) {
                        var ticketObjectForCreate = {
                            event: eventId,
                            user: userId,
                            ticketType: tempTicket.ticketType,
                        };

                        ticketObjects.push(ticketObjectForCreate);
                    });

                    Tickets.transact(mysqltransaction).create(ticketObjects).exec(function (err, tickets) {
                        if ( err || !tickets) {
                            mysqltransaction.rollback();
                            return next(sails.config.additionals.TICKET_NOT_CREATED);
                        }

                        Transactions.transact(mysqltransaction).update({ id: transactionId, user: userId },
                        {
                            tempTickets: [],
                            tickets: tickets,
                            completed: true,
                        }).exec(function (err, updatedTransaction) {
                            if( err || !updatedTransaction ) {
                                mysqltransaction.rollback();
                                return next(sails.config.additionals.TRANSACTION_NOT_UPDATED);
                            }

                            var tempTicketsToDelete = [];
                            _.each(tempTicketIds, function(tempTicketId) {
                                tempTicketsToDelete.push(tempTicketId);
                            });

                            TempTickets.destroy({ id: tempTicketsToDelete }).exec(function (err) {
                                if (err) {
                                    mysqltransaction.rollback();
                                    return next(sails.config.additionals.TEMP_TICKET_DELETE_ERROR);
                                }

                                mysqltransaction.commit();
                                res.json({
                                    data: updatedTransaction,
                                });
                            });
                        });

/*
                        TempTickets.transact(mysqltransaction).destroy(tempTickets).exec(function (err) {
                            if (err) {
                                mysqltransaction.rollback();
                                return next(sails.config.additionals.TEMP_TICKET_DELETE_ERROR);
                            }

                            Transactions.transact(mysqltransaction).update({ id: transactionId, user: userId }, 
                            { 
                                tempTickets: [],
                                tickets: tickets,
                                completed: true,
                            }).exec(function (err, updatedTransaction) {
                                if( err || !updatedTransaction ) {
                                    mysqltransaction.rollback();
                                    return next(sails.config.additionals.TRANSACTION_NOT_UPDATED);
                                }

                                mysqltransaction.commit();
                                res.json({
                                    data: updatedTransaction
                                });
                            });
                        });*/
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



