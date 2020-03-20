### Before Installation
1) create keys.js in api folder and put the following code inside it:

```
module.exports = {
    google: {
        clientID: '<yourGoogleCliendIDkey>',
        clientSecret: '<yourGoogleClientSecretKey>'
    },
    session: {
        cookieKey: 'randomPassword'
    }
}
```

2) create keys.js in frontend folder and put the following code inside it:

```
export default {
    googleMaps: '<YourGoogleMapsKey>'
}
```

### Installation

```
cd api
node app
cd frontend
npm start
```

* the api server is listening on port 3001
* the react app is listening on port 3000

