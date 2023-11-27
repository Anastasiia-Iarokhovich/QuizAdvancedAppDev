import { Quiz } from "../Models/Quiz";
import { QuizCategory } from "../Models/QuizCategory";

export class QuizService{

    quizzes: QuizCategory[] = [

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

    constructor() {}

    getAll(): QuizCategory[] {
        return this.quizzes;
    }
}