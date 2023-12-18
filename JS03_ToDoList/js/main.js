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
      showTaskList();
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
const showTaskList = () => {
  // テーブルクリア
  elmTblTask.innerHTML = '';
  // タスクリスト生成
  const tblBody = elmTblTask;
  allTasks.forEach((rowTask, rowIdx) => {
    rowTask.id = rowIdx;
    const tblRow = tblBody.insertRow();
    Object.keys(rowTask).forEach((key) => {
      const tblCell = tblRow.insertCell();
      if (key == 'sta') {
        createBtn(tblRow, rowTask[key]);
      } else {
        tblCell.textContent = rowTask[key];
      }
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
    // ボタンクリック時のイベント処理
    if (event.target.textContent == '削除') {
      delArrTask(arrIdx);
    } else {
      if (event.target.textContent == '作業中') {
        elmBtn.textContent = '完了';
        chgTaskStat(arrIdx, '完了');
      } else if (event.target.textContent == '完了') {
        elmBtn.textContent = '作業中';
        chgTaskStat(arrIdx, '作業中');
      }
    }
  });
  elmTrg.appendChild(elmBtn);
};

// ------------------------------
// タスク削除
const delArrTask = (arrIdx) => {
  allTasks.splice(arrIdx, 1);
  showTaskList();
};

// ------------------------------
// タスク状態変更
const chgTaskStat = (arrIdx, statText) => {
  allTasks[arrIdx]['sta'] = statText;
  showTaskList();
};
