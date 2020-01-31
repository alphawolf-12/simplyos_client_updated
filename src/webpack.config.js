let config = {
    'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
        serverUrl: "https://simplyopensource.in:5000/"
      } : {
        serverUrl: "http://localhost:5500/"
      })
  }
  
module.exports = config;  