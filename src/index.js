const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const common = require('./libs/common');

const port = 3000;

app.use('/', express.static('public'));

// データ取得
io.on('connection', (socket) => {
  socket.on('videoimg', async (data) => {
    // 画像保存
    const result = await common.saveImg(data);
    // 画像保存の成否をクライアント側に送信
    result ? io.emit('msg', '保存しました') : io.emit('msg', '保存に失敗しました');
  });
});

// ポート開設
http.listen(port, () => console.log(`Listening on port: ${port}`));
