require('dotenv').config();


const http = require('http');

const app = require('./app');


// Creating (Initialize) Server
const server = http.createServer(app);



const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(` Server listening on ${port} on ` + Date(new Date()));

});

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});

module.exports = server;