// DOM要素参照
const elmBtn = document.querySelector("#btnExec");
const elmFiz = document.getElementById("fizz");
const elmBuz = document.getElementById("buzz");
const elmRes = document.getElementById("result");

// イベントリスナー
elmFiz.addEventListener("change", doValidate);
elmBuz.addEventListener("change", doValidate);
elmBtn.addEventListener("click", doFizzBuzz);

// ------------------------------
function doValidate(event) {
  // 評価文字列
  var regText = /\D/;

  // 下記の場合に不具合がある
  // 「fizz」に整数値以外を入れる
  // 「buzz」に整数値以外を入れる
  // 「fizz」もしくは「buzz」に整数値を入れる
  // この場合、片方が整数値以外でもエラーが表示されないのでNG
  // var elmCall = event.target;
  // if (regText.test(elmCall.value)) {
  //   elmRes.innerHTML = "<p>整数値を入力して下さい。</p>";
  //   return false;
  // } else {
  //   elmRes.innerHTML = "";
  //   return true;
  // }

  // 下記の場合に不具合がある
  // 「fizz」に整数値以外を入れる
  // 「buzz」に整数値以外を入れる
  // 「fizz」「buzz」の両方に整数値を入れる
  // この場合、両方に整数値が入ってもエラーが表示されたままなのでNG
  // var elmCall = event.target;
  // if (regText.test(elmCall.value)) {
  //   elmRes.innerHTML = "<p>整数値を入力して下さい。</p>";
  //   return false;
  // }
  // return true;

  // 上記でイベントに対応した入力のみチェックだと不具合が出るので、
  // 「fizz」「buzz」の両方を評価する。
  if (regText.test(elmFiz.value)) {
    elmRes.innerHTML = "<p>整数値を入力して下さい。</p>";
    return false;
  } else if (regText.test(elmBuz.value)) {
    elmRes.innerHTML = "<p>整数値を入力して下さい。</p>";
    return false;
  } else {
    elmRes.innerHTML = "";
    return true;
  }
}

// ------------------------------
function doFizzBuzz() {
  // 実行前に入力値を評価
  if (!doValidate()) {
    return false;
  }
  // 変数は無しでIF分に「elmFiz.value」で直接評価でもOK？
  var numFiz = elmFiz.value;
  var numBuz = elmBuz.value;

  // 実行前に子要素削除
  elmRes.innerHTML = "";
  // DocumentFragment オブジェクト
  var fragment = document.createDocumentFragment();
  // FizzBuzzループ
  for (i = 1; i < 100; i++) {
    // 子要素作成
    var elmChild = document.createElement("div");
    // 評価
    if (i % numFiz === 0 && i % numBuz === 0) {
      elmChild.textContent = "fizzbuzz " + i;
    } else if (i % numFiz === 0) {
      elmChild.textContent = "fizz " + i;
    } else if (i % numBuz === 0) {
      elmChild.textContent = "buzz " + i;
    }
    // 子要素追加
    fragment.appendChild(elmChild);
  }
  // 再描写
  elmRes.appendChild(fragment);
  return true; // 不要？
}
