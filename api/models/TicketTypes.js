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
      type: 'string',
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
    },

    purchase_start: {
      type: 'datetime',
      purchaseStartBeforeEnd: true,
      required: true,
    },

    purchase_end: {
      type: 'datetime',
      purchaseStartBeforeEnd: true,
      required: true,
    },

    hidden: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  types: {
    purchaseStartBeforeEnd: function(purchase_start, purchase_end) {
      if (_.isDate(purchase_start) && _.isDate(purchase_end))
        return (purchase_start < purchase_end);
      else 
        return false;
    }
  }
};

