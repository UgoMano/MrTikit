/**
 * TransactionTypes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	name: {
  		type: 'string',
  		required: true,
  	},

  	event: {
      model: 'Events',
      required: true,
    },

    // info for each transactionType will need to be here

  },

  beforeValidate(values, next) {
    var eventId = values['event'];

    Events.findOne(eventId, function (err, event) {
      if (err || !event) return next(sails.config.additionals.EVENT_NOT_FOUND);
      return next();
    });
  },
};

