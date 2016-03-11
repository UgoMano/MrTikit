'use strict';

/**
 * @ngdoc service
 * @name $TicketTypes
 * @description
 */
angular.module('mrtikitApp').
factory('$TicketType', function ($http, $location, $timeout, $q) {

    var create = function (tokenKey, ticketType) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!ticketType.eventId || ticketType.eventId == "") {
            var error = {
                error: "Please enter an event"
            }

            return $q.reject(error);
        }

        if (!ticketType.name || ticketType.name == "") {
            var error = {
                error: "Please enter an ticket type name"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                event: ticketType.eventId,
                name: ticketType.name,
                maxTickets: ticketType.maxTickets,
                price: ticketType.price,
                section: ticketType.section,
                photoTicket: ticketType.photoTicket,
                eventTime: ticketType.eventTime,
                purchaseStart: ticketType.purchaseStart,
                purchaseEnd: ticketType.purchaseEnd,
                hidden: ticketType.hidden
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var update = function (
            id,
            tokenKey,
            event,
            name,
            maxTickets,
            price,
            section,
            photoTicket,
            eventTime,
            purchaseStart,
            purchaseEnd,
            hidden
    ) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'PUT',
            url: SERVER_URL + "/v1/ticketTypes/" + id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                event: event,
                name: name,
                maxTickets: maxTickets,
                price: price,
                section: section,
                photoTicket: photoTicket,
                eventTime: eventTime,
                purchaseStart: purchaseStart,
                purchaseEnd: purchaseEnd,
                hidden: hidden
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var get = function (id, tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/ticketTypes/" + id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    return {
        create: function (tokenKey, ticketType) {
            return create(tokenKey, ticketType);
        },
        update: function (id, tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn) {
            return update(id, tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
        },
        get: function (id, tokenKey) {
            return get(id, tokenKey);
        }
    };
})