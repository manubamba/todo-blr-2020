const http = require("http");

http
  .createServer((req, res) => {
    res.write("Hello World!"); //write a response
    res.end(); //end the response
  })
  .listen(3000, () => {
    console.log("server start at port 3000"); //the server object listens on port 3000
  });
