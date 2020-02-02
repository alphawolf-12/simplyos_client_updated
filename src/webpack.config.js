let config = {
    'Config': JSON.stringify(process.env.NODE_ENV === 'development' ? {
        serverUrl: "https://simplyopensource.in:5000/"
      } : {
        serverUrl: "https://simplyopensource.in:5000/"  
      })
  }
console.log(process.env.NODE_ENV);
module.exports = config;  