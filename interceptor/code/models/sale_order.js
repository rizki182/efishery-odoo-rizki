require('dotenv').config();
const axios = require('axios');
const cache = require("../cache");

module.exports = {
  async index(){
    try{
      // final response
      let response

      // check cached data
      let cached_list = cache.get("sale_order_list");
      if ( cached_list == undefined ){
        // fetch data from odoo if cache is empty
        const res = await axios.get('http://web:'+process.env.ODOO_PORT+'/custom_api/sales_order',{
          headers: {
            "API-KEY": process.env.ODOO_API_KEY
          }
        });

        // save to cache
        cache.set("sale_order_list", JSON.stringify(res.data));

        // set final response
        response = res.data;
        console.log("from api");
      } else {
        // set final response
        response = JSON.parse(cached_list);
        console.log("from cache");
      }


      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  async detail(id){
    try{
      // fetch data from API
      const response = await axios.get('http://web:'+process.env.ODOO_PORT+'/custom_api/sales_order/detail?id='+id,{
        headers: {
          "API-KEY": process.env.ODOO_API_KEY
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  async create(params){
    try{
      // fetch data from API
      const response = await axios.post('http://web:'+process.env.ODOO_PORT+'/custom_api/sales_order',
      {
        "params": params
      },
      {
        headers: {
          "API-KEY": process.env.ODOO_API_KEY
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async update(id, params){
    try{
      params["id"] = parseInt(id);
      console.log(params)
      // fetch data from API
      const response = await axios.put('http://web:'+process.env.ODOO_PORT+'/custom_api/sales_order',
      {
        "params": params
      },
      {
        headers: {
          "API-KEY": process.env.ODOO_API_KEY
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}