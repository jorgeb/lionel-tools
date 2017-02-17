var server = require('node-http-server');

console.log(server);

server.deploy(
    {
        verbose: true,
        port: 8010,
        root: __dirname + '/src/'
    }
);