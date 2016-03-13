/**
 * TempTickets.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	  schema: true,

  attributes: {

    event: {
      model: 'Events',
      required: true,
    },

    user: {
      model: 'User',
      required: true,
    },

    ticketType: {
      model: 'TicketTypes',
      required: true,
    },
    
  },

  beforeValidate(values, next) {
    var eventId = values['event'];
    var userId = values['user'];
    var ticketTypeId = values['ticketType'];

    Events.findOne({id: eventId}, function(err, event) {
      if (err || !event) return next(sails.config.additionals.EVENT_NOT_FOUND);
      User.findOne({id: userId}, function(err, user) {
        if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
        TicketTypes.findOne({id: ticketTypeId}, function(err, ticketType) {
          if (err || !ticketType) return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
          next();
        });
      });
   });
  }
};

