const sale_order_model = require("../models/sale_order");

module.exports = {
    async index(req, res){
        try{
            let data = await sale_order_model.index();
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    },
    
    async detail(req, res){
        try{
            let data = await sale_order_model.detail(req.params["id"]);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    },
    
    async create(req, res){
        try{
            let data = await sale_order_model.create(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({"error": "Something's wrong"});
        }
    }
}