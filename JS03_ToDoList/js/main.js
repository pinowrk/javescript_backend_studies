const elementTextTask = document.getElementById('textTask');
const elementTableToDo = document.getElementById('tableToDo');
const elementTableTask = document.getElementById('tableTask');
const elementTaskStatus = document.getElementById('formTaskStatus');

// ------------------------------
const allTasks = [];

// ------------------------------
addButton.addEventListener(
  'click',
  () => {
    const textTask = elementTextTask.value.trim();
    if (textTask !== '') {
      addAllTasks(textTask);
      showTaskList();
      elementTextTask.value = '';
    }
  },
  false
);

// ------------------------------
elementTaskStatus.addEventListener(
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
const addAllTasks = (textTask) => {
  const arrTasks = {
    id: allTasks.length,
    comment: textTask,
    status: '作業中',
  };
  allTasks.push(arrTasks);
};

// ------------------------------
const showTaskList = () => {
  elementTableTask.innerHTML = '';
  const tableBody = elementTableTask;
  allTasks.forEach((task, index) => {
    task.id = index;
    const showStatus = elementTaskStatus.radioStatus.value;
    if (showStatus === 'すべて' || task['status'] === showStatus) {
      const tableRow = tableBody.insertRow();
      Object.keys(task).forEach((key) => {
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
  elementTableToDo.appendChild(tableBody);
};

// ------------------------------
const createButton = (element, text) => {
  const elementTarget = element.insertCell();
  const elementButton = document.createElement('button');
  elementButton.textContent = text;
  elementTarget.appendChild(elementButton);
  return elementButton;
};

// ------------------------------
const addDeleteEvent = (element, index) => {
  element.addEventListener('click', () => {
    deleteTask(index);
  });
};

// ------------------------------
const addStatusEvent = (element, index) => {
  element.addEventListener('click', (event) => {
    if (event.target.textContent === '作業中') {
      text = '完了';
    } else if (event.target.textContent === '完了') {
      text = '作業中';
    }
    element.textContent = text;
    changeTaskStatus(index, text);
  });
};

// ------------------------------
const deleteTask = (index) => {
  allTasks.splice(index, 1);
  showTaskList();
};

// ------------------------------
const changeTaskStatus = (index, text) => {
  allTasks[index]['status'] = text;
  showTaskList();
};
