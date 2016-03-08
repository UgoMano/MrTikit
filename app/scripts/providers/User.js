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
            
            return $q.reject(error);
        }
        
        if(!password || password == "") {
            var error = {
                error: "Please enter a password"
            }
            
            return $q.reject(error);
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
            return $q.reject(error);
        });
        return promise;
    }

    var signup = function(firstName, lastName, username, email, password) {
        var promise = $q.defer();
        
        if(!firstName || firstName == "") {
            var error = {
                error: "Please enter a First Name"
            }
            
            return $q.reject(error);
        }
        
        if(!lastName || lastName == "") {
            var error = {
                error: "Please enter a Last Name"
            }
            
            return $q.reject(error);
        }
        
        if(!username || username == "") {
            var error = {
                error: "Please enter a Username"
            }
            
            return $q.reject(error);
        }
        
        if(!email || email == "") {
            var error = {
                error: "Please enter an Email"
            }
            
            return $q.reject(error);
        }
        
        if(!password || password == "") {
            var error = {
                error: "Please enter a Password"
            }
            
            return $q.reject(error);
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
            return $q.reject(error);
        });
        return promise;
    }
    
    var update = function(id, tokenKey, firstName, lastName, username, email, password) {
        var promise = $q.defer();

        if(!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }
            
            return $q.reject(error);
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
            return $q.reject(error);
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