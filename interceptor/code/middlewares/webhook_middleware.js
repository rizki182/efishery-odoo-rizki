require('dotenv').config();
const express = require("express");
const auth_helper = require('../helpers/auth_helper');
const router = express.Router();

router.post("/create", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

router.post("/update", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

router.post("/delete", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

module.exports = router;