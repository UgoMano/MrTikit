// EventsService.js - in api/services


var Transaction = require('sails-mysql-transactions').Transaction;

module.exports = {

	getNumAvailTickets: function(eventId) {
		return TicketTypes.find({ event: eventId })
			.then(function(ticketTypes) {
                var promises= [];
				if(!ticketTypes) return sails.config.additionals.TICKET_TYPE_NOT_FOUND;
                var totalNumAvailTickets;
                _.each(ticketTypes, function(ticketType) {

                    promises.push(TicketTypesService.getNumAvailTickets(ticketType.id, eventId));
/*                    promises.push(TicketTypesService.getNumAvailTickets(ticketType.id, eventId).then(function(data){
                        return data;
                    }));*/
                });
                return Promise.all(promises).then(function(numTicketsAvail) {
                    return numTicketsAvail.reduce(function (a, b) {
                        return a + b;
                    });
                });
			});
	},

    getAllAttendees: function(eventId) {
        return Tickets.find({event: eventId}).populateAll()
            .then(function(tickets) {
                var allNames = [];
                _.each(tickets, function(ticket) {
                        var fullName = ticket.user.firstName + ' ' + ticket.user.lastName;
                        allNames.push(fullName);
                });

                return allNames;

            });
    },

    getPublishedEvents: function() { 
        return Events.find({published: true})
            .then(function (publishedEvents) {
                var allPublishedEventObjects = [];
                _.each(publishedEvents, function(event) {
                    var eventObject = {
                        id: event.id,
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        startDateTime: event.startDateTime,
                        endDateTime: event.endDateTime,
                        category: event.category,
                        owner: event.owner
                    };

                    allPublishedEventObjects.push(event);
                });
                return allPublishedEventObjects;
            })
    },

    getPublishedEvent: function(eventId) {
        return Events.findOne({id: eventId, published: true})
            .then(function (event) {
                var eventObject = {
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    startDateTime: event.startDateTime,
                    endDateTime: event.endDateTime,
                    category: event.category,
                    owner: event.owner
                };
                return eventObject;
            });
    },

    getUserOwnedEvents: function(userId) {
        return Events.find({owner: userId})
            .then(function (events) {
                if(!events)
                    return sails.config.additionals.EVENTS_NOT_FOUND;


                return events;
            });
    },
    
};