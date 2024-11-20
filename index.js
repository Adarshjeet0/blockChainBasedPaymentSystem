// import express from 'express'
// import bodyParser from 'body-parser';
// import {userRouter} from './src/features/users/user.routes.js';

// const server = express();

// server.use(bodyParser.json());
// server.use('/api/users', userRouter);



// server.get('/', (req, res)=>{
//     res.send("Welcome to My new Project: BlockChain based payment System");
// });


// export default server;

import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();

// 1. Creating server using http.
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:["GET", "POST"]
    }
});

// 3. Use socket events.

io.on('connect', (socket)=>{
    console.log("Connection is established");

    socket.on('disconnect', ()=>{
        console.log("Connection is disconnected");
    })
});

export default server;
