// DOM要素参照
const elmTxtTask = document.getElementById('txtTask');
const elmTblToDo = document.getElementById('tblToDo');
const elmTblTask = document.getElementById('tblTask');

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
        del: '削除',
      };
      // 入力レコード追加
      allTasks.push(arrTasks);
      // クリア（空に）
      elmTxtTask.value = '';
      elmTblTask.innerHTML = '';
      // タスクリスト生成
      const tblBody = elmTblTask;
      allTasks.forEach(function (rowTask) {
        const rowBody = tblBody.insertRow();
        Object.values(rowTask).forEach(function (value) {
          const tblCell = rowBody.insertCell();
          if (value == '削除') {
            createBtn(tblCell, value);
          } else {
            tblCell.textContent = value;
          }
        });
      });
      // リスト追加
      elmTblToDo.appendChild(tblBody);
    }
  },
  false
);

// ------------------------------
// 削除ボタン
const createBtn = (elm, text) => {
  const elmBtn = document.createElement('button');
  elmBtn.textContent = text;
  elmBtn.addEventListener('click', function () {
    // 作業中の処理をここに追加
    console.log('ボタン「削除」がクリックされました。');
  });
  elm.appendChild(elmBtn);
};
