/**
 * Copyright 2015 Atsushi Kojo.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

 module.exports = function (RED) {
  'use strict';
  var ftp = require('ftp');
  var fs = require('fs');

  function FtpNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;
    var credentials = RED.nodes.getCredentials(n.id);
    this.options = {
      'host': n.host || 'localhost',
      'port': n.port || 21,
      'secure': n.secure || false,
      'secureOptions': n.secureOptions,
      'user': n.user || 'anonymous',
      'password': credentials.password || 'anonymous@',
      'connTimeout': n.connTimeout || 10000,
      'pasvTimeout': n.pasvTimeout || 10000,
      'keepalive': n.keepalive || 10000
    };
  }

  RED.nodes.registerType('ftp', FtpNode, {
    credentials: {
      password: { type: 'password' }
    }
  });

  function FtpInNode(n) {
    RED.nodes.createNode(this, n);
    this.ftp = n.ftp;
    this.operation = n.operation;
    this.filename = n.filename;
    this.localFilename = n.localFilename;
    this.ftpConfig = RED.nodes.getNode(this.ftp);

    if (this.ftpConfig) {
      var node = this;
      node.on('input', function (msg) {
        var conn = new ftp();
        var filename = node.filename || msg.filename || '';
        var localFilename = node.localFilename || msg.localFilename || '';

        this.sendMsg = function (err, result) {
          if (err) {
            conn.end();
            node.error(err, msg);
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
            return;
          }
          node.status({});
          if (node.operation == 'get') {
            result.once('close', function() { conn.end(); });
            result.pipe(fs.createWriteStream(localFilename));
            msg.payload = 'Get operation successful. ' + localFilename;
          } else if (node.operation == 'put') {
            conn.end();
            msg.payload = 'Put operation successful.';
          } else if (node.operation == 'append') {
            conn.end();
            msg.payload = 'Append operation successful.';
          } else if (node.operation == 'mkdir') {
            conn.end();
            msg.payload = 'mkdir operation successful.';
          } else {
            conn.end();
            msg.payload = result;
          }
          msg.filename = filename;
          msg.localFilename = localFilename;
          node.send(msg);
        };
        conn.on('ready', function () {
          switch (node.operation) {
            case 'list':
              conn.list(filename, node.sendMsg);
              break;
            case 'get':
              conn.get(filename, node.sendMsg);
              break;
            case 'put':
              conn.put(localFilename, filename, node.sendMsg);
              break;
            case 'append':
              conn.append(localFilename, filename, node.sendMsg);
              break;
            case 'delete':
              conn.delete(filename, node.sendMsg);
              break;
            case 'mkdir':
              conn.mkdir(filename, true, node.sendMsg);
              break;
            }
        });
        conn.on('error', function(err) {
          node.error(err, msg);
          node.status({ fill: 'red', shape: 'ring', text: err.message });
          return;
        });
        conn.connect(node.ftpConfig.options);
      });
    } else {
      this.error('missing ftp configuration');
    }
  }
  RED.nodes.registerType('ftp in', FtpInNode);
}
