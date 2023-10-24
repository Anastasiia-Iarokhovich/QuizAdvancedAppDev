import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Services/quizService';
import { QuizCategory } from '../Models/QuizCategory';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes:QuizCategory[] = [];
  //currentQuestionIndex: number = 0;
  progressbarWidth: number = 0;
  score: number = 0;
  answeredQuestions: number[] = [];
  selectedOptionIndexes: number[] = [];
  //selectedTopic: string = 'Geographie';
  selectedTopic: string = '';
  currentQuestionIndex: number = 0;
  selectedOptionIndex: number = -1;
  selectedCategory: QuizCategory | undefined;


  constructor(private quizService: QuizService) {
    this.quizzes = this.quizService.getAll();

    this.selectedCategory = this.quizzes.find(category => category.category == this.selectedTopic);

    if(this.selectedCategory) {
      this.progressbarWidth = 100 / (this.selectedCategory.quiz.length);
    }
    // console.log(this.quizzes[0].quiz.length);
    // console.log(this.selectedCategory?.quiz.length)
  }

  ngOnInit(): void {
  }

  onCategoryChange(): void {
    this.selectedCategory = this.quizzes.find(categoryOfQuiz => categoryOfQuiz.category === this.selectedTopic);
    this.currentQuestionIndex = 0; // Zurücksetzen auf die erste Frage
    this.selectedOptionIndexes = []; // Zurücksetzen der ausgewählten Optionen
    this.score = 0;

    if(this.selectedCategory) {
      this.progressbarWidth = 100 / (this.selectedCategory.quiz.length);
    }
  }

  nextQuestion() {
    if (this.selectedCategory && this.currentQuestionIndex < this.selectedCategory.quiz.length - 1) {
      this.currentQuestionIndex++;
      this.progressbarWidth += 100 / this.selectedCategory.quiz.length;
    }
    // else if (this.currentQuestionIndex >= this.selectedCategory?.quiz.length) {
    //   // Das Quiz ist bereits beendet
    // }
  }
  
  previousQuestion() {
    if(this.selectedCategory) {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;      
        this.progressbarWidth -= 100 / (this.selectedCategory.quiz.length);
      }
    }
  }

  checkAnswer(selectedOptionIndex: number) {

    this.selectedOptionIndexes[this.currentQuestionIndex] = selectedOptionIndex;

    if (!this.answeredQuestions.includes(this.currentQuestionIndex)) {

      if (selectedOptionIndex === this.selectedCategory?.quiz[this.currentQuestionIndex].correctOptionIndex) {
        this.score++;
      }
      this.answeredQuestions.push(this.currentQuestionIndex);
    }  
  }

}
