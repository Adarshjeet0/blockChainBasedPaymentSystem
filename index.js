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
import bodyParser from 'body-parser';
import {userRouter} from './src/features/users/user.routes.js';
// import cors from 'cors';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use('/api/user',userRouter);

export default server;
