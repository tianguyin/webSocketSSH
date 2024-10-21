// server.js
const express = require('express');
const WebSocket = require('ws');
const { Client } = require('ssh2');

const app = express();
const wss = new WebSocket.Server({ noServer: true });

const server = app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  let conn = null;

  ws.on('message', (message) => {
    const { operate, host, port, username, password, command } = JSON.parse(message);

    if (operate === 'connect') {
      conn = new Client();
      conn.on('ready', () => {
        conn.shell((err, stream) => {
          if (err) return ws.send(JSON.stringify({ type: 'error', data: err.message }));

          stream.on('data', (data) => {
            ws.send(data.toString());
          });

          ws.on('message', (msg) => {
            const command = JSON.parse(msg).command;
            stream.write(command);
          });

          stream.on('close', () => {
            conn.end();
          });
        });
      }).connect({ host, port, username, password });
    }
  });

  ws.on('close', () => {
    if (conn) conn.end();
  });
});
