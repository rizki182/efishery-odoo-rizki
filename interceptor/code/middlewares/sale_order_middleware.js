require('dotenv').config();
const express = require("express");
const auth_helper = require('../helpers/auth_helper');
const router = express.Router();

router.get("/", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

router.get("/:id", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

router.post("/", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

router.put("/:id", (req, res, next) => {
    if(auth_helper.validate(req.headers)){
        next();
    } else {
        res.status(401).json({"error": "unauthorized"});
    }
});

module.exports = router;