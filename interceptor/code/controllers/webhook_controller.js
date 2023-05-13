const webhook_model = require("../models/webhook");

module.exports = {
    async create(req, res){
        try{
            let data = await webhook_model.create(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    },
    
    async update(req, res){
        try{
            let data = await webhook_model.update(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    },

    async delete(req, res){
        try{
            let data = await webhook_model.delete(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    }
}