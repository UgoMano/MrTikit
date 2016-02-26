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
      isValidEvent: true,
    },

    user: {
      model: 'User',
      required: true,
      isValidUser: true,
    },

    ticketType: {
      model: 'TicketTypes',
      required: true,
      isValidTicketType: true,
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

  types: {
    isValidEvent: function(id) {
      Events.findOne(id).exec(  function(err, event) {
        if (err)
          return false;
        else
          return event;
      });
    },

    isValidUser: function(id) {
      User.findOne(id).exec(  function(err, user) {
        if (err)
          return false;
        else
          return user;
      });
    },

    isValidTicketType: function(id) {
      TicketTypes.findOne(id).exec( function(err, ticketType) {
        if (err)
          return false;
        else
          return ticketType;
      });
    }
  }
};

