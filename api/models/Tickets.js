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

    ticket_type: {
      model: 'TicketTypes',
      required: true,
    },

    scan_id: {
      type: 'integer',
      defaultsTo: ''
    },

    check_in: {
      type: 'boolean',
      defaultsTo: false
    },

    first_scan_time: {
      type: 'datetime',
      defaultsTo: ''
    },

    last_scan_time: {
      type: 'datetime',
      defaultsTo: ''
    },

    total_scans: {
      type: 'integer',
      defaultsTo: '0'
    }
  }
};

