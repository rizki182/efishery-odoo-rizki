const axios = require('axios');
const cache = require("../cache");

module.exports = {
  async update(params){
    try{
      // check cached data
      let cached_list = cache.get("sale_order_list");
      if(cached_list) {
        // parse existing data
        sale_orders = JSON.parse(cached_list);

        // find sale order by incoming id
        for(let index in sale_orders){
          // update cached data
          if(params["id"] == sale_orders[index]["id"]){
            sale_orders[index] = params;
          }
        }

        // save to cache
        cache.set("sale_order_list", JSON.stringify(sale_orders));
      }
      return { "message": "success" };
    } catch (err) {
      throw new Error(err);
    }
  }
}