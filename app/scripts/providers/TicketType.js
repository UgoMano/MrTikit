'use strict';

/**
 * @ngdoc service
 * @name $TicketTypes
 * @description
 */
angular.module('mrtikitApp').
factory('$TicketTypes', function ($http, $location, $timeout, $q) {

    var create = function (
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

            promise.resolve(error)

            return promise.promise;
        }

        if (!event || event == "") {
            var error = {
                error: "Please enter an event"
            }

            promise.resolve(error)

            return promise.promise;
        }

        if (!name || name == "") {
            var error = {
                error: "Please enter an event name"
            }

            promise.resolve(error)

            return promise.promise;
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events",
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
            return data;
        }, function (error) {
            return error;
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

            promise.resolve(error)

            return promise.promise;
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            promise.resolve(error)

            return promise.promise;
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
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }

    var get = function (id, tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            promise.resolve(error)

            return promise.promise;
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            promise.resolve(error)

            return promise.promise;
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
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }

    return {
        create: function (tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn) {
            return create(tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
        },
        update: function (id, tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn) {
            return update(id, tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
        },
        get: function (id, tokenKey) {
            return get(id, tokenKey);
        }
    };
})