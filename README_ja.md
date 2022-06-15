node-red-contrib-ftp
========================

node-red-contrib-ftpは、FTPサーバーへのNode-REDノードです。

[![NPM](https://nodei.co/npm/node-red-contrib-ftp.png?downloads=true)](https://nodei.co/npm/node-red-contrib-ftp/)


前提条件
-------

node-red-contrib-ftpは、<a href="http://nodered.org" target="_new">Node-RED</a>のインストールが必要です。

インストール
-------

Node-REDをインストールしたルートディレクトリで以下のコマンドを実行します。

    npm install node-red-contrib-ftp

Node-REDインスタンスを再起動すると、パレットにftpノード、sftpノードが表示されて使用可能になります。

使用方法
-------

node-red-contrib-ftpは、次のモジュールを含んでいます。

#### ftp ノード

このノードを使用すると、リモートFTPサーバー上のファイルをLIST取得、GET、PUT、APPEND、DELETEおよびMKDIRできます。

GET、PUTおよびAPPENDオプションは、msg.filename（リモートマシン上のファイルのパス/名前）およびmsg.localFilename（バッファ、またはローカルマシン上のファイルのパス/名前 - NRを実行している場所）を指定します。

DELETEオプションは、msg.filename（リモートマシン上のファイルのパス/名前）のみを指定します。

LISTオプションは、タイプ、名前、sticky、権限（オブジェクト）、acl、所有者、グループ、サイズ、および日付を含む、ユーザーのデフォルトftpフォルダー内のファイル/フォルダーの配列を返します。また、msg.filename（リモートマシン上のフォルダーのパス）を指定することで、サブフォルダー内のファイル/フォルダーの配列を返します。

MKDIRオプションは、msg.filename（リモートマシン上のディレクトリ名）のみを指定します。

例
---------

```
[{"id":"91039113.5ae0b8","type":"debug","z":"e052b363.bcca48","name":"","active":true,"console":"false","complete":"payload","x":494,"y":72,"wires":[]},{"id":"ebf6cb8.83c77b8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":114,"y":141,"wires":[["18704d55.fa8d63"]]},{"id":"18704d55.fa8d63","type":"function","z":"e052b363.bcca48","name":"","func":"msg.filename = 'test.csv';\nmsg.localFilename = '/Users/xxx/Desktop/test_remote.csv';\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":141,"wires":[["6f4f3dda.a20a7c"]]},{"id":"6f4f3dda.a20a7c","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"delete","filename":"","localFilename":"","name":"","x":440,"y":143,"wires":[["be82074.47a8878"]]},{"id":"8e30f382.5971f8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":108,"y":67,"wires":[["be82074.47a8878"]]},{"id":"be82074.47a8878","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"list","filename":"","localFilename":"","name":"","x":276,"y":68,"wires":[["91039113.5ae0b8"]]},{"id":"a7676b1a.e9714","type":"ftp","z":"","host":"xxx.xxx.xxx.xxx","port":"21","secureOptions":"","user":"username","connTimeout":"","pasvTimeout":"","keepalive":""}]
```

#### sftp ノード

このノードを使用すると、リモートSFTPサーバー上のファイルをLIST取得、GET、PUT、APPEND、DELETEおよびMKDIRできます。

GET、PUTおよびAPPENDオプションは、msg.filename（リモートマシン上のファイルのパス/名前）およびmsg.localFilename（バッファ、ローカルマシン上のファイルのパス/名前 - NRを実行している場所）を指定します。

DELETEオプションは、msg.filename（リモートマシン上のファイルのパス/名前）のみを指定します。

LISTオプションは、msg.path（リモートSFTPサーバー上のディレクトリのパス）およびmsg.pattern（取得する配列に含まれる項目を絞り込むために使用するパターン）を指定します。タイプ、名前、サイズ、修正時間、アクセス時間、権限（オブジェクト）、所有者、およびグループを含む、指定したsftpディレクトリ内リストの配列を返します。

MKDIRオプションは、msg.path（リモートマシン上のディレクトリ名）のみを指定します。

例
---------

```
[{"id":"91039113.5ae0b8","type":"debug","z":"f6ce9dfc.b7e04","name":"","active":true,"tosidebar":true,"console":false,"complete":"payload","statusVal":"","statusType":"auto","x":490,"y":55,"wires":[]},{"id":"ebf6cb8.83c77b8","type":"inject","z":"f6ce9dfc.b7e04","name":"","repeat":"","crontab":"","once":false,"topic":"","payload":"","payloadType":"none","x":110,"y":129,"wires":[["18704d55.fa8d63"]]},{"id":"18704d55.fa8d63","type":"function","z":"f6ce9dfc.b7e04","name":"","func":"msg.filename = 'test.csv';\nmsg.localFilename = '/Users/xxx/Desktop/test_remote.csv';\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":266,"y":129,"wires":[["ace5a559.4976f8"]]},{"id":"8e30f382.5971f8","type":"inject","z":"f6ce9dfc.b7e04","name":"","props":[{"p":"payload","v":"","vt":"str"},{"p":"topic","v":"","vt":"string"}],"repeat":"","crontab":"","once":false,"topic":"","payload":"","payloadType":"str","x":104,"y":55,"wires":[["d4a445a5.67f7b8"]]},{"id":"d4a445a5.67f7b8","type":"sftp in","z":"f6ce9dfc.b7e04","sftp":"4cce8fdd.46c2e","operation":"list","path":"./","pattern":"","filename":"","localFilename":"","name":"","x":267,"y":55,"wires":[["91039113.5ae0b8"]]},{"id":"ace5a559.4976f8","type":"sftp in","z":"f6ce9dfc.b7e04","sftp":"4cce8fdd.46c2e","operation":"delete","path":"","pattern":"","filename":"","localFilename":"","name":"","x":431,"y":129,"wires":[["d4a445a5.67f7b8"]]},{"id":"4cce8fdd.46c2e","type":"sftp","host":"xxx.xxx.xxx.xxx","port":"22","forceIPv4":false,"forceIPv6":false,"username":"username","privateKey":"","readyTimeout":"","strictVendor":true,"debug":"// function - Set this to a function that receives a single \n// string argument to get detailed (local) debug information.","retries":"","retry_factor":"","retry_minTimeout":""}]
```

謝辞
----------------

node-red-contrib-ftpは、次のオープンソースソフトウェアを使用します:

- [node-ftp](https://github.com/mscdex/node-ftp): node-ftpはnode.jsのFTPクライアントモジュールで、FTPサーバーと通信するための非同期インターフェイスを提供します。
- [ssh2-sftp-client](https://github.com/theophilusx/ssh2-sftp-client): ssh2-sftp-clientはnode.js用のSFTPクライアントです。[SSH2](https://github.com/mscdex/ssh2)のラッパーで、PromiseベースのAPIと同様に、高いレベルの利便性を抽象化して提供します。

ライセンス
-------

こちらを参照してください。 [license](https://github.com/joeartsea/node-red-contrib-ftp/blob/master/LICENSE) (Apache License Version 2.0).

貢献
-------

[GitHub issues](https://github.com/joeartsea/node-red-contrib-ftp/issues)への問題提起、Pull requestsのどちらもあなたの貢献を歓迎します。


開発者
-------

開発者がnode-red-contrib-ftpのソースを改変する場合、以下のコードを実行してクローンを作成します。

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-ftp.git
cd node-red-contrib-ftp
npm install
```
