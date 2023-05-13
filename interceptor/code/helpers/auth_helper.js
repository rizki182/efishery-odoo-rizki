require('dotenv').config();

module.exports = {
  validate(headers){
    if(headers["api-key"] && headers["api-key"] === process.env.API_KEY){
        return true;
    } else {
        return false;
    }
  }
}