import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../Services/quizDataService';
import { QuizScore } from '../Models/QuizScore';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  quizScores: QuizScore[] = [];

  constructor(private quizDataService: QuizDataService) {
    this.quizScores = this.quizDataService.quizScores;
  }

  ngOnInit(): void {
  }

}
