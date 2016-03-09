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
      message: 'Ticket with specified id is not found',
      status: 401
    },
    TICKET_TYPE_NOT_FOUND: {
      code: 'E_TICKET_TYPE_NOT_FOUND',
      message: 'Ticket type with specified id is not found',
      status: 401
    },
    EVENT_NOT_FOUND: {
      code: 'E_EVENT_NOT',
      message: 'Event with specified id is not found',
      status: 401
    },
    FORBIDDEN: {
      code: 'E_FORBIDDEN',
      message: 'Action Forbidden',
      status: 403
    },
    TRANSACTION_TYPE_NOT_FOUND: {
      code: 'E_EVENT_NOT',
      message: 'Transaction type with specified id is not found',
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