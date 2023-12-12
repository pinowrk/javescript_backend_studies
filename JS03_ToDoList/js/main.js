// DOM要素参照elmBuzz
const elmTxtTask = document.getElementById('txtTask');
const elmTblToDo = document.getElementById('tblToDo');

//
// ------------------------------
// 入力レコード保存用配列
const allTasks = [];

// イベントリスナー
// ------------------------------
btnAdd.addEventListener(
  'click',
  () => {
    // 入力取得
    const txtTask = elmTxtTask.value.trim();
    // 入力ある場合のみ処理
    if (txtTask !== '') {
      // 新規レコード用連想（JSON）
      const arrTasks = {
        id: allTasks.length,
        com: txtTask,
        sta: '作業中',
        del: '削除', // 無くてもよい？？？ 今後の状況で決める
      };
      // レコード
      const newRow = elmTblToDo.insertRow();
      // カラム
      const newID = newRow.insertCell(0);
      const newCom = newRow.insertCell(1);
      const newSta = newRow.insertCell(2);
      const newDel = newRow.insertCell(3);
      // データ
      newID.innerHTML = arrTasks.id;
      newCom.innerHTML = arrTasks.com;
      newSta.innerHTML = arrTasks.sta;
      createBtnDelete(newDel, arrTasks.del);
      // 入力クリア
      elmTxtTask.value = '';
      // 入力レコード追加
      allTasks.push(arrTasks);
    }
  },
  false
);

// ------------------------------
// 削除ボタン
const createBtnDelete = (elm, text) => {
  const btnDelete = document.createElement('button');
  btnDelete.textContent = text;
  btnDelete.addEventListener('click', function () {
    // 作業中の処理をここに追加
    console.log('ボタン「削除」がクリックされました。');
  });
  elm.appendChild(btnDelete);
};
