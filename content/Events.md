### List Events

Get Event in the System

```endpoint
GET http://54.69.160.45:8000/v1/events

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/events"
```

```javascript
var form = new FormData();
form.append("email", "test@test.com");
form.append("password", "test12");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/events",
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
      "owner": 1,
      "title": "test event",
      "facebookId": null,
      "category": null,
      "description": "test d",
      "location": "test l",
      "photo": "",
      "startDateTime": "2016-06-01T16:34:00.000Z",
      "endDateTime": "2016-06-04T16:55:00.000Z",
      "checkIn": false,
      "paypalEmail": "elventManager@mrtikit.com",
      "published": true,
      "id": 1,
      "createdAt": "2016-05-23T19:30:20.000Z",
      "updatedAt": "2016-05-23T19:31:26.000Z"
    },
    {
      "owner": 3,
      "title": "Test Event",
      "facebookId": "1687771854795332",
      "category": null,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nunc est, eleifend aliquam aliquet vitae, imperdiet at ipsum. Sed ante est, aliquet sed sapien vitae, semper facilisis enim. Proin id massa sollicitudin, mollis mi nec, vehicula felis. Pellentesque congue est eget placerat euismod. Praesent auctor convallis turpis, ac rutrum ligula ornare vitae. Fusce feugiat, urna sollicitudin congue hendrerit, velit mauris gravida dui, quis ultrices eros mi in lacus. Ut pulvinar, nisl blandit eleifend ornare, mauris justo suscipit lacus, at efficitur diam nisi malesuada mi. Nulla rutrum nisl tortor. Vivamus vel mollis dolor. Aliquam placerat nulla sit amet sem viverra, a malesuada magna scelerisque. Proin pretium porttitor eleifend. Maecenas justo risus, ornare id urna nec, posuere efficitur ligula. Sed pulvinar tincidunt ante.",
      "location": "{\"name\":\"Drexel University\",\"location\":{\"city\":\"Philadelphia\",\"country\":\"United States\",\"latitude\":39.95661269999999,\"longitude\":-75.18994409999999,\"state\":\"PA\",\"street\":\"3141 Chestnut Street\",\"zip\":\"19104\"}}",
      "photo": null,
      "startDateTime": "2016-07-07T23:00:00.000Z",
      "endDateTime": "2016-07-08T02:00:00.000Z",
      "checkIn": false,
      "paypalEmail": "eventManager@mrtikit.com",
      "published": false,
      "id": 2,
      "createdAt": "2016-05-30T00:22:08.000Z",
      "updatedAt": "2016-05-30T03:26:33.000Z"
    }
  ],
  "criteria": {},
  "limit": 20,
  "start": 0,
  "end": 20,
  "page": 0
}
```

### Create Event

Creates an event in the system.

```endpoint
POST http://54.69.160.45:8000/v1/events
```

#### Example request

```curl
$ curl -X POST -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'title=Mr Tikit Launch Party&owner=3&=' "http://54.69.160.45:8000/v1/events"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/events",
  "method": "POST",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "title": "Mr Tikit Launch Party",
    "owner": "3",
    "startDateTime": "2016-07-07T23:00:00.000Z",
    "endDateTime": "2016-07-08T02:00:00.000Z",
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
    "startDateTime": "2016-07-07T23:00:00.000Z",
    "endDateTime": "2016-07-08T02:00:00.000Z",
    "checkIn": false,
    "published": false,
    "createdAt": "2016-05-30T05:55:32.606Z",
    "updatedAt": "2016-05-30T05:55:32.606Z",
    "id": 5
  }
}
```

### Update Event

Updates an event in the system.

```endpoint
PUT http://54.69.160.45:8000/v1/events/{event_id}
```

#### Example request

```curl
$ curl -X PUT -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'description=new desc&owner=1&photo=photo_url.jpg' "http://54.69.160.45:8000/v1/events/{event_id}"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/events/{event_id}",
  "method": "PUT",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "description": "new desc",
    "owner": "1",
    "photo": "photo_url.jpg"
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
    "title": "MrTikit Launch",
    "facebookId": null,
    "category": null,
    "description": "new desc",
    "location": "Location",
    "photo": "photo_url.jpg",
    "startDateTime": "2016-05-30T22:00:00.000Z",
    "endDateTime": "2016-05-31T01:00:00.000Z",
    "checkIn": false,
    "paypalEmail": "eventManager@mrtikit.com",
    "published": true,
    "id": 3,
    "createdAt": "2016-05-29T21:10:15.000Z",
    "updatedAt": "2016-05-30T05:58:12.000Z",
    "owner": 1
  }
}
```