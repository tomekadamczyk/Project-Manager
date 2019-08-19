const express = require('express');
const cors = require('cors');
const graphHTTP = require('express-graphql');
const mysql = require('mysql');
const PORT = 4000;
const schema = require('./schema');

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

connection.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.listen(PORT, () => {
    console.log('PM app is listening on port ' + PORT);
})
