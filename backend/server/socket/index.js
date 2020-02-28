var socketServer = {};
socketServer.init = function(server) {
  socketServer.io = require("socket.io").listen(server);
  socketServer.io.set("origins", "*:*");

  socketServer.io.on("connection", socket => {
    console.log("connected!!!!");
    socket.on("SET_USERID", data => {});

    socket.on("SEND_NEW_MESSAGE", data => {
      if (data.from == socket.userId) {
        SocketService.saveNewMessage(data);
      }
      for (let key in socketServer.io.sockets.sockets) {
        if (socketServer.io.sockets.sockets.hasOwnProperty(key)) {
          if (data.to == socketServer.io.sockets.sockets[key].userId) {
            socketServer.io.sockets.sockets[key].emit("RECEIVE_NEW_MESSAGE", {
              ListingId: data.ListingId,
              Sender: data.from,
              Recipient: data.to,
              content: data.message,
              isRead: false,
              time: data.time
            });
          }
        }
      }
    });

    socket.on("SEND_GET_ONLINE_STATUS_REQUEST", data => {
      let isOnline = false;

      for (let key in socketServer.io.sockets.sockets) {
        if (socketServer.io.sockets.sockets.hasOwnProperty(key)) {
          if (data.opponentId == socketServer.io.sockets.sockets[key].userId) {
            isOnline = true;
          }
        }
      }

      socket.emit("GET_ONLINE_STATUS", { status: isOnline });
    });

    socket.on("SEND_GET_ONLINE_STATUS_ARRAY_REQUEST", data => {
      let isOnline = [];
      for (let key in socketServer.io.sockets.sockets) {
        if (socketServer.io.sockets.sockets.hasOwnProperty(key)) {
          isOnline[socketServer.io.sockets.sockets[key].userId] = true;
        }
      }
      let result = [];
      for (let item of data) {
        if (isOnline[item] == true) {
          result.push({ UserId: item, status: true });
        } else {
          result.push({ UserId: item, status: false });
        }
      }
      socket.emit("GET_ONLINE_STATUS_ARRAY", result);
    });
  });
};

module.exports = {
  socketServer
};
