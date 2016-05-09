'use strict';

/**
 * @ngdoc service
 * @name $Event
 * @description
 */
angular.module('mrtikitApp').
factory('$Event', function ($http, $location, $timeout, $q) {

    var create = function (tokenKey, event) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event.title || event.title == "") {
            var error = {
                error: "Please enter an event Title"
            }

            return $q.reject(error);
        }

        if (!event.owner || event.owner == "") {
            var error = {
                error: "Please enter an event owner"
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
                title: event.title,
                owner: event.owner,
                paypal_email: event.paypal_email,
                location: event.location,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                checkIn: event.checkIn
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var update = function (tokenKey, event) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event.id || event.id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'PUT',
            url: SERVER_URL + "/v1/events/" + event.id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                title: event.title,
                owner: event.owner,
                paypal_email: event.paypal_email,
                location: event.location,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                checkIn: event.checkIn,
                published: event.published
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var getAll = function (tokenKey) {

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/events",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            }
        }
        var promise = $http(req).then(function (data) {
            return data.data.data
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
            url: SERVER_URL + "/v1/events/" + id,
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

    var holdTicket = function (tokenKey, event, ticketType) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event || event == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }
        
        if (!ticketType || ticketType == "") {
            var error = {
                error: "Please enter a ticketType"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events/holdTicket",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                eventId: event,
                ticketTypeId: ticketType
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var purchaseTicket = function (tokenKey, tempTicketId, transactionTypeId, confirmationNumber) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!tempTicketId || tempTicketId == "") {
            var error = {
                error: "Please enter a tempTicketId"
            }

            return $q.reject(error);
        }

        if (!transactionTypeId || transactionTypeId == "") {
            var error = {
                error: "Please enter a transactionTypeId"
            }

            return $q.reject(error);
        }
        
        if (!confirmationNumber || confirmationNumber == "") {
            var error = {
                error: "Please enter a confirmationNumber"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events/purchaseTicket",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                tempTicketId: tempTicketId,
                transactionTypeId: transactionTypeId,
                confirmationNumber: confirmationNumber
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
        create: function (tokenKey, event) {
            return create(tokenKey, event);
        },
        update: function (tokenKey, event) {
            return update(tokenKey, event);
        },
        getAll: function (tokenKey) {
            return getAll(tokenKey);
        },
        get: function (tokenKey, event) {
            return get(tokenKey, event);
        },
        publicGetAll: function () {
            return getAll("tokenKey");
        },
        publicGet: function (event) {
            return get(event, "tokenKey");
        },
        holdTicket: function (tokenKey, event, ticketType) {
            return holdTicket(tokenKey, event, ticketType);
        },
        purchaseTicket: function (tokenKey, tempTicketId) {
            return purchaseTicket(tokenKey, tempTicketId, "transactionTypeId", "confirmationNumber");
        }
    };
})