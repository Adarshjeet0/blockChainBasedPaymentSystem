import server from './index.js';
import {connectUsingMongoose} from './src/config/mongooseConfig.js';


server.listen(3000, ()=>{
    console.log("Server is listening on port: 3000");
    connectUsingMongoose();
})