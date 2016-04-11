/**
 * Events.js
 * 
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 *
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
      type: 'text',
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
      defaultsTo: false,
      boolean: true
    },

    paypalEmail: {
      type: 'string',
    },

    published: {
      type: 'boolean',
      defaultsTo: false,
      boolean: true
    },

  },

  beforeValidate(values, next) {
    var userId = values['owner'];

    User.findOne(userId, function (err, user) {
      if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
      return next();
    });
  }
  
};

