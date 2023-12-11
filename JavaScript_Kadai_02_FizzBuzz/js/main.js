// DOM要素参照elmBuzz
const elmBtnExec = document.getElementById('btnExec');
const elmNumFizz = document.getElementById('numFizz');
const elmNumBuzz = document.getElementById('numBuzz');
const elmListFizzBuzz = document.getElementById('listFizzBuzz');

// イベントリスナー
elmBtnExec.addEventListener('click', doFizzBuzz);

// ------------------------------
function doValidate(numFiz, numBuz) {
  // 評価文字
  const regText = /\D/;
  // 評価前に子要素削除
  elmListFizzBuzz.innerHTML = '';
  // 子要素作成
  const elmListChild = document.createElement('li');
  // 子要素追加
  elmListFizzBuzz.appendChild(elmListChild);
  // 評価
  if (regText.test(numFiz) || numFiz < ' ') {
    elmListChild.textContent = '整数値を入力して下さい。';
    return false;
  } else if (regText.test(numBuz) || numBuz < ' ') {
    elmListChild.textContent = '整数値を入力して下さい。';
    return false;
  } else {
    elmListFizzBuzz.innerHTML = '';
    return true;
  }
}

// ------------------------------
function doFizzBuzz() {
  const numFiz = elmNumFizz.value;
  const numBuz = elmNumBuzz.value;
  // 実行前に入力値を評価
  if (doValidate(numFiz, numBuz)) {
    // 実行前に子要素削除
    elmListFizzBuzz.innerHTML = '';
    // DocumentFragment オブジェクト
    const docFragment = document.createDocumentFragment();
    // FizzBuzzループ
    for (i = 1; i < 100; i++) {
      // 子要素作成
      const elmListChild = document.createElement('li');
      // 評価
      if (i % numFiz === 0 && i % numBuz === 0) {
        elmListChild.textContent = 'fizzbuzz ' + i;
      } else if (i % numFiz === 0) {
        elmListChild.textContent = 'fizz ' + i;
      } else if (i % numBuz === 0) {
        elmListChild.textContent = 'buzz ' + i;
      }
      // 子要素追加
      docFragment.appendChild(elmListChild);
    }
    // 再描写
    elmListFizzBuzz.appendChild(docFragment);
  }
}
