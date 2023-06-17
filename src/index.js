const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const common = require('./libs/common')

const port = 3000
const picdir = 'pictures'

app.use('/', express.static('public'))

// データ取得
io.on('connection', (socket) => {
    socket.on('videoimg', (data) => { saveImg(data) })
})

// 画像を保存
const saveImg = (data) => {
    const base64 = data.img.split(",")[1]  // imgの中身は0番目に保存形式などの基本情報、1番目に画像のデータがある
    const decode = new Buffer.from(base64, 'base64')
    // 画像保存用のディレクトリがなければ作成
    common.mkDir(picdir)
    // 年-月-日T時分秒.jpgで画像書込
    const date = common.getNow()
    fs.writeFile(`${picdir}/${date}.jpg`, decode, (err) => {
        // 画像保存の成否をクライアント側に送信
        if (err) {
            console.log(err)
            io.emit('msg', '保存に失敗しました')
        }
        else {
            console.log(`save image: ${date}.jpg`)
            io.emit('msg', '保存しました')
        }
    })
};

// ポート開設
http.listen(port, () => console.log(`Listening on port: ${port}`))