import { Quiz } from "./Quiz";

export class QuizCategory
{
    constructor(
        public id:number,
        public category:string,
        public quiz:Quiz[],
    ) {}
}