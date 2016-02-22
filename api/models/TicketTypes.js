/**
 * TicketTypes.js
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

    name: {
      type: 'string'
      required: true,
    },

    max_tickets: {
      type: 'integer',
    },

    price: {
      type: 'float',
      defaultsTo: ''
    },

    section: {
      type: 'string',
      defaultsTo: ''
    },

    photo_ticket: {
      type: 'boolean',
      defaultsTo: false,
    },

    time: {
    	type: 'datetime',
    	defaultsTo: ''
    }

    purchase_start: {
      type: 'datetime',
      defaultsTo: ''
    },

    purchase_end: {
      type: 'datetime',
      defaultsTo: ''
    },

    hidden: {
      type: 'boolean',
      defaultsTo: false
    },
};

