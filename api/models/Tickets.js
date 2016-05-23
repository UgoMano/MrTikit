/**
 * Tickets.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var crypto = require('crypto');
var biguint = require('biguint-format');

module.exports = {

    schema: true,

    attributes: {

        scanId: {
            type: 'string',
            unique: true,
            /*        defaultsTo: function() {
                      var eventId = this.event;
                      var hexEventId = eventId.toString(16);
                      var randomNum = crypto.randomBytes(8);
                      values['scanId'] = biguint.format(randomNum, 'hex', { prefix: hexEventId });
                    },*/
        },

        event: {
            model: 'Events',
            required: true,
        },

        user: {
            model: 'User',
            required: true,
        },

        ticketType: {
            model: 'TicketTypes',
            required: true,
        },

        checkIn: {
            type: 'boolean',
            defaultsTo: false
        },

        firstScanTime: {
            type: 'datetime',
            defaultsTo: ''
        },

        lastScanTime: {
            type: 'datetime',
            defaultsTo: ''
        },

        totalScans: {
            type: 'integer',
            defaultsTo: '0'
        },
    },

    beforeValidate(values, next) {
        var eventId = values['event'];
        var userId = values['user'];
        var ticketTypeId = values['ticketType'];

        Events.findOne({
            id: eventId
        }, function (err, event) {
            if (err || !event) return next(sails.config.additionals.EVENT_NOT_FOUND);
            User.findOne({
                id: userId
            }, function (err, user) {
                if (err || !user) return next(sails.config.additionals.USER_NOT_FOUND);
                TicketTypes.findOne({
                    id: ticketTypeId
                }, function (err, ticketType) {
                    if (err || !ticketType) return next(sails.config.additionals.TICKET_TYPE_NOT_FOUND);
                    next();
                });
            });
        });
    },

    beforeCreate(values, next) {

        var newScanId = null;
        var ticketExist = true;
        var eventId = values['event'];
        while (ticketExist) {
            var hexEventId = eventId.toString(16);
            var randomNum = crypto.randomBytes(8);
            newScanId = biguint(randomNum, 'hex', {
                prefix: hexEventId
            });
            var ticket = Tickets.findOne({
                scanId: newScanId,
                event: eventId
            }, function (err, ticket) {
                return ticket;
            });
            if (!ticket)
                ticketExist = false;
        }
        values['scanId'] = newScanId;
        next();
    },

};