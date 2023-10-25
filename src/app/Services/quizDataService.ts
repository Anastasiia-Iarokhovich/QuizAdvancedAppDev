import { QuizScore } from "../Models/QuizScore";

export class QuizDataService {

  quizScores:QuizScore[] = [];

  setCategoryNameAndScore(name: string, score: number): void {
    const existingScore = this.quizScores.find((quizScore) => quizScore.category === name);
    if (existingScore) {
      existingScore.score = score;
    } else {
      this.quizScores.push(new QuizScore(name, score));
    }
  }

}

