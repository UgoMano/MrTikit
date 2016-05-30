### Ping Server

Ping a server to see if it is working

```endpoint
GET http://54.69.160.45:8000/v1/ping

#### Example request

```curl
$ curl -X GET -H "Authorization: JWT {authToken}" -H "Cache-Control: no-cache" "http://54.69.160.45:8000/v1/ping"
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://54.69.160.45:8000/v1/ping",
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
  "code": "OK",
  "message": "HTTP server is working",
  "data": {}
}
```