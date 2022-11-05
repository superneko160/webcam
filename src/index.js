const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const port = 3000

app.use('/', express.static('public'))

// データ取得
io.on('connection', (socket) => {
    socket.on('videoimg', (data) => { saveImg(data) })
})

// 画像を保存
const saveImg = (data) => {
    const base64 = data.img.split(",")[1]  // imgの中身は0番目に保存形式などの基本情報、1番目に画像のデータがある
    const decode = new Buffer.from(base64, 'base64')
    const date = getNow()
    // 年-月-日T時分秒.jpgで画像書込
    fs.writeFile(`picture/${date}.jpg`, decode, (err) => {
        if (err) {
            console.log(err)
            io.emit('msg', '保存に失敗しました')
        }
        else{
            console.log(`save image: ${date}.jpg`)
            io.emit('msg', '保存しました')
        }
    })
};

// 時間取得（年-月-日T時分秒）
const getNow = () => {
    let dt = new Date(),
    y = dt.getFullYear(),
    m = ('00' + (dt.getMonth()+1)).slice(-2),
    d = ('00' + dt.getDate()).slice(-2),
    h = ('00' + dt.getHours()).slice(-2),
    min = ('00' + dt.getMinutes()).slice(-2),
    s = ('00' + dt.getSeconds()).slice(-2);
    return `${y}-${m}-${d}T${h}${min}${s}`;
};

// ポート開設
http.listen(port, () => console.log(`Listening on port: ${port}`))