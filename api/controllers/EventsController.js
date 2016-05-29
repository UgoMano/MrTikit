
/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var SailsMysqlTransaction = require('sails-mysql-transactions').Transaction;

module.exports = {

	getNumAvailTickets: function (req, res) {
        if (!req.body.eventId) {
            return next(sails.config.additionals.EVENT_NOT_FOUND);
        } else {
            EventsService.getNumAvailTickets(req.body.eventId)
            .then(function (data) {
                res.json({
                    data: data,
                });
            }).catch(res.negotiate);
        }
	},

	holdTicket: function (req, res, next) {
        if(!req.body.eventId) {
            return next(sails.config.additionals.EVENT_NOT_FOUND);
        } else if (!req.user.id) {
            return next(sails.config.additionals.USER_NOT_FOUND);
        } else if (!req.body.ticketTypeId) {
            return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
        } else if (!req.body.qty) {
            return next(sails.config.additionals.QUANTITY_NOT_FOUND);
        } else {
            var eventId = req.body.eventId;
            var userId = req.user.id;
            var ticketTypeId = req.body.ticketTypeId;
            var ticketQty = req.body.qty;

            SailsMysqlTransaction.start(function (err, mysqltransaction) {
                if (err || !mysqltransaction) {
                    mysqltransaction && mysqltransaction.rollback();
                    return next(sails.config.additionals.SAILS_MYSQL_TRANSACTION_NOT_CREATED);
                }

                TicketTypes.transact(mysqltransaction).findOne({id: ticketTypeId}).populate('event').exec(function (err, ticketType) {
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

                                        //Update amount
                                        var eventPaypalEmail = ticketType.event.paypalEmail;
                                        var transactionAmount = ticketType.price * ticketQty;

                                        var pp = PayPalService.createPayment(transactionAmount, 1, eventPaypalEmail, transactionObject.id);

                                        request.post(pp, function (err, httpResponse, body) {
                                            if (err) {
                                                res.badRequest("Error: " + err);
                                                mysqltransaction.rollback();
                                                return next(sails.config.additionals.PAYPAL_SERVER_ERROR);
                                            }
                                            var paypalPaymentData = {
                                                payKey: body.payKey,
                                                remoteUrl: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=",
                                            }

                                            if(body.error) {
                                                mysqltransaction.rollback();
                                                return next(sails.config.additionals.TEMP_TICKET_NOT_CREATED, body);
                                                //res.badRequest(paypalPaymentData);
                                            } else {
                                                //res.ok(data);
                                                Transactions.transact(mysqltransaction).update({ id: transactionObject.id },
                                                {
                                                    payKey: paypalPaymentData.payKey,
                                                    remoteUrl: paypalPaymentData.remoteUrl,
                                                }).exec(function (err, updatedTransaction) {
                                                    if( err || !updatedTransaction ) {
                                                        mysqltransaction.rollback();
                                                        return next(sails.config.additionals.TRANSACTION_NOT_UPDATED);
                                                    }

                                                    mysqltransaction.commit();
                                                    return res.ok({
                                                        data: updatedTransaction,
                                                    });
                                                });
                                            }
                                        });     
                                    });                                                                                     
                                });
                            }
                        });
                    });
                });
            });
        }
    },


	purchaseTicket: function (req, res, next) {
        if (!req.body.transactionId) {
            return next(sails.config.additionals.TRANSACTION_NOT_FOUND);
        } else if(!req.user.id) {
            return next(sails.config.additionals.USER_NOT_FOUND);
        } else {

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

                        var pp = PayPalService.getPaymentDetails(transactionObject.payKey);

                        request.post(pp, function (err, httpResponse, body) {
                            if (err) {
                                //res.badRequest("Error: " + err);
                                mysqltransaction.rollback();
                                return next(sails.config.additionals.PAYPAL_SERVER_ERROR);
                            }

                            //We'll need to parse this response and just return if its good or not.
                            if(body.error) {
                                //res.badRequest(body);
                                //console.log(body);
                                mysqltransaction.rollback();
                                return next(sails.config.additionals.PAYPAL_PAYMENT_NOT_CREATED);
                            } else {
                                var paypalPaymentResponse = {
                                    status: body.status,
                                }

                                if(paypalPaymentResponse.status === "COMPLETED") {
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
                                    });
                                } else {
                                    mysqltransaction.rollback();
                                    return next(sails.config.additionals.PAYPAL_PAYMENT_NOT_COMPLETED);

                                }


                                //res.ok(data);
                            }
                        });
                    });
                });                 
            });

        }
    },

	getAllAttendees: function (req, res) {
        if (!req.body.eventId) {
            return next(sails.config.additionals.EVENT_NOT_FOUND);
        } else {

            EventsService.getAllAttendees(req.body.eventId)
            .then(function (data) {
                res.json({
                    data: data,
                });
            }).catch(res.negotiate);
            
        }
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
        if (!req.body.eventId) {
            return next(sails.config.additionals.EVENT_NOT_FOUND);
        } else {

            EventService.getPublishedEvent(req.body.eventId)
            .then(function (data) { 
                res.json({
                    data: data,
                });
            }).catch(res.negotiate); 

        }
	},

	getUserOwnedEvents: function (req, res) {
        if (!req.body.eventId) {
            return next(sails.config.additionals.EVENT_NOT_FOUND);
        } else {

            EventsService.getUserOwnedEvents(req.user.id)
            .then(function(data) {
                res.json({
                    data: data,
                });
            }).catch(res.negotiate);

        }
	},
  
};



