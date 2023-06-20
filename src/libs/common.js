const fs = require('fs');

// 時間取得（年-月-日T時分秒）
const getNow = () => {
    let dt = new Date();
    dt.setTime(dt.getTime() + 9 * 60 * 60 * 1000);  // タイムゾーンを日本時間に調整
    let y = dt.getFullYear(),
        m = ('00' + (dt.getMonth()+1)).slice(-2),
        d = ('00' + dt.getDate()).slice(-2),
        h = ('00' + dt.getHours()).slice(-2),
        min = ('00' + dt.getMinutes()).slice(-2),
        s = ('00' + dt.getSeconds()).slice(-2);
    return `${y}-${m}-${d}T${h}${min}${s}`;
};

// ディレクトリがなかった場合、新しく作成
const mkDir = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log(`Created directory: ${path}`)
    }
};

// 共通の関数として設定
exports.getNow = getNow;
exports.mkDir = mkDir;