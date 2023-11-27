import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Services/quizService';
import { QuizCategory } from '../Models/QuizCategory';
import { UserService } from '../Services/userService';

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
  selectedOptionIndexes: Array<number | undefined> = [];
  selectedTopic: string = '';
  currentQuestionIndex: number = 0;
  selectedCategory: QuizCategory | undefined;
  quizCompleted: boolean = false;

  constructor(private quizService: QuizService, private userService: UserService) {
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
    this.quizCompleted = false;

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

  Finish() {
    this.quizCompleted = true;
  }
  
  checkAnswer(selectedOptionIndex: number) {
    const currentQuestionIndex = this.currentQuestionIndex;
   
    if (!this.answeredQuestions.includes(currentQuestionIndex)) { // Überprüfen, ob die Frage bereits beantwortet wurde
      
      if (this.selectedOptionIndexes[currentQuestionIndex] === selectedOptionIndex) { // Überprüfen, ob die Option bereits ausgewählt wurde
        
        this.selectedOptionIndexes[currentQuestionIndex] = undefined; // Wenn die gleiche Option erneut ausgewählt wurde, setze sie zurück
      } else {
        
        const previousSelection = this.selectedOptionIndexes[currentQuestionIndex]; // Wenn eine neue Option ausgewählt wurde, lösche die vorherige Auswahl
        if (previousSelection !== undefined) {
          const isPreviousSelectionCorrect = previousSelection === this.selectedCategory?.quiz[currentQuestionIndex].correctOptionIndex;

          if (isPreviousSelectionCorrect) {           
            this.score--; // Reduziere den Score, wenn die vorherige Auswahl korrekt war
            }
        }
      
        this.selectedOptionIndexes[currentQuestionIndex] = selectedOptionIndex; // Aktualisiere den Wert mit der neuen Auswahl

        if (selectedOptionIndex === this.selectedCategory?.quiz[currentQuestionIndex].correctOptionIndex) {
          this.score++;
        }
      }
    }
   
    if (this.selectedCategory ) { // Überprüfen, ob alle Fragen beantwortet wurden
      this.userService.setCategoryNameAndScore(this.selectedCategory.category, this.score);
    }
  }

  isAnyOptionSelected(): boolean {
    return this.selectedOptionIndexes[this.currentQuestionIndex] !== undefined;
  }  
}
