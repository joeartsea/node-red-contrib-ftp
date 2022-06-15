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
  var sftp = require('ssh2-sftp-client');
  var fs = require('fs');

  function SftpNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;
    var credentials = RED.nodes.getCredentials(n.id);
    this.options = {
      'host': n.host || 'localhost',
      'port': n.port || 22,
      'forceIPv4': n.forceIPv4 || false,
      'forceIPv6': n.forceIPv6 || false,
      'username': n.username || 'anonymous',
      'password': this.credentials.password || '',
      'privateKey': n.privateKey && fs.readFileSync(n.privateKey) || '',
      'passphrase': this.credentials.passphrase || '',
      'agent': this.credentials.agent || '',
      'readyTimeout': n.readyTimeout || 20000,
      'strictVendor': n.strictVendor || true,
      'debug': new Function(n.debug) || '',
      'retries': n.retries || 2,
      'retry_factor': n.retry_factor || 2,
      'retry_minTimeout': n.retry_minTimeout || 2000
    };
  }

  RED.nodes.registerType('sftp', SftpNode, {
    credentials: {
      password: { type: 'password' },
      passphrase: { type: 'password' },
      agent: { type: 'text' }
    }
  });

  function SftpInNode(n) {
    RED.nodes.createNode(this, n);
    this.sftp = n.sftp;
    this.operation = n.operation;
    this.path = n.path;
    this.pattern = n.pattern;
    this.filename = n.filename;
    this.localFilename = n.localFilename;
    this.sftpConfig = RED.nodes.getNode(this.sftp);

    if (this.sftpConfig) {
      var node = this;
      node.on('input', function (msg) {
        var conn = new sftp();
        var path = node.path || msg.path || './';
        var pattern = node.pattern || msg.pattern || '';
        var filename = node.filename || msg.filename || '';
        var localFilename = node.localFilename || msg.localFilename || '';

        this.sendMsg = function (err, result) {
          if (err) {
            node.error(err, msg);
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
            return;
          }
          node.status({});
          if (node.operation == 'get') {
            msg.payload = 'Get operation successful. ' + localFilename;
          } else if (node.operation == 'append') {
            msg.payload = 'Append operation successful. ' + filename;
          } else {
            msg.payload = result;
          }

          msg.path = path;
          msg.pattern = pattern;
          msg.filename = filename;
          msg.localFilename = localFilename;
          node.send(msg);
        };

        conn.connect(node.sftpConfig.options)
          .then(() => {
            switch (node.operation) {
              case 'list':
                return conn.list(path, pattern);
                break;
              case 'get':
                return conn.get(filename, localFilename);
                break;
              case 'put':
                return conn.put(localFilename, filename);
                break;
              case 'append':
                var input = '';
                if (typeof localFilename === 'string') {
                  input = fs.createReadStream(localFilename);
                } else {
                  input = localFilename;
                }
                return conn.append(input, filename);
                break;
              case 'delete':
                return conn.delete(filename, node.sendMsg);
                break;
              case 'mkdir':
                return conn.mkdir(path, true);
                break;
              }
          })
          .then((data) => {
            conn.end();
            node.sendMsg('', data);
          })
          .catch(err => {
            if (conn.sftp) conn.end();
            node.error(err, msg);
            node.status({ fill: 'red', shape: 'ring', text: err.message });
            return;
          });
      });
    } else {
      this.error('missing sftp configuration');
    }
  }
  RED.nodes.registerType('sftp in', SftpInNode);
}
