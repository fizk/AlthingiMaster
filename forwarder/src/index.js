const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET');

    switch (req.method.toLowerCase()) {
        case 'get':
            res.statusCode = 200;
            res.end('heartbeat: OK');
            break;
        case 'post':
        case 'put':
        case 'patch':
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                const response = Buffer.concat(body).toString();
                res.statusCode = 201;
                res.end();
                console.log(response);
            });
            break;
        case 'options':
            res.statusCode = 200;
            res.end();
            break;
    }

});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(process.env.PORT || 8008, () => console.log('server up'));