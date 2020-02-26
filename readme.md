### Before Installation
1) create keys.js in api folder and put the following code inside it:

```
module.exports = {
    google: {
        clientID: '1071787955011-l61vj7kidge2h44p683phgp8b1smvhol.apps.googleusercontent.com',
        clientSecret: 'kXczAtCqyCzlDC44Fu6K97DX'
    },
    session: {
        cookieKey: 'randomPassword'
    }
}
```

2) create keys.js in frontend folder and put the following code inside it:

```
export default {
    googleMaps: 'AIzaSyCvFrGxeLjEHl7V3Vyox1M6Aq4vxL-xkTU'
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

