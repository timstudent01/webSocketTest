const express = require("express");
const {RESPONSE_STATUS} = require("../../config/config");
const {clients} = require("../../config/config")
const router = express.Router();

router.get("/",(req,res)=>{
    const time = +new Date();

    console.log('time',time);
    res.status(RESPONSE_STATUS.OK).json({message:`${time}`});
});

module.exports = router
