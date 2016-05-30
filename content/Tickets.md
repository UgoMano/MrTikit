### Hold Ticket

Creates a tempTicket in the system along with a transaction and a paykey in paypal. Returns the transaction.

```endpoint
POST http://54.69.160.45:8000/v1/events/holdTicket
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'eventId=6&ticketTypeId=8&qty=2' "http://54.69.160.45:8000/v1/events/holdTicket"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/events/holdTicket",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "eventId": "6",
    "ticketTypeId": "8",
    "qty": "2"
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
    "title": "Mr Tikit Launch Party",
    "owner": 3,
    "paypalEmail": "eventManager@mrtikit.com",
    "startDateTime": "",
    "endDateTime": "",
    "checkIn": false,
    "published": false,
    "createdAt": "2016-05-30T07:35:36.652Z",
    "updatedAt": "2016-05-30T07:35:36.652Z",
    "id": 6
  }
}
```

### Purchase Ticket

Creates and returns tickets after users paypal transaction is complete

```endpoint
POST http://54.69.160.45:8000/v1/events/purchaseTicket
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'transactionId=36' "http://54.69.160.45:8000/v1/events/purchaseTicket"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/events/purchaseTicket",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "transactionId": "36"
  }
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
      "tempTickets": [],
      "payKey": "AP-31M63142H3965554D",
      "completed": true,
      "tickets": [
        {
          "event": 6,
          "user": 1,
          "ticketType": 8,
          "checkIn": false,
          "firstScanTime": "",
          "lastScanTime": "",
          "totalScans": 0,
          "scanId": "6de1406cedaadbbd5",
          "createdAt": "2016-05-30T07:44:51.302Z",
          "updatedAt": "2016-05-30T07:44:51.302Z",
          "id": 9
        },
        {
          "event": 6,
          "user": 1,
          "ticketType": 8,
          "checkIn": false,
          "firstScanTime": "",
          "lastScanTime": "",
          "totalScans": 0,
          "scanId": "6bf02164eed75aece",
          "createdAt": "2016-05-30T07:44:51.303Z",
          "updatedAt": "2016-05-30T07:44:51.303Z",
          "id": 10
        }
      ],
      "remoteUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=",
      "id": 36,
      "createdAt": "2016-05-30T07:40:11.000Z",
      "updatedAt": "2016-05-30T07:44:51.000Z",
      "user": 1,
      "event": 6
    }
  ]
}
```

### Scan Ticket

Checks if ticket is valid for the event

```endpoint
POST http://54.69.160.45:8000/v1/tickets/scanTicket
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'ticketScanId=6de1406cedaadbbd5&eventId=6' "http://54.69.160.45:8000/v1/tickets/scanTicket"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/tickets/scanTicket",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "ticketScanId": "6de1406cedaadbbd5",
    "eventId": "6"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Example response

```json
{
  "data": {
    "id": 9,
    "scanId": "6de1406cedaadbbd5",
    "checkIn": false,
    "firstScanTime": "2016-05-30T07:47:36.106Z",
    "lastScanTime": "2016-05-30T07:47:36.106Z",
    "totalScans": 1,
    "user": {
      "firstName": "test",
      "lastName": "test",
      "email": "test@test.com"
    }
  }
}
```