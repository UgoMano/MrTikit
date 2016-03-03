angular.module('mrtikitApp')
    .factory("$backend", function ($http, $q) {
        var events = [
            {
                'eventId': 1,
                'name': 'Event 1'
            },
            {
                'eventId': 2,
                'name': 'Event 2'
            },
            {
                'eventId': 3,
                'name': 'Event 3'
            },
            {
                'eventId': 4,
                'name': 'Event 4'
            },
            {
                'eventId': 5,
                'name': 'Event 5'
            }];
        var getEvents = function () {
            return events;
        }
        var getEvent = function (eventId) {
            if (eventId > events.length)
                return false;
            else
                return events[eventId];
        }
        return {
            getEvents: function () {
                return getEvents();
            },
            getEvent: function (eventId) {
                return getEvent(eventId);
            }
        }
    });