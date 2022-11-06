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

// 共通の関数として設定
exports.getNow = getNow;