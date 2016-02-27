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
};

