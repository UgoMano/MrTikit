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
    "postman-token": "54e8add3-84d7-9750-264e-b55ba8045b55",
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

### List Users

Lists all Users.

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