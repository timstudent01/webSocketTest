const WebSocket = require('ws');
const chalk = require('chalk');
const e = require("express");


// const generateUniqueId = ()=>{
//     return `${Math.ceil(Math.random()*1000)}`
// }

const handleWebSocket = (clients)=> {

    const wss = new WebSocket.WebSocketServer({port:4060})

    wss.on('connection', (ws)=>{

        console.log(`${chalk.green(`Server WebSocket 已建立 :`)}${chalk.bgBlue.white('ws://localhost:4060')}`)

        /** 接收訊息 **/
        ws.on('message',(data)=>{
            const q = JSON.parse(data);

            if (q.action === "login") {
                clients.set(q.id , ws)
                console.log(`接收到的id: ${chalk.green(q.id)}, 接收到的類別: ${chalk.green(q.action)}, 接收到的訊息: ${chalk.red(q.name)}`)
            }
            // if (clients.get(q.id) !== undefined) {
            //     console.log(clients.keys((key)=>{
            //         console.log(key);
            //     }));
            // }
        })
    })

    return wss;
}



module.exports = handleWebSocket;


