// DOM要素参照
const elmTxtTask = document.getElementById('txtTask');
const elmTblToDo = document.getElementById('tblToDo');
const elmTblTask = document.getElementById('tblTask');
const elmTaskStatus = document.getElementById('formTaskStatus');

// ------------------------------
// 入力レコード保存用配列
const allTasks = [];

// ------------------------------
// イベントリスナー
// ------------------------------
// 追加ボタン押下
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
// 状態ラジオボタン変更
elmTaskStatus.addEventListener(
  'change',
  () => {
    // 保存用配列が空でない場合のみ処理
    if (!allTasks.length) {
      return;
    }
    showTaskList();
  },
  false
);

// ------------------------------
// レコード保存用配列追加
const addAllTasks = (txtTask) => {
  // 新規レコード用オブジェクト
  const arrTasks = {
    id: allTasks.length,
    comment: txtTask,
    status: '作業中',
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
  // 状態用変数（初期値）
  // レコード保存用配列ループ
  allTasks.forEach((rowTask, rowIdx) => {
    rowTask.id = rowIdx;
    // 表示する状態取得
    const showStatus = elmTaskStatus.radioStatus.value;
    // 表示する状態の場合のみ表示処理
    if (showStatus === 'すべて' || rowTask['status'] === showStatus) {
      const tblRow = tblBody.insertRow();
      Object.keys(rowTask).forEach((key) => {
        const tblCell = tblRow.insertCell();
        if (key == 'status') {
          elmStatusBtn = createBtn(tblRow, rowTask[key]);
          addStatusEvent(elmStatusBtn, rowIdx);
        } else {
          tblCell.textContent = rowTask[key];
        }
      });
      elmDelBtn = createBtn(tblRow, '削除');
      addDelEvent(elmDelBtn, rowIdx);
    }
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
  elmTrg.appendChild(elmBtn);
  return elmBtn;
};

// ------------------------------
// 削除ボタンイベント
const addDelEvent = (elm, idx) => {
  elm.addEventListener('click', () => {
    delArrTask(idx);
  });
};

// ------------------------------
// 状態ボタンイベント
const addStatusEvent = (elm, idx) => {
  elm.addEventListener('click', (event) => {
    if (event.target.textContent == '作業中') {
      text = '完了';
    } else if (event.target.textContent == '完了') {
      text = '作業中';
    }
    elm.textContent = text;
    chgTaskStatus(idx, text);
  });
};

// ------------------------------
// タスク削除
const delArrTask = (arrIdx) => {
  allTasks.splice(arrIdx, 1);
  showTaskList();
};

// ------------------------------
// タスク状態変更
const chgTaskStatus = (arrIdx, statustText) => {
  allTasks[arrIdx]['status'] = statustText;
  showTaskList();
};
