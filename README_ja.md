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

Node-REDインスタンスを再起動すると、パレットにftpノードが表示されて使用可能になります。

使用方法
-------

このノードを使用すると、リモートFTPサーバー上のファイルをLIST取得、GET、PUT、およびDELETEできます。

GETおよびPUTオプションは、msg.filename（リモートマシン上のファイルのパス/名前）およびmsg.localFilename（ローカルマシン上のファイルのパス/名前 - NRを実行している場所）を指定します。

DELETEオプションは、msg.filename（リモートマシン上のファイルのパス/名前）のみを指定します。

LISTオプションは、タイプ、名前、sticky、権限（オブジェクト）、acl、所有者、グループ、サイズ、および日付を含む、ユーザーのデフォルトftpフォルダー内のファイル/フォルダーの配列を返します。


例
---------

```
[{"id":"91039113.5ae0b8","type":"debug","z":"e052b363.bcca48","name":"","active":true,"console":"false","complete":"payload","x":494,"y":72,"wires":[]},{"id":"ebf6cb8.83c77b8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":114,"y":141,"wires":[["18704d55.fa8d63"]]},{"id":"18704d55.fa8d63","type":"function","z":"e052b363.bcca48","name":"","func":"msg.filename = 'test.csv';\nmsg.localFilename = '/Users/xxx/Desktop/test_remote.csv';\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":141,"wires":[["6f4f3dda.a20a7c"]]},{"id":"6f4f3dda.a20a7c","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"delete","filename":"","localFilename":"","name":"","x":440,"y":143,"wires":[["be82074.47a8878"]]},{"id":"8e30f382.5971f8","type":"inject","z":"e052b363.bcca48","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":108,"y":67,"wires":[["be82074.47a8878"]]},{"id":"be82074.47a8878","type":"ftp in","z":"e052b363.bcca48","ftp":"a7676b1a.e9714","operation":"list","filename":"","localFilename":"","name":"","x":276,"y":68,"wires":[["91039113.5ae0b8"]]},{"id":"a7676b1a.e9714","type":"ftp","z":"","host":"xxx.xxx.xxx.xxx","port":"21","secureOptions":"","user":"username","connTimeout":"","pasvTimeout":"","keepalive":""}]
```

謝辞
----------------

node-red-contrib-ftpは、次のオープンソースソフトウェアを使用します:

- [node-ftp](https://github.com/mscdex/node-ftp): node-ftpはnode.jsのFTPクライアントモジュールで、FTPサーバーと通信するための非同期インターフェイスを提供します。


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
