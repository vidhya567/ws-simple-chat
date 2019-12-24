const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const messages = [];
wss.on("connection", function connection(ws, request, client) {
  function broadcast(data) {
    console.log("data", data);
    wss.clients.forEach(function each(client) {
      if (client.readyState == WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  if (messages.length > 0) {
    broadcast(messages);
  }

  ws.on("message", function incoming(message) {
    console.log("received: %s", message, client);
    messages.push(JSON.parse(message));
    broadcast(messages);
  });

  ws.on("open", function open() {
    console.log("SERVER OPEN");
  });

  ws.on("close", function close() {
    console.log("SERVER CLOSING");
  });

  ws.on("error", function error(err) {
    console.log("SERVER ERROR", err);
  });
});
