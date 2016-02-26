/**
 * Events.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
      defaultsTo: '',
      startBeforeEnd: true,
    },

    end: {
      type: 'datetime',
      defaultsTo: '',
      startBeforeEnd: true,
    },

    check_in: {
      type: 'boolean',
      defaultsTo: {}
    },

    paypal_email: {
      type: 'string',
      defaultsTo: {}
    },
  },

  types: {
    startBeforeEnd: function(start, end) {
          if ( _.isDate(start) && _.isDate(end))
            return (start < end);
          else
            return false;
    }
  }


};

