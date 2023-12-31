const addButton = document.getElementById('add-button');
const taskName = document.getElementById('task-name');
const taskTable = document.getElementById('task-table');
const taskTbody = document.getElementById('task-tbody');
const taskStasus = document.getElementById('task-status');
const radioStatus = taskStasus.radio_status;

// ------------------------------
const allTasks = [];

// ------------------------------
addButton.addEventListener(
  'click',
  () => {
    const taskComment = taskName.value.trim();
    if (taskComment !== '') {
      addAllTasks(taskComment);
      showTaskList();
      taskName.value = '';
    }
  },
  false
);

// ------------------------------
taskStasus.addEventListener(
  'change',
  () => {
    if (!allTasks.length) {
      return;
    }
    showTaskList();
  },
  false
);

// ------------------------------
const addAllTasks = taskComment => {
  const arrTasks = {
    id: allTasks.length,
    comment: taskComment,
    status: '作業中',
  };
  allTasks.push(arrTasks);
};

// ------------------------------
const showTaskList = () => {
  taskTbody.innerHTML = '';
  const tableTbody = taskTbody;
  allTasks.forEach((task, index) => {
    task.id = index;
    const showStatus = radioStatus.value;
    if (showStatus === 'すべて' || task['status'] === showStatus) {
      const tableRow = tableTbody.insertRow();
      Object.keys(task).forEach(key => {
        const tableCell = tableRow.insertCell();
        if (key === 'status') {
          statusButton = createButton(tableRow, task[key]);
          addStatusEvent(statusButton, index);
        } else {
          tableCell.textContent = task[key];
        }
      });
      deleteButton = createButton(tableRow, '削除');
      addDeleteEvent(deleteButton, index);
    }
  });
  taskTable.appendChild(tableTbody);
};

// ------------------------------
const createButton = (tableRow, text) => {
  const targetCell = tableRow.insertCell();
  const createdButton = document.createElement('button');
  createdButton.textContent = text;
  targetCell.appendChild(createdButton);
  return createdButton;
};

// ------------------------------
const addDeleteEvent = (deleteButton, index) => {
  deleteButton.addEventListener('click', () => {
    deleteTask(index);
  });
};

// ------------------------------
const addStatusEvent = (statusButton, index) => {
  statusButton.addEventListener('click', event => {
    if (event.target.textContent === '作業中') {
      text = '完了';
    } else if (event.target.textContent === '完了') {
      text = '作業中';
    }
    statusButton.textContent = text;
    changeTaskStatus(index, text);
  });
};

// ------------------------------
const deleteTask = index => {
  allTasks.splice(index, 1);
  showTaskList();
};

// ------------------------------
const changeTaskStatus = (index, text) => {
  allTasks[index]['status'] = text;
  showTaskList();
};
