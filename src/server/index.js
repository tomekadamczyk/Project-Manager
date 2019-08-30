const express = require('express');
const cors = require('cors');
const graphHTTP = require('express-graphql');
const mysql = require('mysql');
const PORT = 4000;
const schema = require('./schema');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
const getUser = require('./schema');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payloay received', jwt_payload);
    let user = getUser({id: jwt_payload.id})
    if(user) {
        next(null, user)
    }
    else {
        next(null, false)
    }
})
passport.use(strategy)

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'manager',
    password: 'manager',
    database: 'project-manager'
});

const app = express();
app.use(cors());

app.use('/graphql', graphHTTP({
    schema: schema,
    graphiql: true
}))

app.use(passport.initialize());

app.post('/login', async function(req, res, next) { 
    const { name, password } = req.body;
    if (name && password) {
      // we get the user with the name and save the resolved promise
      returned
      let user = await getUser({ name });
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
     if (user.password === password) {
        // from now on we’ll identify the user by the id and the id is// the only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
  });


connection.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.listen(PORT, () => {
    console.log('PM app is listening on port ' + PORT);
})
