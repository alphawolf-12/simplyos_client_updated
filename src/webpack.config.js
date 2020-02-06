let config = {
    'Config': JSON.stringify(process.env.NODE_ENV === 'development' ? {
        serverUrl: "http://localhost:5500/api/"
      } : {
        serverUrl: "http://localhost:5500/api/"
      })
  }
console.log(process.env.NODE_ENV);
module.exports = config;  