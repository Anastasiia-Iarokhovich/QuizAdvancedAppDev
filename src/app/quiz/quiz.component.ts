import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Services/quizService';
import { QuizCategory } from '../Models/QuizCategory';
import { QuizDataService } from '../Services/quizDataService';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes:QuizCategory[] = [];
  progressbarWidth: number = 0;
  score: number = 0;
  answeredQuestions: number[] = [];
  selectedOptionIndexes: number[] = [];
  selectedTopic: string = '';
  currentQuestionIndex: number = 0;
  selectedCategory: QuizCategory | undefined;


  constructor(private quizService: QuizService, private quizDataService: QuizDataService) {
    this.quizzes = this.quizService.getAll();

    this.selectedCategory = this.quizzes.find(category => category.category == this.selectedTopic);

    if(this.selectedCategory) {
      this.progressbarWidth = 100 / (this.selectedCategory.quiz.length);
    }
  }

  ngOnInit(): void {
  }

  onCategoryChange(): void {

    this.score=0;
    this.selectedCategory = this.quizzes.find(categoryOfQuiz => categoryOfQuiz.category === this.selectedTopic);
    this.currentQuestionIndex = 0;
    this.selectedOptionIndexes = [];
    this.answeredQuestions = [];

    if(this.selectedCategory) {
      this.progressbarWidth = 100 / (this.selectedCategory.quiz.length);
    }
  }

  nextQuestion() {
    if (this.selectedCategory && this.currentQuestionIndex < this.selectedCategory.quiz.length) {
      this.currentQuestionIndex++;
      this.progressbarWidth += 100 / this.selectedCategory.quiz.length;
    }
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
    
    if(this.selectedCategory && this.answeredQuestions.length == this.selectedCategory.quiz.length) {
      const categoryName = this.selectedCategory.category;
      const scoreQuiz = this.score;
      this.quizDataService.setCategoryNameAndScore(categoryName, scoreQuiz);
    } 
  }

}
