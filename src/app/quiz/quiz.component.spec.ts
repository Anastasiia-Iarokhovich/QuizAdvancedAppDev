import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { QuizService } from '../Services/quizService';
import { UserService } from '../Services/userService';
import { QuizCategory } from '../Models/QuizCategory';
import { Quiz } from '../Models/Quiz';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizService: jasmine.SpyObj<QuizService>;
  let userService: jasmine.SpyObj<UserService>;
  let mockQuizCategory: QuizCategory[];

  beforeEach(async () => {
    const quizServiceSpy = jasmine.createSpyObj('QuizService', ['getAll']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['setCategoryNameAndScore']);

    await TestBed.configureTestingModule({
      declarations: [ QuizComponent ],
      providers: [
        { provide: QuizService, useValue: quizServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    quizService = TestBed.inject(QuizService) as jasmine.SpyObj<QuizService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    mockQuizCategory = [
      new QuizCategory(
        100,
        "Geographie", 
        [
        new Quiz(1, "Was ist die Hauptstadt von Frankreich?", ["Berlin", "Madrid", "Paris", "Rom"], 2),
        new Quiz(3, "Was ist die Hauptstadt von Spanien?", ["Madrid", "Barcelona", "Lissabon", "Rom"], 0),
        new Quiz(7, "Was ist die Hauptstadt von Russland?", ["Moscow", "Volgograd", "Kaliningrad", "Rostov"], 0)
        ]
      ),
      new QuizCategory(
          101,
          "Chemie", 
          [         
          new Quiz(4, "Was ist die chemische Formel für Wasser?", ["H2O", "CO2", "NaCl", "O2"], 0)
          ]
      ),
      new QuizCategory(
          102,
          "Kunst", 
          [        
          new Quiz(5, "Wer malte die Mona Lisa?", ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"], 0),
          new Quiz(7, "Welcher Künstler gilt als Mitbegründer des Surrealismus?", ["Pablo Picasso", "Vincent van Gogh", " Salvador Dalí", "Jackson Pollock"], 2)
          ]
      ),
      new QuizCategory(
          103,
          "Biologie", 
          [
          new Quiz(2, "Welches Tier lebt im Wasser?", ["Hund", "Katze", "Fisch", "Vogel"], 2)
          ]
      )
    ];

    quizService.getAll.and.returnValue(mockQuizCategory); // Mocking the getAll method to return an empty array
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set quizzes on initialization', () => {
    expect(component.quizzes).toEqual(mockQuizCategory);
  });

  it('should set progressbar width when category is selected', () => {
    component.selectedTopic = 'Geographie';
    component.onCategoryChange();
    expect(component.progressbarWidth).toEqual(100 / mockQuizCategory[0].quiz.length);
  });

  it('should increment question index and progressbar width on nextQuestion', () => {
    component.selectedCategory = mockQuizCategory[0];
    component.currentQuestionIndex = 0;
    component.nextQuestion();
    expect(component.currentQuestionIndex).toEqual(1);
    expect(component.progressbarWidth).toEqual(50);
  });
});
