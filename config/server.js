const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const incidenteRoutes = require('../routes/incidenteRoutes');
//const ubicacionRoutes = require('../routes/ubicacionRoutes');
const comentarioRoutes = require('../routes/comentarioRoutes');
const usuarioRoutes = require('../routes/usuarioRouter');

let httpServer;
const port = process.env.HTTP_PORT || 3000;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    app.use(morgan('combined'));
    app.use(express.json());
    app.use(cors());
    app.use('/incidentes', incidenteRoutes);
    //app.use('/ubicaciones', ubicacionRoutes);
    app.use('/comentarios', comentarioRoutes);
    app.use('/usuarios', usuarioRoutes);

    httpServer.listen(port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Servidor web escuchando en localhost:${port}`);

      resolve();
    });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.initialize = initialize;
module.exports.close = close;