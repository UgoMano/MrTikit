/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	schema: true,

  attributes: {
    title: {
      type: 'string',
      required: true,
    },

    facebook_id: {
      type: 'string'
      required: true,
      unique: true
    },

    owner: {
      model: 'User',
      required: true,
    },

    category: {
      type: 'string',
      defaultsTo: ''
    },

    description: {
      type: 'string',
      defaultsTo: ''
    },

    location: {
      type: 'string',
      defaultsTo: '',
    },

    start: {
      type: 'datetime',
      defaultsTo: ''
    },

    end: {
      type: 'datetime',
      defaultsTo: ''
    },

    check_in: {
      type: 'boolean',
      defaultsTo: {}
    },

    paypal_email: {
      type: 'string',
      defaultsTo: {}
    },
};

