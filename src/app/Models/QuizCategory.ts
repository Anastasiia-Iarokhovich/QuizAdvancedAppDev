import { Quiz } from "./Quiz";

export class QuizCategory
{
    constructor(
        public category:string,
        public quiz:Quiz[],
    ) {}
}