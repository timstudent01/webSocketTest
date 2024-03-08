const express = require("express");
const {RESPONSE_STATUS} = require("../../config/config");

const router = express.Router();

router.get("/",(req,res)=>{
    res.status(RESPONSE_STATUS.OK).json({message:"test get"});
});

router.post("/",(req,res)=>{
    const {id} = req.body;
    console.log(id);
    res.status(RESPONSE_STATUS.OK).json({message:"test get"});
});

module.exports = router
