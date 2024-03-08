const express = require("express");
const {RESPONSE_STATUS} = require("../../config/config");
const {clients} = require("../../config/config")
const router = express.Router();

const sendDataToClient = (clientId,message) => {
    const ws = clients.get(clientId);
    if (ws) {
        ws.send(JSON.stringify(message));
        console.log(`已傳送「${message.type}」類訊息:「${message.message}」給「${message.id}」,時間: ${+new Date()}`)
    } else {
        console.log(`${clientId} 不存在`)
        console.log(`目前clients:${clients}`)
    }
}


router.post("/",(req,res)=>{
    const data   = req.body;
    console.log(data);

    sendDataToClient(data.id, data);

    res.status(RESPONSE_STATUS.OK).json({message:"test sendMessage"});
});

module.exports = router
