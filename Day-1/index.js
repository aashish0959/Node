// cordmodiyul
const http = require("http");
const Port = 2405;

const PorHandler = ( req , res) => {
  res.write("<h1>Server staring</h1>");
  res.end();
};

const server = http.createServer(PorHandler);
server.listen(Port, (err) => {
  err ? console.log(err) : console.log("server started on port :" + Port);
});

 