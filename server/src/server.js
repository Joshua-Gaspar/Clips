const http = require('http');
const app = require('./app');

const {mongoConnect} =require('./services/mongo');

// Port Number
const PORT = process.env.PORT || 8000;

//Create server
const server = http.createServer(app);

// Start Server
async function startServer(){
    await mongoConnect();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}


startServer();


