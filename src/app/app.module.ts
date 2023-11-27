import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './Services/quizService';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ScoreComponent } from './score/score.component';
import { UserService } from './Services/userService';

import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    NavbarComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule
  ],
  providers: [QuizService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
