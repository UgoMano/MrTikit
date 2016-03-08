'use strict';

/**
 * @ngdoc service
 * @name $User
 * @description
 */
angular.module('mrtikitApp').
factory('$User', function ($http, $location, $timeout, $q) {
    /*
    var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/auth/signin",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + tokenKey
            }
        }
        */
    
    var login = function(email, password) {
        var promise = $q.defer();
        
        if(!email || email == "") {
            var error = {
                error: "Please enter an email"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        if(!password || password == "") {
            var error = {
                error: "Please enter a password"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/auth/signin",
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                email: email,
                password: password
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }

    var signup = function(firstName, lastName, username, email, password) {
        var promise = $q.defer();
        
        if(!firstName || firstName == "") {
            var error = {
                error: "Please enter a First Name"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        if(!lastName || lastName == "") {
            var error = {
                error: "Please enter a Last Name"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        if(!username || username == "") {
            var error = {
                error: "Please enter a Username"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        if(!email || email == "") {
            var error = {
                error: "Please enter an Email"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        if(!password || password == "") {
            var error = {
                error: "Please enter a Password"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/auth/signup",
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return error;
        });
        return promise;
    }
    
    var update = function(id, tokenKey, firstName, lastName, username, email, password) {
        var promise = $q.defer();

        if(!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }
            
            promise.resolve(error)
            
            return promise.promise;
        }
        
        var req = {
            method: 'PUT',
            url: SERVER_URL + "/v1/users/" + id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
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
        login: function(email, password) {
            return login(email, password);  
        },
        signup: function(firstName, lastName, username, email, password) {
            return signup(firstName, lastName, username, email, password);  
        },
        update: function(id, tokenKey, firstName, lastName, username, email, password) {
            return update(id, tokenKey, firstName, lastName, username, email, password);  
        }
    };
})