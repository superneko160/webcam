// HTML要素の取得
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const savebtn = document.getElementById('savebtn');

// eslint-disable-next-line
const socket = io();

/**
 * 起動処理
 */
const init = () => {
  setCamera();
  setButton();
  setResultSocket();
};

/**
 * カメラ処理
 */
const setCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();
    drawCanvas();
  }
  catch (err) {
    console.error(err);
    showMessageInCanvas('カメラの接続が許可されていません');
  }
};

/**
 * canvasの上にvideoを描画
 */
const drawCanvas = () => {
  const draw = () => {
    ctx.drawImage(video, 0, 0);
  };
  setInterval(draw, 100);
};

/**
 * ボタン処理
 */
const setButton = () => {
  // カーソル選択時
  savebtn.addEventListener('mouseover', () => {
    savebtn.style.backgroundColor = '#4169e1';
  });
  // カーソルがボタンから離れたとき（もとの色に戻す）
  savebtn.addEventListener('mouseleave', () => {
    savebtn.style.backgroundColor = '#00a8e1';
  });
  // ボタン押下時、canvasの画像をサーバに送信
  savebtn.addEventListener('click', () => {
    const data = { img: canvas.toDataURL('image/jpeg') };
    socket.emit('videoimg', data);
  });
};

/**
 * 画像保存の成否のメッセージを取得
 */
const setResultSocket = () => {
  socket.on('msg', (val) => { alert(val); });
};

/**
 * メッセージをCanvas内に表示
 * @param string message 
 */
const showMessageInCanvas = (message) => {
  const fontSize = 24;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000'; // 背景色を黒に設定
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
};

// 処理の起動
init();