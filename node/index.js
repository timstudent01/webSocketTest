/* env */
require('dotenv').config({ path: '.env.develop' });
/* packages */
const chalk = require('chalk');

/* config */
const cors = require('cors');
const {clients} = require('./src/config/config');
const {RESPONSE_STATUS} = require('./src/config/config');
/* function */
const handleWebSocket = require('./src/function/handleWebSocket');
/* express */
const express = require("express");
const app = express();

/* routes */
const test = require("./src/routes/test/test");
const sendMessage = require("./src/routes/sendMessage/sendMessage")
const newData = require("./src/routes/newData/newData")

/* listen */
const port = process.env.PORT


/* 應用級別 中間件 */
app.use(express.json());
/** cors **/
app.use(cors());
// app.use((req,res,next)=>{
//     console.log("token");
//     next();
// })

app.use("/test",test);
app.use("/sendMessage",sendMessage);
app.use("/newData",newData)

/* 404 */
app.use((req,res)=>{
    res.status(RESPONSE_STATUS.NOT_FOUND).send({message:"Not Found"})
})

/* 建立 webSocket */

handleWebSocket(clients);


/* 監聽 server */
app.listen(port,()=>{
    console.log(`${chalk.blue(`server start at `)}${chalk.green(port)}`);
})
