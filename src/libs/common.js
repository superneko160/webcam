const fs = require('fs');

/**
 * 時間取得（年-月-日T時分秒）
 * @returns 
 */
const getNow = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 9 * 60 * 60 * 1000); // タイムゾーンを日本時間に調整
  const year = dt.getFullYear();
  const month = ('00' + (dt.getMonth() + 1)).slice(-2);
  const day = ('00' + dt.getDate()).slice(-2);
  const hour = ('00' + dt.getHours()).slice(-2);
  const min = ('00' + dt.getMinutes()).slice(-2);
  const sec = ('00' + dt.getSeconds()).slice(-2);
  return `${year}-${month}-${day}_${hour}${min}${sec}`;
};

/**
 * ディレクトリがなかった場合、新しく作成
 * @param string path
 */
const mkDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log(`Created directory: ${path}`);
  }
};

/**
 * 画像を保存
 * @param {*} data
 * @returns boolean 画像保存の成否
 */
const saveImg = (data) => {
  if (!data) {
    return false;
  }
  const base64 = data.img.split(',')[1];  // imgの中身は0番目に保存形式などの基本情報、1番目に画像のデータがある
  const decode = Buffer.from(base64, 'base64');
  // 画像保存用のディレクトリがなければ作成
  const picdir = 'pictures';
  mkDir(picdir);
  // 年-月-日_時分秒.jpgで画像書込
  const date = getNow();
  fs.writeFile(`${picdir}/${date}.jpg`, decode, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(`save image: ${date}.jpg`);
    return true;
  });
};

// 共通の関数として設定
exports.getNow = getNow;
exports.mkDir = mkDir;
exports.saveImg = saveImg;