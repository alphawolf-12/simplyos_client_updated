let config = {
    'Config': JSON.stringify(process.env.NODE_ENV === 'dev' ? {
        serverUrl: "http://localhost:5500/"
      } : {
        serverUrl: "https://simplyopensource.in:5000/"  
      })
  }
  
module.exports = config;  