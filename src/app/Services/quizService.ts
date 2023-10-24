import { Quiz } from "../Models/Quiz";
import { QuizCategory } from "../Models/QuizCategory";

export class QuizService{

    quizzes: QuizCategory[] = [

        new QuizCategory(
            "Geographie", 
            [
            new Quiz(1, "Was ist die Hauptstadt von Frankreich?", ["Berlin", "Madrid", "Paris", "Rom"], 2),
            new Quiz(3, "Was ist die Hauptstadt von Spanien?", ["Madrid", "Barcelona", "Lissabon", "Rom"], 0),
            new Quiz(7, "Was ist die Hauptstadt von Russland?", ["Moscow", "Volgograd", "Kaliningrad", "Rostov"], 0)
            ]
        ),
        new QuizCategory(
            "Chemie", 
            [         
            new Quiz(4, "Was ist die chemische Formel für Wasser?", ["H2O", "CO2", "NaCl", "O2"], 0),
            new Quiz(4, "quiestion", ["1", "2", "3", "4"], 0)
            ]
        ),
        new QuizCategory(
            "Kunst", 
            [        
            new Quiz(5, "Wer malte die Mona Lisa?", ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"], 0)
            ]
        ),
        new QuizCategory(
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