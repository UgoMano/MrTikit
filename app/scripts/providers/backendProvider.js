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
            },
            {
                'eventId': 6,
                'name': 'Event 6'
            },
            {
                'eventId': 7,
                'name': 'Event 7'
            },
            {
                'eventId': 8,
                'name': 'Event 8'
            },
            {
                'eventId': 9,
                'name': 'Event 9'
            },
            {
                'eventId': 10,
                'name': 'Event 10'
            }];
        var getEvents = function () {
            return events;
        }
        var getEvent = function (eventId) {
            if (eventId < 1 || eventId > events.length)
                return false;
            else
                return events[eventId - 1];
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