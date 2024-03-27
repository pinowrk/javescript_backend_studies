interface SessionData {
  response_code: number;
  response_message: string;
  token: string;
}

interface QuizData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answer: string[];
}

interface ResponseQuizData {
  response_code: number;
  results: QuizData[];
}

interface ReturnQuizData {
  response_code: number;
  results: QuizData[];
}

export class QuizModel {
  private sessionToken: string | null;
  private quizData: QuizData[] | null;

  constructor() {
    this.sessionToken = null;
    this.quizData = null;
  }

  private async getSessionToken() {
    try {
      const apiUrl = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as SessionData;
      this.sessionToken = data.token;
    } catch (error) {
      throw new Error('Error getting session token: ' + error);
    }
  }

  public async getQuizData(amount: number): Promise<ResponseQuizData> {
    if (!this.sessionToken) {
      await this.getSessionToken();
    }

    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&token=${this.sessionToken}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { results } = (await response.json()) as ResponseQuizData;
      const returnQuizData: ResponseQuizData = {
        response_code: 200,
        results: results.map((result: QuizData) => ({
          category: result.category,
          type: result.type,
          difficulty: result.difficulty,
          question: result.question,
          correct_answer: result.correct_answer,
          incorrect_answers: result.incorrect_answers,
          answer: [result.correct_answer, ...result.incorrect_answers],
        })),
      };
      return returnQuizData;
    } catch (error) {
      throw new Error('Error getting quiz data: ' + error);
    }
  }
}
