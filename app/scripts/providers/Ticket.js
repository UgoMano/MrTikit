'use strict';

/**
 * @ngdoc service
 * @name $Ticket
 * @description
 */
angular.module('mrtikitApp').
factory('$Ticket', function ($http, $location, $timeout, $q) {

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
                error: "Please enter a ticket id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/tickets/" + id,
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
    
    var getAll = function (tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/tickets",
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
    
    var getByUser = function (tokenKey, userId) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/tickets/getUserTickets",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data : {
                userId: userId
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
        get: function (id, tokenKey) {
            return get(id, tokenKey);
        },
        getAll: function (tokenKey) {
            return get(tokenKey);
        },
        getByUser(tokenKey, userId) {
            return getByUser (tokenKey, userId);
        }
        
    };
})