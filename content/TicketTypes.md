### Create Ticket Types

Creates Ticket Types in the system.

```endpoint
POST http://54.69.160.45:8000/v1/ticketTypes
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'event=1&name=General Adminisson' "http://54.69.160.45:8000/v1/ticketTypes"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/ticketTypes",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "event": "1",
    "name": "General Adminisson"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Example response

```json
{
  "code": "CREATED",
  "message": "The request has been fulfilled and resulted in a new resource being created",
  "data": {
    "event": 1,
    "name": "General Adminisson",
    "maxTickets": 10,
    "price": 0,
    "photoTicket": false,
    "eventTime": "",
    "hidden": false,
    "createdAt": "2016-05-30T06:08:48.757Z",
    "updatedAt": "2016-05-30T06:08:48.757Z",
    "id": 5
  }
}
```

### Get Ticket Types

Lists all Ticket Types.

```endpoint
GET http://54.69.160.45:8000/v1/ticketTypes
```

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/ticketTypes"
```

```javascript
var form = new FormData();
form.append("email", "test@test.com");
form.append("password", "test12");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/ticketTypes",
  "method": "GET",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Example response

```json
{
  "code": "OK",
  "message": "Operation is successfully executed",
  "data": [
    {
      "event": 1,
      "name": "ga",
      "maxTickets": 10,
      "price": 4,
      "section": null,
      "photoTicket": false,
      "eventTime": "0000-00-00 00:00:00",
      "purchaseStart": null,
      "purchaseEnd": null,
      "hidden": false,
      "description": null,
      "id": 1,
      "createdAt": "2016-05-23T19:31:09.000Z",
      "updatedAt": "2016-05-23T19:31:09.000Z"
    },
    {
      "event": 2,
      "name": "test",
      "maxTickets": 100,
      "price": 1,
      "section": null,
      "photoTicket": false,
      "eventTime": "0000-00-00 00:00:00",
      "purchaseStart": null,
      "purchaseEnd": null,
      "hidden": false,
      "description": null,
      "id": 2,
      "createdAt": "2016-05-23T20:24:13.000Z",
      "updatedAt": "2016-05-23T20:24:13.000Z"
    },
    {
      "event": 3,
      "name": "General Admission",
      "maxTickets": 100,
      "price": 10,
      "section": null,
      "photoTicket": false,
      "eventTime": "0000-00-00 00:00:00",
      "purchaseStart": null,
      "purchaseEnd": null,
      "hidden": false,
      "description": null,
      "id": 3,
      "createdAt": "2016-05-29T21:10:31.000Z",
      "updatedAt": "2016-05-29T21:10:31.000Z"
    }
  ],
  "criteria": {},
  "limit": 20,
  "start": 0,
  "end": 20,
  "page": 0
}
```

### Get Ticket Types By Event

Lists all Ticket Types For Event.

```endpoint
POST http://54.69.160.45:8000/v1/ticketTypes/getTicketTypesByEvent
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache"-H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "eventId=3" "http://54.69.160.45:8000/v1/ticketTypes/getTicketTypesByEvent"
```

```javascript
var form = new FormData();
form.append("eventId", "3");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/ticketTypes/getTicketTypesByEvent",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Example response

```json
{
  "data": [
    {
      "event": 3,
      "name": "General Admission",
      "maxTickets": 100,
      "price": 10,
      "section": null,
      "photoTicket": false,
      "eventTime": "0000-00-00 00:00:00",
      "purchaseStart": null,
      "purchaseEnd": null,
      "hidden": false,
      "description": null,
      "id": 3,
      "createdAt": "2016-05-29T21:10:31.000Z",
      "updatedAt": "2016-05-29T21:10:31.000Z"
    }
  ]
}
```

### Update Ticket Type

Updates Ticket Type.

```endpoint
PUT http://54.69.160.45:8000/v1/ticketTypes/{ticketType_id}
```

#### Example request

```curl
$ curl -X PUT -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'price=5.50&event=1' "http://54.69.160.45:8000/v1/ticketTypes/1""
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/ticketTypes/1",
  "method": "PUT",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "price": "5.50",
    "event": "1"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Example response

```json
{
  "code": "OK",
  "message": "Operation is successfully executed",
  "data": {
    "name": "General Admission",
    "maxTickets": 100,
    "price": 5.5,
    "section": null,
    "photoTicket": false,
    "eventTime": "0000-00-00 00:00:00",
    "purchaseStart": null,
    "purchaseEnd": null,
    "hidden": false,
    "description": null,
    "id": 3,
    "createdAt": "2016-05-29T21:10:31.000Z",
    "updatedAt": "2016-05-30T06:16:43.000Z",
    "event": 1
  }
}
```