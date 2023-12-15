// DOM要素参照
const elmTxtTask = document.getElementById('txtTask');
const elmTblToDo = document.getElementById('tblToDo');
const elmTblTask = document.getElementById('tblTask');

// ------------------------------
// 入力レコード保存用配列
const allTasks = [];

// ------------------------------
// イベントリスナー
btnAdd.addEventListener(
  'click',
  () => {
    // 入力取得
    const txtTask = elmTxtTask.value.trim();
    // 入力ある場合のみ処理
    if (txtTask !== '') {
      addAllTasks(txtTask);
      updTblDatas();
      // 入力クリア
      elmTxtTask.value = '';
    }
  },
  false
);
// ------------------------------
// レコード保存用配列追加
const addAllTasks = (txtTask) => {
  // 新規レコード用オブジェクト
  const arrTasks = {
    id: allTasks.length,
    com: txtTask,
    sta: '作業中',
  };
  // 入力レコード追加
  allTasks.push(arrTasks);
};
// ------------------------------
// テーブル更新
const updTblDatas = () => {
  // テーブルクリア
  elmTblTask.innerHTML = '';
  // タスクリスト生成
  const tblBody = elmTblTask;
  allTasks.forEach((rowTask, rowIdx) => {
    rowTask.id = rowIdx;
    const tblRow = tblBody.insertRow();
    Object.values(rowTask).forEach((value) => {
      const tblCell = tblRow.insertCell();
      tblCell.textContent = value;
    });
    createBtn(tblRow, '削除');
  });
  // リスト追加
  elmTblToDo.appendChild(tblBody);
};

// ------------------------------
// ボタン作成
const createBtn = (elm, text) => {
  const elmTrg = elm.insertCell();
  const elmBtn = document.createElement('button');
  elmBtn.textContent = text;
  elmBtn.addEventListener('click', (event) => {
    const tblRow = event.target.parentNode.parentNode;
    const arrIdx = tblRow.rowIndex - 1;
    // 削除ボタンの処理
    if (event.target.textContent == '削除') {
      delArrTask(arrIdx);
    } else {
      // ここにタスクの状態の処理
    }
  });
  elmTrg.appendChild(elmBtn);
};

// ------------------------------
// タスク削除
const delArrTask = (arrIdx) => {
  allTasks.splice(arrIdx, 1);
  updTblDatas();
};
