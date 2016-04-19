"use strict";

/**
 * Configuration file where you can store additionals codes for responses
 *
 * It's just a storage where you can define your custom API responses and their description.
 * You can call then in your action res.ok(data, sails.config.additionals.LINKED_ACCOUNT);
 */

module.exports = {
  additionals: {
    LINKED_ACCOUNT: {
      code: 'LINKED_ACCOUNT',
      message: 'User account has been linked via email',
      status: 201
    },
    FAILED_TO_LINK: {
      code: 'E_FAILED_TO_LINK',
      message: 'A user has been found but failed to link facebook account',
      status: 500
    },
    USER_NOT_FOUND: {
      code: 'E_USER_NOT_FOUND',
      message: 'User with specified id is not found',
      status: 401
    },
    TICKET_NOT_FOUND: {
      code: 'E_TICKET_NOT_FOUND',
      message: 'Ticke not found',
      status: 401
    },
    TICKET_TYPE_NOT_FOUND: {
      code: 'E_TICKET_TYPE_NOT_FOUND',
      message: 'Ticket type not found',
      status: 401
    },
    EVENT_NOT_FOUND: {
      code: 'E_EVENT_NOT_FOUND',
      message: 'Event with specified id is not found',
      status: 401
    },
    FORBIDDEN: {
      code: 'E_FORBIDDEN',
      message: 'Action Forbidden',
      status: 403
    },
    TRANSACTION_TYPE_NOT_FOUND: {
      code: 'E_EVENT_NOT_FOUND',
      message: 'Transaction type with specified id is not found',
      status: 401
    },
    TICKET_COUNT_NOT_FOUND: {
      code: 'E_TICKET_COUNT_NOT_FOUND',
      message: 'Ticket count for specified event not found',
      status: 401
    },
    TICKET_TYPE_NOT_AVAILABLE: {
      code: 'E_TICKET_TYPE_NOT_AVAILABLE',
      message: 'No tickets of specified type avaialable',
      status: 401
    },
    TEMP_TICKET_NOT_FOUND: {
      code: 'E_TEMP_TICKET_NOT_AVAILABLE',
      message: 'Temp ticket with specified id is not found',
      status: 401
    },
    TEMP_TICKET_DELETE_ERROR: {
      code: 'E_TEMP_TICKET_DELETE_ERROR',
      message: 'Temp ticket could not be deleted',
      status: 401
    },
    TEMP_TICKET_COUNT_NOT_FOUND: {
      code: 'E_TEMP_TICKET_COUNT_NOT_FOUND',
      message: 'Temp ticket could not be queried for count',
      status: 401
    },
    TICKETS_NOT_FOUND: {
      code: 'E_TICKETS_NOT_FOUND',
      message: 'Temp ticket could not be found',
      status: 401
    },
    MAX_TICKETS_OF_TYPE_NOT_FOUND: {
      code: 'E_MAX_TICKETS_OF_TYPE_NOT_FOUND',
      message: 'Max Tickets for Type Is Null',
      status: 401
    },
    TICKETS_EXCEED_MAX_ALLOWED: {
      code: 'E_TICKETS_EXCEED_MAX_ALLOWED',
      message: 'Total tickets in the system exceeds max tickets allowed',
      status: 401
    },
    TEMP_TICKET_NOT_CREATED: {
      code: 'E_TEMP_TICKET_NOT_CREATED',
      message: 'TempTicket could not be created',
      status: 401
    },
    TICKET_NOT_CREATED: {
      code: 'E_TICKET_NOT_CREATED',
      message: 'Ticket could not be created',
      status: 401
    },
    TRANSACTION_NOT_CREATED: {
      code: 'E_TRANSACTION_NOT_CREATED',
      message: 'Transaction could not be executed',
      status: 401
    },
  }
};

/*
 BAD_REQUEST: {
      code: 'E_BAD_REQUEST',
      message: 'The request cannot be fulfilled due to bad syntax',
      status: 400
    },

    CREATED: {
      code: 'CREATED',
      message: 'The request has been fulfilled and resulted in a new resource being created',
      status: 201
    },

    FORBIDDEN: {
      code: 'E_FORBIDDEN',
      message: 'User not authorized to perform the operation',
      status: 403
    },

    NOT_FOUND: {
      code: 'E_NOT_FOUND',
      message: 'The requested resource could not be found but may be available again in the future',
      status: 404
    },

    OK: {
      code: 'OK',
      message: 'Operation is successfully executed',
      status: 200
    },

    SERVER_ERROR: {
      code: 'E_INTERNAL_SERVER_ERROR',
      message: 'Something bad happened on the server',
      status: 500
    },

    UNAUTHORIZED: {
      code: 'E_UNAUTHORIZED',
      message: 'Missing or invalid authentication token',
      status: 401
    },

    USER_NOT_FOUND: {
      code: 'E_USER_NOT_FOUND',
      message: 'User with specified credentials is not found',
      status: 401
    }
  */