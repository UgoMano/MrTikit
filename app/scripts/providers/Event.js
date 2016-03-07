'use strict';

/**
 * @ngdoc service
 * @name $Event
 * @description
 */
angular.module('mrtikitApp').
factory('$Event', function ($http, $location, $timeout, $q) {

    var create = function (tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            promise.resolve(error)

            return promise.promise;
        }

        if (!title || title == "") {
            var error = {
                error: "Please enter an event Title"
            }

            promise.resolve(error)

            return promise.promise;
        }

        if (!owner || owner == "") {
            var error = {
                error: "Please enter an event owner"
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
                title: title,
                owner: owner,
                paypal_email: paypal_email,
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                checkIn: checkIn
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }

    var update = function (id, tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn) {
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
            url: SERVER_URL + "/v1/events/" + id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                title: title,
                owner: owner,
                paypal_email: paypal_email,
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                checkIn: checkIn
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }

    var getAll = function (tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            promise.resolve(error)

            return promise.promise;
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
            url: SERVER_URL + "/v1/events/" + id,
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
        getAll: function (tokenKey) {
            return getAll(tokenKey);
        },
        get: function (id, tokenKey) {
            return get(id, tokenKey);
        }
    };
})