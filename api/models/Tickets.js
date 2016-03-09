/**
 * Tickets.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid');

module.exports = {

  schema: true,

  attributes: {

    uuid: {
        type: 'string',
        unique: true,
        index: true,
        uuidv4: true
    },
    
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
    var ticketTypeId = value['ticketType'];
    var uuid = values['uuid'];

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

  },

  beforeCreate(values, next) {
    var uuid = values.uuid;

    if(uuid) {
      return next(sails.config.additionals.FORBIDDEN);
    } 
    else {
      var newUuid = null;
      var ticketExist = true;

      while(ticketExist) {
        newUuid = uuid.v4();
        ticketExist = Tickets.findOne({uuid: newUuid}, function(err, ticket) {
          if (err) return next(sails.config.additional.TICKET_NOT_FOUND);
          if (!ticket)
              return false;
          else
              return true;

        });
      }

      values.uuid = newUuid;

    }
  }
  
};

