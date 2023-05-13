const axios = require('axios');
const NodeCache = require( "node-cache" );
const cache = new NodeCache( { stdTTL: 3600, checkperiod: 600 } );

module.exports = {
  async index(){
    try{
      // fetch data from API
      const response = await axios.get('http://web:8069/custom_api/sales_order',{
        headers: {
          "API-KEY": "25b2b4378ad81a58b422247da757eedebcd15252"
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  async detail(id){
    try{
      // fetch data from API
      const response = await axios.get('http://web:8069/custom_api/sales_order/detail?id='+id,{
        headers: {
          "API-KEY": "25b2b4378ad81a58b422247da757eedebcd15252"
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
      const response = await axios.post('http://web:8069/custom_api/sales_order',
      {
        "params": params
      },
      {
        headers: {
          "API-KEY": "25b2b4378ad81a58b422247da757eedebcd15252"
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
      const response = await axios.put('http://web:8069/custom_api/sales_order',
      {
        "params": params
      },
      {
        headers: {
          "API-KEY": "25b2b4378ad81a58b422247da757eedebcd15252"
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}