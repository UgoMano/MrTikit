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

            promise.resolve(error)

            return promise.promise;
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter a ticket id"
            }

            promise.resolve(error)

            return promise.promise;
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
            url: SERVER_URL + "/v1/tickets",
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
        get: function (id, tokenKey) {
            return get(id, tokenKey);
        },
        getAll: function (tokenKey) {
            return get(tokenKey);
        }
        
    };
})