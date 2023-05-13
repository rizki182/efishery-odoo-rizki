const webhook_model = require("../models/webhook");

module.exports = {
    async update(req, res){
        try{
            let data = await webhook_model.index(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    }
}