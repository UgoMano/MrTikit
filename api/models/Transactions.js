/**
 * Transactions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model: 'User',
    },

    event: {
      model: 'Events',
    },

    tempTickets: {
      type: 'array',
      defaultsTo: []
    },

    payKey: {
      type: 'string',
    },

    completed: {
      type: 'boolean',
      defaultsTo: false,
    },

    tickets: {
      type: 'array',
      defaultsTo: []
    },

    remoteUrl: {
      type: 'string',
    }

  },

};