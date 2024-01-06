class UseQuizAPI {
  // ==============================
  constructor() {
    this.sessionToken = null;
  }
  // ==============================
  async getSessionToken() {
    try {
      const apiUrl = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.sessionToken = data.token;
    } catch (error) {
      console.error('Error get session token:', error);
    }
  }
  // ==============================
  async getQuizData(amount = 10) {
    if (!this.sessionToken) {
      await this.getSessionToken();
    }
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&token=${this.sessionToken}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const quizData = await response.json();
      return quizData;
    } catch (error) {
      console.error('Error get quiz data:', error);
    }
  }
}

// ------------------------------
const clearShowQuiz = () => {
  showAnswer.innerHTML = '';
  quizNumber.textContent = '';
  quizCategory.textContent = '';
  quizDifficulty.textContent = '';
  quizQuestion.textContent = '';
};

// ------------------------------
const appendShowQuiz = () => {
  showMessage.appendChild(quizNumber);
  showMessage.appendChild(quizCategory);
  showMessage.appendChild(quizDifficulty);
  showQuestion.appendChild(quizQuestion);
};

// ------------------------------
const appendShowResult = () => {
  showMessage.appendChild(quizNumber);
  showQuestion.appendChild(quizQuestion);
};

// ------------------------------
const appendQuizAnswer = () => {
  const quizAnswer = document.createElement('div');
  showAnswer.appendChild(quizAnswer);
  return quizAnswer;
};
// ------------------------------
const createButton = (targetElement, text) => {
  const createdButton = document.createElement('button');
  createdButton.innerHTML = text; // textContentだと実体参照になるので、「innerHTML」で対応
  targetElement.appendChild(createdButton);
  return createdButton;
};

// ------------------------------
const createAnswers = (correct_answer, incorrect_answers) => {
  let answers = [];
  answers = incorrect_answers;
  answers.push(correct_answer);
  answers.sort(); // 「push」や代入だけだと答えが先頭か末尾に偏るのでソートして分散させる。
  return answers;
};

// ------------------------------
const createQuizData = apiQuizDatas => {
  apiQuizDatas.forEach(apiQuizData => {
    const quizData = {
      number: quizDatas.length + 1,
      category: apiQuizData['category'],
      difficulty: apiQuizData['difficulty'],
      correct_answer: apiQuizData['correct_answer'],
      answers: createAnswers(apiQuizData['correct_answer'], apiQuizData['incorrect_answers']),
      question: apiQuizData['question'],
      user_answer: '',
    };
    quizDatas.push(quizData);
  });
};

// ------------------------------
const checkAnswer = () => {
  let correctCount = 0;
  quizDatas.forEach(quizData => {
    if (quizData.correct_answer === quizData.user_answer) {
      correctCount += 1;
    }
  });
  return correctCount;
};

// ------------------------------
const showQuizData = index => {
  showAnswer.innerHTML = '';
  if (index < quizDatas.length) {
    quizNumber.textContent = '問題' + quizDatas[index]['number'];
    quizCategory.innerHTML = '［ジャンル］' + quizDatas[index]['category']; // textContentだと実体参照になるので、「innerHTML」で対応
    quizDifficulty.textContent = '［難易度］' + quizDatas[index]['difficulty'];
    quizQuestion.innerHTML = quizDatas[index]['question']; // textContentだと実体参照になるので、「innerHTML」で対応
    quizDatas[index]['answers'].forEach(answer => {
      quizAnswer = appendQuizAnswer();
      const answerButton = createButton(quizAnswer, answer);
      answerButton.addEventListener('click', event => {
        quizDatas[index]['user_answer'] = event.target.textContent;
        showQuizData(index + 1);
      });
    });
  } else {
    clearShowQuiz();
    appendShowResult();
    const correctCount = checkAnswer();
    quizNumber.textContent = `あなたの正解数は${correctCount}です`;
    quizQuestion.textContent = '再度チャレンジする場合は下のボタンをクリックして下さい。';
    quizAnswer = appendQuizAnswer();
    const answerButton = createButton(quizAnswer, 'ホームへ戻る');
    answerButton.addEventListener('click', () => {
      initializeShowQuiz();
    });
  }
};

// ------------------------------
const initializeShowQuiz = () => {
  quizDatas.splice(0, quizDatas.length);
  clearShowQuiz();
  appendShowQuiz();
  const quizAnswer = document.createElement('div');
  showAnswer.appendChild(quizAnswer);
  quizNumber.textContent = 'ようこそ';
  quizQuestion.textContent = '下のボタンをクリックして下さい。';
  const startButton = createButton(quizAnswer, '開始');
  startButton.addEventListener('click', async () => {
    quizNumber.textContent = '取得中';
    quizQuestion.textContent = '少々お待ち下さい。';
    showAnswer.innerHTML = '';
    try {
      const apiQuizDatas = await useQuizAPI.getQuizData(10);
      createQuizData(apiQuizDatas['results']);
      showQuizData(0);
    } catch (error) {
      console.error('Error:', error);
      quizQuestion.textContent = error;
    }
  });
};

const showMessage = document.getElementById('show-message');
const showQuestion = document.getElementById('show-question');
const showAnswer = document.getElementById('show-answer');
const startButton = document.getElementById('start-button');

const quizNumber = document.createElement('h2');
const quizCategory = document.createElement('h4');
const quizDifficulty = document.createElement('h4');
const quizQuestion = document.createElement('p');

const quizDatas = [];

const useQuizAPI = new UseQuizAPI();

initializeShowQuiz();
