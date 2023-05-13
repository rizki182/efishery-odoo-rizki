const axios = require('axios');
const NodeCache = require( "node-cache" );
const cache = new NodeCache( { stdTTL: 3600, checkperiod: 600 } );

module.exports = {
  async index(){
    try{
      console.log("webhook")
      return { "message": "webhook" };
    } catch (err) {
      throw new Error(err);
    }
  }
}