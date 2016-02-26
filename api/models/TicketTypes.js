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
      isValidEvent: true,
    },

    name: {
      type: 'string',
      required: true,
    },

    maxTickets: {
      type: 'integer',
    },

    price: {
      type: 'float',
      defaultsTo: 0.0
    },

    section: {
      type: 'string',
    },

    photoTicket: {
      type: 'boolean',
      defaultsTo: false,
    },

    eventTime: {
    	type: 'datetime',
    	defaultsTo: ''
    },

    purchaseStart: {
      type: 'datetime',
      before: function () {
        return this.purchaseEnd;
      }
    },

    purchaseEnd: {
      type: 'datetime',
      after: function () {
        return this.purchaseEnd
      }
    },

    hidden: {
      type: 'boolean',
      defaultsTo: false
    }
  }

  types: {
    isValidEvent: function(id) {
      Events.findOne(id).exec(  function(err, event) {
        if (err)
          return false;
        else
          return event;
      });
    }
  }
};

