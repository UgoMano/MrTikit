/**
 * Tickets.js
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

    scanId: {
      type: 'integer',
      defaultsTo: ''
    },

    checkIn: {
      type: 'boolean',
      defaultsTo: false
    },

    firstScanTime: {
      type: 'datetime',
      defaultsTo: ''
    },

    lastScanTime: {
      type: 'datetime',
      defaultsTo: ''
    },

    totalScans: {
      type: 'integer',
      defaultsTo: '0'
    },
  },

  beforeValidate(values, next) {
   var eventId = values['event'];
   var userId = values['owner'];
   var ticketTypeId = value['ticketType']
   Events.findOne(eventId, function (err, event) {
     if (err || !event) return next(sails.config.additionals.EVENT_NOT_FOUND);
     return next();
    });

  User.findOne(userId, function (err, user) {
      if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
      return next();
    });

  TicketTypes.findOne(ticketTypeId, function (err, ticketType) {
      if (err || !ticketType) return next(sails.config.additionals.TICKET_TICKET_TYPE_NOT_FOUND);
      return next();
    });
  }
};

