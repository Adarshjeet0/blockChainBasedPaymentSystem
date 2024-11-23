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
import {transactionRouter} from './src/features/transaction/transaction.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
// import cors from 'cors';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use('/api/user',userRouter);
server.use('/api/transaction',jwtAuth, transactionRouter);

export default server;
