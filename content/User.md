### Login

Login to the System

```endpoint
POST http://54.69.160.45:8000/v1/auth/signin
```

#### Example request

```curl
$ curl -X POST -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'email=test@test.com&password=test12' "http://54.69.160.45:8000/v1/auth/signin"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/auth/signin",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "email": "test@test.com",
    "password": "test12"
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
    "token": "{authToken}",
    "user": {
      "username": "test",
      "email": "test@test.com",
      "firstName": "test",
      "lastName": "test",
      "photo": "",
      "facebookId": "",
      "id": 1,
      "createdAt": "2016-05-23T19:29:28.000Z",
      "updatedAt": "2016-05-23T19:29:28.000Z"
    }
  }
}
```

### Facebook Login

Login to the System using a Facebook Token

```endpoint
POST http://54.69.160.45:8000/v1/auth/social
```

#### Example request

```curl
$ curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d 'access_token={fbAccessToken}&type=facebook' "http://54.69.160.45:8000/v1/auth/social"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/auth/social",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
  },
  "data": {
    "access_token": "{fbAccessToken}",
    "type": "facebook"
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
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MywiaWF0IjoxNDY0NTg3NzE4LCJleHAiOjE0NjQ2NzQxMTh9.Cf7QxbD32Q2VmzOTWSjQykE1WwYSZJ7Xp51ceBVnVSPejLJ8-s46g7Q7dnshzn0438HrGFvnF4otO_J0Z1AdKg",
    "user": {
      "username": "Steve10207926613950779",
      "email": "steve.a.calabro@gmail.com",
      "firstName": "Steve",
      "lastName": "Calabro",
      "photo": "https://graph.facebook.com/10207926613950779/picture?type=large",
      "facebookId": "10207926613950779",
      "id": 3,
      "createdAt": "2016-05-26T06:41:32.000Z",
      "updatedAt": "2016-05-26T06:41:32.000Z"
    }
  }
}
```

### Get Users

Gets all Users.

```endpoint
GET http://54.69.160.45:8000/v1/users
```

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/users"
```

```javascript
var form = new FormData();
form.append("email", "test@test.com");
form.append("password", "test12");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/users",
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
      "username": "test",
      "email": "test@test.com",
      "firstName": "test",
      "lastName": "test",
      "photo": "",
      "facebookId": "",
      "id": 1,
      "createdAt": "2016-05-23T19:29:28.000Z",
      "updatedAt": "2016-05-23T19:29:28.000Z"
    },
    {
      "username": "Josh10209568378953207",
      "email": "josh.bauer3@yahoo.com",
      "firstName": "Josh",
      "lastName": "Bauer",
      "photo": "https://graph.facebook.com/10209568378953207/picture?type=large",
      "facebookId": "10209568378953207",
      "id": 2,
      "createdAt": "2016-05-23T20:23:07.000Z",
      "updatedAt": "2016-05-23T20:23:07.000Z"
    },
    {
      "username": "Steve10207926613950779",
      "email": "steve.a.calabro@gmail.com",
      "firstName": "Steve",
      "lastName": "Calabro",
      "photo": "https://graph.facebook.com/10207926613950779/picture?type=large",
      "facebookId": "10207926613950779",
      "id": 3,
      "createdAt": "2016-05-26T06:41:32.000Z",
      "updatedAt": "2016-05-26T06:41:32.000Z"
    }
  ],
  "criteria": {},
  "limit": 20,
  "start": 0,
  "end": 20,
  "page": 0
}
```

### Get User

Gets a specific user

```endpoint
GET http://54.69.160.45:8000/v1/users/{userId}
```

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/users/1"
```

```javascript
var form = new FormData();
form.append("email", "test@test.com");
form.append("password", "test12");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/users/1",
  "method": "GET",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache"
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
  "data": {
    "username": "test",
    "email": "test@test.com",
    "firstName": "test",
    "lastName": "test",
    "photo": "",
    "facebookId": "",
    "id": 1,
    "createdAt": "2016-05-23T19:29:28.000Z",
    "updatedAt": "2016-05-23T19:29:28.000Z"
  }
}
```

### Update User

Updates a specific user

```endpoint
PUT http://54.69.160.45:8000/v1/users/{userId}
```

#### Example request

```curl
$ curl -X PUT -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d 'password=test12' "http://54.69.160.45:8000/v1/users/1"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/users/1",
  "method": "PUT",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "password": "test12"
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
    "username": "test",
    "email": "test@test.com",
    "firstName": "test",
    "lastName": "test",
    "photo": "",
    "facebookId": "",
    "id": 1,
    "createdAt": "2016-05-23T19:29:28.000Z",
    "updatedAt": "2016-05-30T05:57:18.000Z"
  }
}
```

### Get User Tickets

Gets the logged in user's tickets

```endpoint
GET http://54.69.160.45:8000/v1/tickets/getUserTickets
```

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/tickets/getUserTickets"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/tickets/getUserTickets",
  "method": "GET",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
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
      "id": 5,
      "scanId": "35e955841578853e6",
      "checkIn": false,
      "firstScanTime": "2016-05-29T21:37:12.000Z",
      "lastScanTime": "2016-05-29T21:37:17.000Z",
      "totalScans": 2,
      "ticketType": {
        "name": "General Admission",
        "price": 10
      },
      "event": {
        "title": "MrTikit Launch",
        "startDateTime": "2016-05-30T22:00:00.000Z",
        "endDateTime": "2016-05-31T01:00:00.000Z"
      }
    }
  ]
}
```

### Get User Events

Gets the logged in user's events

```endpoint
GET http://54.69.160.45:8000/v1/management/getEvents
```

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/management/getEvents"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/management/getEvents",
  "method": "GET",
  "headers": {
    "authorization": "JWT {authToken}",
    "cache-control": "no-cache",
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
      "owner": 1,
      "title": "test event",
      "facebookId": null,
      "category": null,
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
      "owner": 1,
      "title": "MrTikit Launch",
      "facebookId": null,
      "category": null,
      "location": "Location",
      "photo": "https://scontent-iad3-1.xx.fbcdn.net/t31.0-8/12823229_10208192269592004_2427574264893653872_o.jpg",
      "startDateTime": "2016-05-30T22:00:00.000Z",
      "endDateTime": "2016-05-31T01:00:00.000Z",
      "checkIn": false,
      "paypalEmail": "eventManager@mrtikit.com",
      "published": true,
      "id": 3,
      "createdAt": "2016-05-29T21:10:15.000Z",
      "updatedAt": "2016-05-30T05:58:12.000Z"
    }
  ]
}
```