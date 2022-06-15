node-red-contrib-ftp
========================

[**Japanese**](./README_ja.md)

A Node-RED node to FTP Server.

[![NPM](https://nodei.co/npm/node-red-contrib-ftp.png?downloads=true)](https://nodei.co/npm/node-red-contrib-ftp/)

Pre-requisites
-------

The node-red-contrib-ftp requires <a href="http://nodered.org" target="_new">Node-RED</a> to be installed.


Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-ftp

Restart your Node-RED instance, the ftp node and sftp node appears in the palette and ready for use.


Usage
-------

node-red-contrib-force contains the following modules.

#### ftp node

This node will allow you to LIST, GET, PUT, APPEND, DELETE and MKDIR files on a remote FTP server.

The GET, PUT and APPEND options use msg.filename (the path/name of the file on the remote machine) and msg.localFilename (buffer or the path/name of the file on the local machine - i.e. the one running NR).

The DELETE option only specifies msg.filename (the path/name of the file on the remote machine)

The LIST option returns an array of the file/folders in the user's default ftp folder, containing
type, name, sticky, rights(an object), acl, owner, group, size and date. Also, returns an array of files/folders in a subfolder by specifying msg.filename (the path of the folder on the remote machine).

The MKDIR option only specifies msg.filename (the directory name on the remote machine).

Example
---------

```
[{"id":"91039113.5ae0b8","type":"debug","z":"e052b363.bcca48","name":"","active":true,"console":"false","complete":"payload","x":494,"y":72,"wires":[]},{"id":"ebf6cb8.83c77b8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":114,"y":141,"wires":[["18704d55.fa8d63"]]},{"id":"18704d55.fa8d63","type":"function","z":"e052b363.bcca48","name":"","func":"msg.filename = 'test.csv';\nmsg.localFilename = '/Users/xxx/Desktop/test_remote.csv';\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":141,"wires":[["6f4f3dda.a20a7c"]]},{"id":"6f4f3dda.a20a7c","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"delete","filename":"","localFilename":"","name":"","x":440,"y":143,"wires":[["be82074.47a8878"]]},{"id":"8e30f382.5971f8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":108,"y":67,"wires":[["be82074.47a8878"]]},{"id":"be82074.47a8878","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"list","filename":"","localFilename":"","name":"","x":276,"y":68,"wires":[["91039113.5ae0b8"]]},{"id":"a7676b1a.e9714","type":"ftp","z":"","host":"xxx.xxx.xxx.xxx","port":"21","secureOptions":"","user":"username","connTimeout":"","pasvTimeout":"","keepalive":""}]
```

#### sftp node

This node will allow you to LIST, GET, PUT, APPEND, DELETE and MKDIR files on a remote SFTP server.

The GET, PUT and APPEND options use msg.filename (the path/name of the file on the remote machine) and msg.localFilename (buffer or the path/name of the file on the local machine - i.e. the one running NR).

The DELETE option only specifies msg.filename (the path/name of the file on the remote machine)

LIST options msg.path (Remote directory path) and msg.pattern (A pattern used to filter the items included in the returned array).  Returns an array of listings in the specified sftp directory, containing type, name, size, modifyTime, accessTime, rights(an object), owner and group.

The MKDIR option only specifies msg.filename (the directory name on the remote machine).

Example
---------

```
[{"id":"91039113.5ae0b8","type":"debug","z":"f6ce9dfc.b7e04","name":"","active":true,"tosidebar":true,"console":false,"complete":"payload","statusVal":"","statusType":"auto","x":490,"y":55,"wires":[]},{"id":"ebf6cb8.83c77b8","type":"inject","z":"f6ce9dfc.b7e04","name":"","repeat":"","crontab":"","once":false,"topic":"","payload":"","payloadType":"none","x":110,"y":129,"wires":[["18704d55.fa8d63"]]},{"id":"18704d55.fa8d63","type":"function","z":"f6ce9dfc.b7e04","name":"","func":"msg.filename = 'test.csv';\nmsg.localFilename = '/Users/xxx/Desktop/test_remote.csv';\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":266,"y":129,"wires":[["ace5a559.4976f8"]]},{"id":"8e30f382.5971f8","type":"inject","z":"f6ce9dfc.b7e04","name":"","props":[{"p":"payload","v":"","vt":"str"},{"p":"topic","v":"","vt":"string"}],"repeat":"","crontab":"","once":false,"topic":"","payload":"","payloadType":"str","x":104,"y":55,"wires":[["d4a445a5.67f7b8"]]},{"id":"d4a445a5.67f7b8","type":"sftp in","z":"f6ce9dfc.b7e04","sftp":"4cce8fdd.46c2e","operation":"list","path":"./","pattern":"","filename":"","localFilename":"","name":"","x":267,"y":55,"wires":[["91039113.5ae0b8"]]},{"id":"ace5a559.4976f8","type":"sftp in","z":"f6ce9dfc.b7e04","sftp":"4cce8fdd.46c2e","operation":"delete","path":"","pattern":"","filename":"","localFilename":"","name":"","x":431,"y":129,"wires":[["d4a445a5.67f7b8"]]},{"id":"4cce8fdd.46c2e","type":"sftp","host":"xxx.xxx.xxx.xxx","port":"22","forceIPv4":false,"forceIPv6":false,"username":"username","privateKey":"","readyTimeout":"","strictVendor":true,"debug":"// function - Set this to a function that receives a single \n// string argument to get detailed (local) debug information.","retries":"","retry_factor":"","retry_minTimeout":""}]
```

Acknowledgements
----------------

The node-red-contrib-ftp uses the following open source software:

- [node-ftp](https://github.com/mscdex/node-ftp): node-ftp is an FTP client module for node.js that provides an asynchronous interface for communicating with an FTP server.
- [ssh2-sftp-client](https://github.com/theophilusx/ssh2-sftp-client): ssh2-sftp-client is an SFTP client for node.js, a wrapper around [SSH2](https://github.com/mscdex/ssh2) which provides a high level convenience abstraction as well as a Promise based API.

License
-------

See [license](https://github.com/joeartsea/node-red-contrib-ftp/blob/master/LICENSE) (Apache License Version 2.0).

Contributing
-------

Both submitting issues to [GitHub issues](https://github.com/joeartsea/node-red-contrib-ftp/issues) and Pull requests are welcome to contribute.


Developers
-------

If the developer wants to modify the source of node-red-contrib-ftp, run the following code to create a clone.

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-ftp.git
cd node-red-contrib-ftp
npm install
```
