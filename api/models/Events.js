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

    facebookId: {
      type: 'string',
      required: false,
      unique: true
    },

    owner: {
      model: 'User',
      required: true,
    },

    category: {
      type: 'string',
    },

    description: {
      type: 'string',
    },

    location: {
      type: 'string',
    },

    startDateTime: {
      type: 'datetime',
      defaultsTo: '',
      before: function() {
        return this.endDateTime
      }
    },

    endDateTime: {
      type: 'datetime',
      defaultsTo: '',
      after: function() {
        return this.startDateTime  
      }
    },

    checkIn: {
      type: 'boolean',
      defaultsTo: false
    },

    paypal_email: {
      type: 'string',
    }
  },

  types: {
    isValidUser: function(id) {
      User.findOne(id).exec(  function(err, user) {
        if (err)
          return false;
        else
          return user;
      });
    }
  }
  
};

