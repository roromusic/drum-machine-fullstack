const CLIENT_ID = '335931452532-9vnftvee7t5vt875ojccu92jkgbu7ndf.apps.googleusercontent.com',
      GoogleAuth = require('google-auth-library'),
      auth = new GoogleAuth,
      client = new auth.OAuth2(CLIENT_ID, '', '');

exports.ensureCorrectUser = (req, res, next) => {
      var token = req.params.token;
      client.verifyIdToken(
            token,
            CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
            function (e, login) {
                  var payload = login.getPayload();
                  var userid = payload['sub'];
                  // If request specified a G Suite domain:
                  //var domain = payload['hd'];
                  if (payload.aud === CLIENT_ID) {
                        res.locals.payload = payload;
                        next();
                  }else {
                        res.json({message: "unauthorized"})
                  }
            }
      )
}