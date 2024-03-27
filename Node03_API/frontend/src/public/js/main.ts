interface ApiQuizData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answer: string[];
}

interface ResponseApiQuizData {
  response_code: number;
  results: ApiQuizData[];
}

interface ShowQuizData {
  number: number;
  category: string;
  difficulty: string;
  correct_answer: string;
  answers: string[];
  question: string;
  user_answer: string;
}

const fetchApiQuizData = async (): Promise<ApiQuizData[]> => {
  try {
    const apiUrl = 'http://localhost:3000/quiz';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // const data = await response.json();
    const { results } = (await response.json()) as ResponseApiQuizData;
    console.log(results);
    if (!results || results.length === 0) {
      throw new Error('Quiz data is empty or does not contain results.');
    }
    return results;
  } catch (error) {
    throw new Error('Error fetching quiz data: ' + error);
  }
};

// ==============================

// ------------------------------
const clearShowQuiz = () => {
  quizNumber.textContent = '';
  quizCategory.textContent = '';
  quizDifficulty.textContent = '';
  quizQuestion.textContent = '';
  showAnswer.innerHTML = '';
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
const appendQuizAnswer = (): HTMLElement => {
  const quizAnswer = document.createElement('div');
  showAnswer.appendChild(quizAnswer);
  return quizAnswer;
};

// ------------------------------
const createButton = (targetElement: HTMLElement, text: string): HTMLButtonElement => {
  const createdButton = document.createElement('button');
  createdButton.innerHTML = text;
  targetElement.appendChild(createdButton);
  return createdButton;
};

// ------------------------------
const createAnswers = (correct_answer: string, incorrect_answers: string[]): string[] => {
  let answers: string[] = [];
  answers = incorrect_answers;
  answers.push(correct_answer);
  answers.sort(() => Math.random() - 0.5); // 回答をシャッフルする
  return answers;
};

// ------------------------------
const createQuizData = (apiQuizDatas: ApiQuizData[]) => {
  apiQuizDatas.forEach((apiQuizData: ApiQuizData) => {
    const showQuizData: ShowQuizData = {
      number: quizDatas.length + 1,
      category: apiQuizData['category'],
      difficulty: apiQuizData['difficulty'],
      correct_answer: apiQuizData['correct_answer'],
      answers: createAnswers(apiQuizData['correct_answer'], apiQuizData['incorrect_answers']),
      question: apiQuizData['question'],
      user_answer: '',
    };
    quizDatas.push(showQuizData);
  });
};

// ------------------------------
const checkAnswer = (): number => {
  let correctCount: number = 0;
  quizDatas.forEach((showQuizData: ShowQuizData) => {
    if (showQuizData.correct_answer === showQuizData.user_answer) {
      correctCount += 1;
    }
  });
  return correctCount;
};

// ------------------------------
const showQuizData = (index: number) => {
  showAnswer.innerHTML = '';
  if (index < quizDatas.length) {
    quizNumber.textContent = '問題' + quizDatas[index]['number'];
    quizCategory.innerHTML = '［ジャンル］' + quizDatas[index]['category'];
    quizDifficulty.textContent = '［難易度］' + quizDatas[index]['difficulty'];
    quizQuestion.innerHTML = quizDatas[index]['question'];
    quizDatas[index]['answers'].forEach((answer: string) => {
      const quizAnswer: HTMLElement = appendQuizAnswer();
      const answerButton: HTMLButtonElement = createButton(quizAnswer, answer);
      answerButton.addEventListener('click', (event: MouseEvent) => {
        quizDatas[index]['user_answer'] = (event.target as HTMLButtonElement).textContent || '';
        showQuizData(index + 1);
      });
    });
  } else {
    clearShowQuiz();
    appendShowResult();
    const correctCount: number = checkAnswer();
    quizNumber.textContent = `あなたの正解数は${correctCount}です`;
    quizQuestion.textContent = '再度チャレンジする場合は下のボタンをクリックして下さい。';
    const quizAnswer: HTMLElement = appendQuizAnswer();
    const answerButton: HTMLButtonElement = createButton(quizAnswer, 'ホームへ戻る');
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
  quizNumber.textContent = 'ようこそ';
  quizQuestion.textContent = '下のボタンをクリックして下さい。';
  const quizAnswer: HTMLElement = appendQuizAnswer();
  const startButton: HTMLButtonElement = createButton(quizAnswer, '開始');
  startButton.addEventListener('click', async () => {
    quizNumber.textContent = '取得中';
    quizQuestion.textContent = '少々お待ち下さい。';
    showAnswer.innerHTML = '';
    try {
      const apiQuizDatas: ApiQuizData[] = await fetchApiQuizData();
      createQuizData(apiQuizDatas);
      showQuizData(0);
    } catch (error) {
      console.error('Error useQuizAPI.getQuizData :', error);
    }
  });
};

// ------------------------------
const showMessage: HTMLElement = document.getElementById('show-message')!;
const showQuestion: HTMLElement = document.getElementById('show-question')!;
const showAnswer: HTMLElement = document.getElementById('show-answer')!;
const startButton: HTMLElement | null = document.getElementById('start-button');
const quizNumber: HTMLHeadingElement = document.createElement('h2');
const quizCategory: HTMLHeadingElement = document.createElement('h4');
const quizDifficulty: HTMLHeadingElement = document.createElement('h4');
const quizQuestion: HTMLParagraphElement = document.createElement('p');
const quizDatas: ShowQuizData[] = [];
initializeShowQuiz();
